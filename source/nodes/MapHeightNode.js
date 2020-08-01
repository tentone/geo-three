import {Mesh, MeshPhongMaterial, Texture, RGBFormat, LinearFilter, ImageLoader, CanvasTexture} from "three";
import {MapNodeGeometry} from "../geometries/MapNodeGeometry";
import {MapNode} from "./MapNode.js";

/** 
 * Represents a height map tile node that can be subdivided into other height nodes.
 * 
 * Its important to update match the height of the tile with the neighbors nodes edge heights to ensure proper continuity of the surface.
 * 
 * The height node is designed to use MapBox elevation tile encoded data as described in https://www.mapbox.com/help/access-elevation-data/
 *
 * @class MapHeightNode
 * @param parentNode {MapHeightNode} The parent node of this node.
 * @param mapView {MapView} Map view object where this node is placed.
 * @param location {number} Position in the node tree relative to the parent.
 * @param level {number} Zoom level in the tile tree of the node.
 * @param x {number} X position of the node in the tile tree.
 * @param y {number} Y position of the node in the tile tree.
 * @param material {Material} Material used to render this height node.
 */
function MapHeightNode(parentNode, mapView, location, level, x, y, material)
{
	if(material === undefined)
	{
		material = new MeshPhongMaterial(
		{
			color: 0x000000,
			specular: 0x000000,
			shininess: 0,
			wireframe: false,
			emissive: 0xFFFFFF
		});
	}

	Mesh.call(this, MapHeightNode.GEOMETRY, material);
	MapNode.call(this, parentNode, mapView, location, level, x, y);

	this.matrixAutoUpdate = false;
	this.isMesh = true;
	
	this.visible = false;

	/**
	 * Flag indicating if the tile texture was loaded.
	 * 
	 * @attribute textureLoaded
	 * @type {boolean}
	 */
	this.textureLoaded = false;

	/**
	 * Flag indicating if the tile height data was loaded.
	 * 
	 * @attribute heightLoaded
	 * @type {boolean}
	 */
	this.heightLoaded = false;

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

MapHeightNode.prototype = Object.create(Mesh.prototype);
Object.assign(MapHeightNode.prototype, MapNode.prototype);

MapHeightNode.prototype.constructor = MapHeightNode;

/**
 * Max world height allowed.
 *
 * Applied when USE_DISPLACEMENT set to true to concatenate value to 8 bit range.
 *
 * @static
 * @attribute MAX_HEIGHT
 * @type {number}
 */
MapHeightNode.MAX_HEIGHT = 2e3;

/**
 * Dampening factor applied to the height retrieved from the server.
 *
 * Applied when USE_DISPLACEMENT set to true to concatenate value to 8 bit range.
 *
 * @static
 * @attribute HEIGHT_DAMPENING
 * @type {number}
 */
MapHeightNode.HEIGHT_DAMPENING = 10.0;

/**
 * Original tile size of the images retrieved from the height provider.
 *
 * @static
 * @attribute TILE_SIZE
 * @type {number}
 */
MapHeightNode.TILE_SIZE = 256;

/**
 * Size of the grid of the geometry displayed on the scene for each tile.
 *
 * @static
 * @attribute GEOMETRY_SIZE
 * @type {number}
 */
MapHeightNode.GEOMETRY_SIZE = 16;

/**
 * Map node plane geometry.
 *
 * @static
 * @attribute GEOMETRY
 * @type {PlaneBufferGeometry}
 */
MapHeightNode.GEOMETRY = new MapNodeGeometry(1, 1, MapHeightNode.GEOMETRY_SIZE, MapHeightNode.GEOMETRY_SIZE);

/**
 * Load tile texture from the server.
 * 
 * Aditionally in this height node it loads elevation data from the height provider and generate the appropiate maps.
 *
 * @method loadTexture
 */
MapHeightNode.prototype.loadTexture = function()
{
	var texture = new Texture();
	texture.generateMipmaps = false;
	texture.format = RGBFormat;
	texture.magFilter = LinearFilter;
	texture.minFilter = LinearFilter;
	texture.needsUpdate = false;

	this.material.emissiveMap = texture;
	
	var self = this;

	this.mapView.fetchTile(this.level, this.x, this.y).then(function(image)
	{
		texture.image = image;
		texture.needsUpdate = true;

		self.textureLoaded = true;
		self.nodeReady();
	});

	if(MapHeightNode.USE_DISPLACEMENT)
	{
		this.loadHeightDisplacement();
	}
	else
	{
		this.loadHeightGeometry();
	}
};

MapHeightNode.prototype.nodeReady = function()
{
	if(!this.heightLoaded || !this.textureLoaded)
	{
		return;
	}

	this.visible = true;

	MapNode.prototype.nodeReady.call(this);
};

MapHeightNode.prototype.createChildNodes = function()
{
	var level = this.level + 1;

	var x = this.x * 2;
	var y = this.y * 2;

	var node = new MapHeightNode(this, this.mapView, MapNode.TOP_LEFT, level, x, y);
	node.scale.set(0.5, 1, 0.5);
	node.position.set(-0.25, 0, -0.25);
	this.add(node);
	node.updateMatrix();
	node.updateMatrixWorld(true);

	var node = new MapHeightNode(this, this.mapView, MapNode.TOP_RIGHT, level, x + 1, y);
	node.scale.set(0.5, 1, 0.5);
	node.position.set(0.25, 0, -0.25);
	this.add(node);
	node.updateMatrix();
	node.updateMatrixWorld(true);

	var node = new MapHeightNode(this, this.mapView, MapNode.BOTTOM_LEFT, level, x, y + 1);
	node.scale.set(0.5, 1, 0.5);
	node.position.set(-0.25, 0, 0.25);
	this.add(node);
	node.updateMatrix();
	node.updateMatrixWorld(true);

	var node = new MapHeightNode(this, this.mapView, MapNode.BOTTOM_RIGHT, level, x + 1, y + 1);
	node.scale.set(0.5, 1, 0.5);
	node.position.set(0.25, 0, 0.25);
	this.add(node);
	node.updateMatrix();
	node.updateMatrixWorld(true);
};

/** 
 * Load height texture from the server and create a geometry to match it.
 *
 * @method loadHeightGeometry
 * @return {Promise<void>} Returns a promise indicating when the geometry generation has finished. 
 */
MapHeightNode.prototype.loadHeightGeometry = function()
{
	var self = this;

	this.mapView.heightProvider.fetchTile(this.level, this.x, this.y).then(function(image)
	{
		var geometry = new MapNodeGeometry(1, 1, MapHeightNode.GEOMETRY_SIZE, MapHeightNode.GEOMETRY_SIZE);
		var vertices = geometry.attributes.position.array;
	
		var canvas = new OffscreenCanvas(MapHeightNode.GEOMETRY_SIZE + 1, MapHeightNode.GEOMETRY_SIZE + 1);

		var context = canvas.getContext("2d");
		context.imageSmoothingEnabled = false;
		context.drawImage(image, 0, 0, MapHeightNode.TILE_SIZE, MapHeightNode.TILE_SIZE, 0, 0, canvas.width, canvas.height);
		
		var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		var data = imageData.data;
		for(var i = 0, j = 0; i < data.length && j < vertices.length; i += 4, j += 3)
		{
			var r = data[i];
			var g = data[i + 1];
			var b = data[i + 2];

			//The value will be composed of the bits RGB
			var value = (((r * 65536 + g * 256 + b) * 0.1) - 1e4);

			vertices[j + 1] = value;
		}

		self.geometry = geometry;
		self.heightLoaded = true;
		self.nodeReady();
	}).catch(function()
	{
		console.error("GeoThree: Failed to load height node data.", this);
		self.heightLoaded = true;
		self.nodeReady();
	});
};

/**
 * Overrides normal raycasting, to avoid raycasting when isMesh is set to false.
 * 
 * @method raycast
 */
MapHeightNode.prototype.raycast = function(raycaster, intersects)
{
	if(this.isMesh === true)
	{
		return Mesh.prototype.raycast.call(this, raycaster, intersects);
	}

	return false;
};

export {MapHeightNode};
