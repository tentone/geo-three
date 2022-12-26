import {Material, MeshPhongMaterial, BufferGeometry, Vector3, Raycaster, Intersection} from 'three';
import {MapNodeGeometry} from '../geometries/MapNodeGeometry';
import {MapNode, QuadTreePosition} from './MapNode';
import {MapPlaneNode} from './MapPlaneNode';
import {UnitsUtils} from '../utils/UnitsUtils';
import {MapView} from '../MapView';
import {MapNodeHeightGeometry} from '../geometries/MapNodeHeightGeometry';
import {CanvasUtils} from '../utils/CanvasUtils';

/**
 * Represents a height map tile node that can be subdivided into other height nodes.
 *
 * Its important to update match the height of the tile with the neighbors nodes edge heights to ensure proper continuity of the surface.
 *
 * The height node is designed to use MapBox elevation tile encoded data as described in https://www.mapbox.com/help/access-elevation-data/
 */
export class MapHeightNode extends MapNode 
{
	/**
	 * Flag indicating if the tile height data was loaded.
	 */
	public heightLoaded: boolean = false;

	/**
	 * Flag indicating if the tile texture was loaded.
	 */
	public textureLoaded: boolean = false;

	/**
	 * Original tile size of the images retrieved from the height provider.
	 */
	public static tileSize: number = 256;

	/**
	 * Size of the grid of the geometry displayed on the scene for each tile.
	 */
	public geometrySize: number = 16;

	/**
	 * If true the tiles will compute their normals.
	 */
	public geometryNormals: boolean = false;

	/**
	 * Map node plane geometry.
	 */
	public static geometry: BufferGeometry = new MapNodeGeometry(1, 1, 1, 1);

	/**
	 * Base geometry shared across all the nodes.
	 */
	public static baseGeometry: BufferGeometry = MapPlaneNode.geometry;

	/**
	 * Scale to apply to each node.
	 */
	public static baseScale: Vector3 = new Vector3(UnitsUtils.EARTH_PERIMETER, 1, UnitsUtils.EARTH_PERIMETER);

	/**
	 * Map height node constructor.
	 *
	 * @param parentNode - The parent node of this node.
	 * @param mapView - Map view object where this node is placed.
	 * @param location - Position in the node tree relative to the parent.
	 * @param level - Zoom level in the tile tree of the node.
	 * @param x - X position of the node in the tile tree.
	 * @param y - Y position of the node in the tile tree.
	 * @param material - Material used to render this height node.
	 * @param geometry - Geometry used to render this height node.
	 */
	public constructor(parentNode: MapHeightNode = null, mapView: MapView = null, location: number = QuadTreePosition.root, level: number = 0, x: number = 0, y: number = 0, geometry: BufferGeometry = MapHeightNode.geometry, material: Material = new MeshPhongMaterial({wireframe: false, color: 0xffffff})) 
	{
		super(parentNode, mapView, location, level, x, y, geometry, material);

		this.isMesh = true;
		this.visible = false;
		this.matrixAutoUpdate = false;
	}

	public async initialize(): Promise<void> 
	{
		super.initialize();
		
		await this.loadData();
		await this.loadHeightGeometry();

		this.nodeReady();
	}

	/**
	 * Load tile texture from the server.
	 *
	 * Aditionally in this height node it loads elevation data from the height provider and generate the appropiate maps.
	 */
	public async loadData(): Promise<void> 
	{
		await super.loadData();
		
		this.textureLoaded = true;
	}

	/**
	 * Load height texture from the server and create a geometry to match it.
	 *
	 * @returns Returns a promise indicating when the geometry generation has finished.
	 */
	public async loadHeightGeometry(): Promise<any> 
	{
		if (this.mapView.heightProvider === null) 
		{
			throw new Error('GeoThree: MapView.heightProvider provider is null.');
		}
 
		if (this.level < this.mapView.heightProvider.minZoom || this.level > this.mapView.heightProvider.maxZoom)
		{
			console.warn('Geo-Three: Loading tile outside of provider range.', this);

			this.geometry = MapPlaneNode.baseGeometry;
			return;
		}

		try 
		{
			const image = await this.mapView.heightProvider.fetchTile(this.level, this.x, this.y);
 
			if (this.disposed) 
			{
				return;
			}

			const canvas = CanvasUtils.createOffscreenCanvas(this.geometrySize + 1, this.geometrySize + 1);

			const context = canvas.getContext('2d') as CanvasRenderingContext2D;
			context.imageSmoothingEnabled = false;
			context.drawImage(image, 0, 0, MapHeightNode.tileSize, MapHeightNode.tileSize, 0, 0, canvas.width, canvas.height);

			const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

			this.geometry = new MapNodeHeightGeometry(1, 1, this.geometrySize, this.geometrySize, true, 10.0, imageData, true);
		}
		catch (e) 
		{
			if (this.disposed) 
			{
				return;
			}
			
			this.geometry = MapPlaneNode.baseGeometry;
		}

		this.heightLoaded = true;
	}

	public createChildNodes(): void 
	{
		const level = this.level + 1;
		const Constructor = Object.getPrototypeOf(this).constructor;

		const x = this.x * 2;
		const y = this.y * 2;
		let node = new Constructor(this, this.mapView, QuadTreePosition.topLeft, level, x, y);
		node.scale.set(0.5, 1.0, 0.5);
		node.position.set(-0.25, 0, -0.25);
		this.add(node);
		node.updateMatrix();
		node.updateMatrixWorld(true);

		node = new Constructor(this, this.mapView, QuadTreePosition.topRight, level, x + 1, y);
		node.scale.set(0.5, 1.0, 0.5);
		node.position.set(0.25, 0, -0.25);
		this.add(node);
		node.updateMatrix();
		node.updateMatrixWorld(true);

		node = new Constructor(this, this.mapView, QuadTreePosition.bottomLeft, level, x, y + 1);
		node.scale.set(0.5, 1.0, 0.5);
		node.position.set(-0.25, 0, 0.25);
		this.add(node);
		node.updateMatrix();
		node.updateMatrixWorld(true);

		node = new Constructor(this, this.mapView, QuadTreePosition.bottomRight, level, x + 1, y + 1);
		node.scale.set(0.5, 1.0, 0.5);
		node.position.set(0.25, 0, 0.25);
		this.add(node);
		node.updateMatrix();
		node.updateMatrixWorld(true);
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
