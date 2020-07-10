import {Mesh, MeshBasicMaterial} from "three";
import {MapNode} from "./MapNode.js";
import {MapNodeGeometry} from "../geometries/MapNodeGeometry";

/** 
 * Represents a map tile node.
 * 
 * A map node can be subdivided into other nodes (Quadtree).
 * 
 * @class MapPlaneNode
 */
export class MapPlaneNode extends Mesh {
	constructor(parentNode, mapView, location, level, x, y) {
		super(MapPlaneNode.GEOMETRY, new MeshBasicMaterial({wireframe: false}));
		MapNode.call(this, parentNode, mapView, location, level, x, y);

		this.matrixAutoUpdate = false;
		this.isMesh = true;
		this.visible = false;

		/**
		 * Cache with the children objects created from subdivision.
		 * 
		 * Used to avoid recreate object after simplification and subdivision.
		 * 
		 * The default value is null.
		 *
		 * @attribute childrenCache
		 * @type {Array}
		 */
		this.childrenCache = null;
		
		this.loadTexture();
	}

	createChildNodes() {
		const level = this.level + 1;

		const x = this.x * 2;
		const y = this.y * 2;

		var node = new MapPlaneNode(this, this.mapView, MapNode.TOP_LEFT, level, x, y);
		node.scale.set(0.5, 1, 0.5);
		node.position.set(-0.25, 0, -0.25);
		this.add(node);
		node.updateMatrix();
		node.updateMatrixWorld(true);

		var node = new MapPlaneNode(this, this.mapView, MapNode.TOP_RIGHT, level, x + 1, y);
		node.scale.set(0.5, 1, 0.5);
		node.position.set(0.25, 0, -0.25);
		this.add(node);
		node.updateMatrix();
		node.updateMatrixWorld(true);

		var node = new MapPlaneNode(this, this.mapView, MapNode.BOTTOM_LEFT, level, x, y + 1);
		node.scale.set(0.5, 1, 0.5);
		node.position.set(-0.25, 0, 0.25);
		this.add(node);
		node.updateMatrix();
		node.updateMatrixWorld(true);

		var node = new MapPlaneNode(this, this.mapView, MapNode.BOTTOM_RIGHT, level, x + 1, y + 1);
		node.scale.set(0.5, 1, 0.5);
		node.position.set(0.25, 0, 0.25);
		this.add(node);
		node.updateMatrix();
		node.updateMatrixWorld(true);
	}

	/**
	 * Overrides normal raycasting, to avoid raycasting when isMesh is set to false.
	 * 
	 * @method raycast
	 */
	raycast(raycaster, intersects) {
		if(this.isMesh === true)
		{
			return Mesh.prototype.raycast.call(this, raycaster, intersects);
		}

		return false;
	}
}

Object.assign(MapPlaneNode.prototype, MapNode.prototype);

/**
 * Map node plane geometry.
 *
 * @static
 * @attribute GEOMETRY
 * @type {PlaneBufferGeometry}
 */
MapPlaneNode.GEOMETRY = new MapNodeGeometry(1, 1, 1, 1);
