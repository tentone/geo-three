import {RGBFormat, LinearFilter, CanvasTexture} from "three";
import {MapHeightNode} from "./MapHeightNode.js";

/** 
 * TODO
 *
 * @class MapHeightNodeShader
 * @param parentNode {MapHeightNode} The parent node of this node.
 * @param mapView {MapView} Map view object where this node is placed.
 * @param location {number} Position in the node tree relative to the parent.
 * @param level {number} Zoom level in the tile tree of the node.
 * @param x {number} X position of the node in the tile tree.
 * @param y {number} Y position of the node in the tile tree.
 */
function MapHeightNodeShader(parentNode, mapView, location, level, x, y, material)
{
	MapHeightNode.call(this, parentNode, mapView, location, level, x, y, material);
}

MapHeightNodeShader.prototype = Object.create(MapHeightNode.prototype);

MapHeightNodeShader.prototype.constructor = MapHeightNodeShader;

/**
 * Load tile texture from the server.
 * 
 * Aditionally in this height node it loads elevation data from the height provider and generate the appropiate maps.
 *
 * @method loadTexture
 */
MapHeightNodeShader.prototype.loadTexture = function()
{
	MapHeightNode.prototype.loadTexture.call(this);

	this.loadHeightDisplacement();
};

export {MapHeightNodeShader};
