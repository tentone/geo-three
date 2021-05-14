import {Mesh, MeshBasicMaterial, Vector3} from 'three';
import {MapNode} from './MapNode';
import {MapNodeGeometry} from '../geometries/MapNodeGeometry';
import {UnitsUtils} from '../utils/UnitsUtils';
/**
 * Represents a basic plane tile node.
 */
export class MapPlaneNode extends MapNode 
{
	public constructor(parentNode = null, mapView = null, location = MapNode.ROOT, level = 0, x = 0, y = 0) 
	{
		super(MapPlaneNode.GEOMETRY, new MeshBasicMaterial({wireframe: false}), parentNode, mapView, location, level, x, y);

		this.matrixAutoUpdate = false;
		this.isMesh = true;
		this.visible = false;
	}

	/**
	 * Map node plane geometry.
	 *
	 * @type {PlaneBufferGeometry}
	 */
	public static GEOMETRY = new MapNodeGeometry(1, 1, 1, 1);

	public static BASE_GEOMETRY = MapPlaneNode.GEOMETRY;

	public static BASE_SCALE = new Vector3(UnitsUtils.EARTH_PERIMETER, 1, UnitsUtils.EARTH_PERIMETER);

	initialize() 
	{
		this.loadTexture();
	}

	createChildNodes() 
	{
		const level = this.level + 1;

		const x = this.x * 2;
		const y = this.y * 2;

		let node = new MapPlaneNode(this, this.mapView, MapNode.TOP_LEFT, level, x, y);
		node.scale.set(0.5, 1, 0.5);
		node.position.set(-0.25, 0, -0.25);
		this.add(node);
		node.updateMatrix();
		node.updateMatrixWorld(true);

		node = new MapPlaneNode(this, this.mapView, MapNode.TOP_RIGHT, level, x + 1, y);
		node.scale.set(0.5, 1, 0.5);
		node.position.set(0.25, 0, -0.25);
		this.add(node);
		node.updateMatrix();
		node.updateMatrixWorld(true);

		node = new MapPlaneNode(this, this.mapView, MapNode.BOTTOM_LEFT, level, x, y + 1);
		node.scale.set(0.5, 1, 0.5);
		node.position.set(-0.25, 0, 0.25);
		this.add(node);
		node.updateMatrix();
		node.updateMatrixWorld(true);

		node = new MapPlaneNode(this, this.mapView, MapNode.BOTTOM_RIGHT, level, x + 1, y + 1);
		node.scale.set(0.5, 1, 0.5);
		node.position.set(0.25, 0, 0.25);
		this.add(node);
		node.updateMatrix();
		node.updateMatrixWorld(true);
	}

	/**
	 * Overrides normal raycasting, to avoid raycasting when isMesh is set to false.
	 *
	 */
	raycast(raycaster, intersects) 
	{
		if (this.isMesh === true) 
		{
			return Mesh.prototype.raycast.call(this, raycaster, intersects);
		}

		return false;
	}
}
