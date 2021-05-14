import { Matrix4, Mesh, MeshBasicMaterial, Quaternion, Vector3 } from 'three';
import { MapNode } from './MapNode';
import { MapSphereNodeGeometry } from '../geometries/MapSphereNodeGeometry';
import { UnitsUtils } from '../utils/UnitsUtils';

/** 
 * Represents a map tile node.
 * 
 * A map node can be subdivided into other nodes (Quadtree).
 * 
 * @class MapSphereNode
 */
export class MapSphereNode extends MapNode {
	constructor(parentNode = null, mapView = null, location = MapNode.ROOT, level = 0, x = 0, y = 0) {
		super(MapSphereNode.createGeometry(level, x, y), new MeshBasicMaterial({wireframe: false}), parentNode, mapView, location, level, x, y);
	
		this.applyScaleNode();
	
		this.matrixAutoUpdate = false;
		this.isMesh = true;
		this.visible = false;
	}
	
	static BASE_GEOMETRY = new MapSphereNodeGeometry(UnitsUtils.EARTH_RADIUS, 64, 64, 0, 2 * Math.PI, 0, Math.PI);

	static BASE_SCALE = new Vector3(1, 1, 1);

	/**
	 * Number of segments per node geometry.
	 * 
	 * Can be configured globally and is applied to all nodes.
	 *
	 * @STATIC
	 * @static SEGMENTS
	 * @type {number}
	 */
	static SEGMENTS = 80;
	
	initialize() {
		this.loadTexture();
	}

	/**
	 * Create a geometry for a sphere map node.
	 *
	 * @method createGeometry
	 * @param {number} zoom
	 * @param {number} x
	 * @param {number} y
	 */
	static createGeometry(zoom, x, y) {
		const range = Math.pow(2, zoom);
		const max = 40;
		const segments = Math.floor((MapSphereNode.SEGMENTS * (max / (zoom + 1))) / max);
	
		// X
		const phiLength = (1 / range) * 2 * Math.PI;
		const phiStart = x * phiLength;
	
		// Y
		const thetaLength = (1 / range) * Math.PI;
		const thetaStart = y * thetaLength;
	
		return new MapSphereNodeGeometry(1, segments, segments, phiStart, phiLength, thetaStart, thetaLength);
	}
	
	/** 
	 * Apply scale and offset position to the sphere node geometry.
	 *
	 * @method applyScaleNode
	 */
	applyScaleNode() {
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
	
	updateMatrix() {
		this.matrix.setPosition(this.position);
		this.matrixWorldNeedsUpdate = true;
	}
	
	updateMatrixWorld(force = false) {
		if (this.matrixWorldNeedsUpdate || force) {
			this.matrixWorld.copy(this.matrix);
			this.matrixWorldNeedsUpdate = false;
		}
	}
	
	createChildNodes() {
		const level = this.level + 1;

		const x = this.x * 2;
		const y = this.y * 2;

		let node = new MapSphereNode(this, this.mapView, MapNode.TOP_LEFT, level, x, y);
		this.add(node);
		node.updateMatrix();
		node.updateMatrixWorld(true);

		node = new MapSphereNode(this, this.mapView, MapNode.TOP_RIGHT, level, x + 1, y);
		this.add(node);
		node.updateMatrix();
		node.updateMatrixWorld(true);

		node = new MapSphereNode(this, this.mapView, MapNode.BOTTOM_LEFT, level, x, y + 1);
		this.add(node);
		node.updateMatrix();
		node.updateMatrixWorld(true);

		node = new MapSphereNode(this, this.mapView, MapNode.BOTTOM_RIGHT, level, x + 1, y + 1);
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
		if (this.isMesh === true) {
			return Mesh.prototype.raycast.call(this, raycaster, intersects);
		}
	
		return false;
	}
}
