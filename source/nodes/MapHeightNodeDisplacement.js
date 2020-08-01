import {Mesh, MeshPhongMaterial, RGBFormat, LinearFilter, CanvasTexture} from "three";
import {MapNode} from "./MapNode.js";

/** 
 * TODO
 *
 * @class MapHeightNodeDisplacement
 */
function MapHeightNodeDisplacement(parentNode, mapView, location, level, x, y)
{
	var material = new MeshPhongMaterial(
	{
		color: 0x000000,
		specular: 0x000000,
		shininess: 0,
		wireframe: false,
		emissive: 0xFFFFFF
	});

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

MapHeightNodeDisplacement.prototype = Object.create(MapHeightNode.prototype);

MapHeightNodeDisplacement.prototype.constructor = MapHeightNodeDisplacement;

/**
 * Load tile texture from the server.
 * 
 * Aditionally in this height node it loads elevation data from the height provider and generate the appropiate maps.
 *
 * @method loadTexture
 */
MapHeightNodeDisplacement.prototype.loadTexture = function()
{
	MapHeightNode.prototype.loadTexture.call(this);

	this.loadHeightDisplacement();
};

/** 
 * Load height texture from the server and create a displacement map from it.
 *
 * @method loadHeightDisplacement
 * @return {Promise<void>} Returns a promise indicating when the geometry generation has finished. 
 */
MapHeightNodeDisplacement.prototype.loadHeightDisplacement = function()
{
	var self = this;

	this.mapView.heightProvider.fetchTile(this.level, this.x, this.y).then(function(image)
	{
		var canvas = new OffscreenCanvas(MapHeightNode.GEOMETRY_SIZE, MapHeightNode.GEOMETRY_SIZE);

		var context = canvas.getContext("2d");
		context.imageSmoothingEnabled = false;
		context.drawImage(image, 0, 0, MapHeightNode.TILE_SIZE, MapHeightNode.TILE_SIZE, 0, 0, canvas.width, canvas.height);
		
		var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		var data = imageData.data;

		for(var i = 0; i < data.length; i += 4)
		{
			var r = data[i];
			var g = data[i + 1];
			var b = data[i + 2];

			//The value will be composed of the bits RGB
			var value = (((r * 65536 + g * 256 + b) * 0.1) - 1e4) / MapHeightNode.HEIGHT_DAMPENING;

			//Limit value to fit 1 byte
			if(value < 0)
			{
				value = 0;
			}
			else if(value > 255)
			{
				value = 255;
			}

			data[i] = value;
			data[i + 1] = value;
			data[i + 2] = value;
		}

		context.putImageData(imageData, 0, 0);

		var displacement = new CanvasTexture(canvas);
		displacement.generateMipmaps = false;
		displacement.format = RGBFormat;
		displacement.magFilter = LinearFilter;
		displacement.minFilter = LinearFilter;

		self.material.displacementMap = displacement;
		self.material.displacementScale = 1.0;
		self.material.displacementBias = 0.0;
		self.material.needsUpdate = true;

		self.heightLoaded = true;
		self.nodeReady();
	}).catch(function()
	{
		console.error("GeoThree: Failed to load height node data.", this);
		self.heightLoaded = true;
		self.nodeReady();
	});
};

export {MapHeightNodeDisplacement};
