import {RGBFormat, LinearFilter, CanvasTexture} from "three";
import {MapHeightNode} from "./MapHeightNode.js";

/** 
 * Map height node using a displacement map for the height. This method should be avoided its clamped to 8bit height.
 * 
 * Uses a Phong material with a grayscale displacement map. 
 *
 * @class MapHeightNodeDisplacement
 * @param parentNode {MapHeightNode} The parent node of this node.
 * @param mapView {MapView} Map view object where this node is placed.
 * @param location {number} Position in the node tree relative to the parent.
 * @param level {number} Zoom level in the tile tree of the node.
 * @param x {number} X position of the node in the tile tree.
 * @param y {number} Y position of the node in the tile tree.
 */
function MapHeightNodeDisplacement(parentNode, mapView, location, level, x, y)
{
	MapHeightNode.call(this, parentNode, mapView, location, level, x, y);
}

MapHeightNodeDisplacement.prototype = Object.create(MapHeightNode.prototype);

MapHeightNodeDisplacement.prototype.constructor = MapHeightNodeDisplacement;

/**
 * Max world height allowed, applied to the displacement.
 *
 * @static
 * @attribute DISPLACEMENT_SCALE
 * @type {number}
 */
MapHeightNodeDisplacement.DISPLACEMENT_SCALE = 1.0;

/**
 * Dampening factor applied to the height retrieved from the server.
 *
 * @static
 * @attribute HEIGHT_DAMPENING
 * @type {number}
 */
MapHeightNodeDisplacement.HEIGHT_DAMPENING = 10.0;

/** 
 * Load height texture from the server and create a displacement map from it.
 *
 * @method loadHeightGeometry
 * @return {Promise<void>} Returns a promise indicating when the geometry generation has finished. 
 */
MapHeightNodeDisplacement.prototype.loadHeightGeometry = function()
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
			var value = (((r * 65536 + g * 256 + b) * 0.1) - 1e4) / MapHeightNodeDisplacement.HEIGHT_DAMPENING;

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
		self.material.displacementScale = MapHeightNodeDisplacement.DISPLACEMENT_SCALE;
		self.material.displacementBias = 0.0;
		self.material.needsUpdate = true;

		self.heightLoaded = true;
		self.nodeReady();
	}).catch(function(e)
	{
		console.error("GeoThree: Failed to load height node data.", e);
		self.heightLoaded = true;
		self.nodeReady();
	});
};

export {MapHeightNodeDisplacement};
