import {Matrix4, BufferGeometry, MeshBasicMaterial, Quaternion, Vector3, Raycaster, Intersection} from 'three';
import {MapNode, QuadTreePosition} from './MapNode';
import {MapSphereNodeGeometry} from '../geometries/MapSphereNodeGeometry';
import {UnitsUtils} from '../utils/UnitsUtils';

/** 
 * Represents a map tile node.
 * 
 * A map node can be subdivided into other nodes (Quadtree).
 */
export class MapSphereNode extends MapNode 
{	
	/**
	 * Base geometry contains the entire globe.
	 * 
	 * Individual geometries generated for the sphere nodes are not based on this base geometry.
	 * 
	 * Applied to the map view on initialization.
	 */
	public static baseGeometry: BufferGeometry = new MapSphereNodeGeometry(UnitsUtils.EARTH_RADIUS, 64, 64, 0, 2 * Math.PI, 0, Math.PI);

	/**
	 * Base scale of the node.
	 * 
	 * Applied to the map view on initialization.
	 */
	public static baseScale: Vector3 = new Vector3(1, 1, 1);

	/**
	 * Number of segments per node geometry.
	 * 
	 * Can be configured globally and is applied to all nodes.
	 */
	public static segments: number = 80;

	public constructor(parentNode = null, mapView = null, location = QuadTreePosition.root, level = 0, x = 0, y = 0) 
	{
		super(parentNode, mapView, location, level, x, y, MapSphereNode.createGeometry(level, x, y), new MeshBasicMaterial({wireframe: false}));
	
		this.applyScaleNode();
	
		this.matrixAutoUpdate = false;
		this.isMesh = true;
		this.visible = false;
	}
	
	public async initialize(): Promise<void>
	{
		super.initialize();
		
		await this.loadData();
		
		this.nodeReady();
	}

	/**
	 * Create a geometry for a sphere map node.
	 *
	 * @param zoom - Zoom level to generate the geometry for.
	 * @param x - X tile position.
	 * @param y - Y tile position.
	 */
	public static createGeometry(zoom: number, x: number, y: number): MapSphereNodeGeometry
	{
		const range = Math.pow(2, zoom);
		const max = 40;
		const segments = Math.floor(MapSphereNode.segments * (max / (zoom + 1)) / max);
	
		// X
		const phiLength = 1 / range * 2 * Math.PI;
		const phiStart = x * phiLength;
	
		// Y
		const thetaLength = 1 / range * Math.PI;
		const thetaStart = y * thetaLength;
	
		return new MapSphereNodeGeometry(1, segments, segments, phiStart, phiLength, thetaStart, thetaLength);
	}
	
	/** 
	 * Apply scale and offset position to the sphere node geometry.
	 */
	public applyScaleNode(): void
	{
		this.geometry.computeBoundingBox();
	
		const box = this.geometry.boundingBox.clone();
		const center = box.getCenter(new Vector3());
	
		const matrix = new Matrix4();
		matrix.compose(new Vector3(-center.x, -center.y, -center.z), new Quaternion(), new Vector3(UnitsUtils.EARTH_RADIUS, UnitsUtils.EARTH_RADIUS, UnitsUtils.EARTH_RADIUS));
		this.geometry.applyMatrix4(matrix);
	
		this.position.copy(center);
	
		this.updateMatrix();
		this.updateMatrixWorld();
	}
	
	public updateMatrix(): void
	{
		this.matrix.setPosition(this.position);
		this.matrixWorldNeedsUpdate = true;
	}
	
	public updateMatrixWorld(force: boolean = false): void
	{
		if (this.matrixWorldNeedsUpdate || force) 
		{
			this.matrixWorld.copy(this.matrix);
			this.matrixWorldNeedsUpdate = false;
		}
	}
	
	public createChildNodes(): void
	{
		const level = this.level + 1;
		const x = this.x * 2;
		const y = this.y * 2;

		const Constructor = Object.getPrototypeOf(this).constructor;

		let node = new Constructor(this, this.mapView, QuadTreePosition.topLeft, level, x, y);
		this.add(node);

		node = new Constructor(this, this.mapView, QuadTreePosition.topRight, level, x + 1, y);
		this.add(node);

		node = new Constructor(this, this.mapView, QuadTreePosition.bottomLeft, level, x, y + 1);
		this.add(node);

		node = new Constructor(this, this.mapView, QuadTreePosition.bottomRight, level, x + 1, y + 1);
		this.add(node);
	}
	
	/**
	 * Overrides normal raycasting, to avoid raycasting when isMesh is set to false.
	 */
	public raycast(raycaster: Raycaster, intersects: Intersection[]): void
	{
		if (this.isMesh === true) 
		{
			super.raycast(raycaster, intersects);
		}
	}
}
