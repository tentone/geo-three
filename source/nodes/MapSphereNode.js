import {Mesh, MeshBasicMaterial, Vector3, Matrix4, Quaternion} from "three";
import {MapNode} from "./MapNode.js";
import {MapSphereNodeGeometry} from "../geometries/MapSphereNodeGeometry.js";
import {GeolocationUtils} from "../utils/GeolocationUtils.js";

/** 
 * Represents a map tile node.
 * 
 * A map node can be subdivided into other nodes (Quadtree).
 * 
 * @class MapSphereNode
 */
function MapSphereNode(parentNode, mapView, location, level, x, y)
{
	Mesh.call(this, MapSphereNode.createGeometry(level, x, y), new MeshBasicMaterial({wireframe:false}));
	MapNode.call(this, parentNode, mapView, location, level, x, y);

	this.applyScaleNode();

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

MapSphereNode.prototype = Object.create(Mesh.prototype);
Object.assign(MapSphereNode.prototype, MapNode.prototype);

/**
 * Number of segments per node geometry.
 *
 * @STATIC
 * @static SEGMENTS
 * @type {Number}
 */
MapSphereNode.SEGMENTS = 80;

/**
 * Create a geometry for a sphere map node.
 *
 * @method createGeometry
 * @param {Number} zoom
 * @param {Number} x
 * @param {Number} y
 */
MapSphereNode.createGeometry = function(zoom, x, y)
{
	var range = Math.pow(2, zoom);
	var max = 40;
	var segments = Math.floor(MapSphereNode.SEGMENTS * (max / (zoom + 1)) / max);

	//X
	var phiLength = (1 / range) * 2 * Math.PI;
	var phiStart = x * phiLength;

	//Y
	var thetaLength = (1 / range) * Math.PI;
	var thetaStart = y * thetaLength;

	return new MapSphereNodeGeometry(1, segments, segments, phiStart, phiLength, thetaStart, thetaLength);
};

/** 
 * Apply scale and offset position to the sphere node geometry.
 *
 * @method applyScaleNode
 */
MapSphereNode.prototype.applyScaleNode = function()
{
	this.geometry.computeBoundingBox();

	var box = this.geometry.boundingBox.clone();
	var center = box.getCenter(new Vector3());

	var matrix = new Matrix4();
	matrix.compose(new Vector3(-center.x, -center.y, -center.z), new Quaternion(), new Vector3(GeolocationUtils.EARTH_RADIUS, GeolocationUtils.EARTH_RADIUS, GeolocationUtils.EARTH_RADIUS));
	this.geometry.applyMatrix(matrix);

	this.position.copy(center);

	this.updateMatrix();
	this.updateMatrixWorld();
};

MapSphereNode.prototype.updateMatrix = function()
{
	this.matrix.setPosition(this.position);
	this.matrixWorldNeedsUpdate = true;
};

MapSphereNode.prototype.updateMatrixWorld = function(force)
{
	if(this.matrixWorldNeedsUpdate || force)
	{
		this.matrixWorld.copy(this.matrix);
		this.matrixWorldNeedsUpdate = false;
	}
};

MapSphereNode.prototype.createChildNodes = function()
{
	var level = this.level + 1;

	var x = this.x * 2;
	var y = this.y * 2;

	var node = new MapSphereNode(this, this.mapView, MapNode.TOP_LEFT, level, x, y);
	this.add(node);
	node.updateMatrix();
	node.updateMatrixWorld(true);

	var node = new MapSphereNode(this, this.mapView, MapNode.TOP_RIGHT, level, x + 1, y);
	this.add(node);
	node.updateMatrix();
	node.updateMatrixWorld(true);

	var node = new MapSphereNode(this, this.mapView, MapNode.BOTTOM_LEFT, level, x, y + 1);
	this.add(node);
	node.updateMatrix();
	node.updateMatrixWorld(true);

	var node = new MapSphereNode(this, this.mapView, MapNode.BOTTOM_RIGHT, level, x + 1, y + 1);
	this.add(node);
	node.updateMatrix();
	node.updateMatrixWorld(true);
};

/**
 * Overrides normal raycasting, to avoid raycasting when isMesh is set to false.
 * 
 * @method raycast
 */
MapSphereNode.prototype.raycast = function(raycaster, intersects)
{
	if(this.isMesh === true)
	{
		return Mesh.prototype.raycast.call(this, raycaster, intersects);
	}

	return false;
};

export {MapSphereNode};
