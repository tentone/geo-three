import {Texture, ImageLoader, RGBFormat, LinearFilter} from "three";

/** 
 * Represents a map tile node inside of the tiles quad-tree
 * 
 * Each map node can be subdivided into other nodes.
 * 
 * It is intended to be used as a base class for other map node implementations.
 * 
 * @class MapNode
 */
function MapNode(parentNode, mapView, location, level, x, y)
{
	/**
	 * The map view.
	 *
	 * @attribute mapView
	 * @type {MapView}
	 */
	this.mapView = mapView;

	/**
	 * Parent node (from an upper tile level).
	 * 
	 * @attribute parentNode
	 * @type {MapPlaneNode}
	 */
	this.parentNode = parentNode;
	
	/**
	 * Index of the map node in the quad-tree parent node.
	 *
	 * Position in the tree parent, can be TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT or BOTTOM_RIGHT.
	 *
	 * @attribute location
	 * @type {Number}
	 */
	this.location = location;

	/**
	 * Tile level of this node.
	 * 
	 * @attribute level
	 * @type {Number}
	 */
	this.level = level;

	/**
	 * Tile x position.
	 * 
	 * @attribute x
	 * @type {Number}
	 */
	this.x = x;

	/**
	 * Tile y position.
	 * 
	 * @attribute y
	 * @type {Number}
	 */
	this.y = y;

	/**
	 * Indicates how many children nodes where loaded.
	 *
	 * @attribute nodesLoaded
	 * @type {Number}
	 */
	this.nodesLoaded = 0;

	/** 
	 * Variable to check if the node is subdivided.
	 *
	 * To avoid bad visibility changes on node load.
	 *
	 * @attribute subdivided
	 * @type {Boolean}
	 */
	this.subdivided = false;
}

/**
 * How many children each branch of the tree has.
 *
 * For a quad-tree this value is 4.
 *
 * @static
 * @attribute CHILDRENS
 * @type {Number}
 */
MapNode.CHILDRENS = 4;

/**
 * Root node has no location.
 *
 * @static
 * @attribute ROOT
 * @type {Number}
 */
MapNode.ROOT = -1;

/**
 * Index of top left quad-tree branch node.
 *
 * Can be used to navigate the children array looking for neighbors.
 *
 * @static
 * @attribute TOP_LEFT
 * @type {Number}
 */
MapNode.TOP_LEFT = 0;

/**
 * Index of top left quad-tree branch node.
 *
 * Can be used to navigate the children array looking for neighbors.
 *
 * @static
 * @attribute TOP_RIGHT
 * @type {Number}
 */
MapNode.TOP_RIGHT = 1;

/**
 * Index of top left quad-tree branch node.
 *
 * Can be used to navigate the children array looking for neighbors.
 *
 * @static
 * @attribute BOTTOM_LEFT
 * @type {Number}
 */
MapNode.BOTTOM_LEFT = 2;

/**
 * Index of top left quad-tree branch node.
 *
 * Can be used to navigate the children array looking for neighbors.
 *
 * @static
 * @attribute BOTTOM_RIGHT
 * @type {Number}
 */
MapNode.BOTTOM_RIGHT = 3;

/**
 * Create the child nodes to represent the next tree level.
 *
 * These nodes should be added to the object, and their transformations matrix should be updated.
 *
 * @method createChildNodes 
 */
MapNode.prototype.createChildNodes = function(){};

/**
 * Subdivide node,check the maximum depth allowed for the tile provider.
 *
 * Uses the createChildNodes() method to actually create the child nodes that represent the next tree level.
 * 
 * @method subdivide
 */
MapNode.prototype.subdivide =  function()
{
	if(this.children.length > 0 || this.level + 1 > this.mapView.provider.maxZoom || (this.parentNode !== null && this.parentNode.nodesLoaded < MapNode.CHILDRENS))
	{
		return;
	}

	this.subdivided = true;

	if(this.childrenCache !== null)
	{
		this.isMesh = false;
		this.children = this.childrenCache;
	}
	else
	{
		this.createChildNodes();
	}
};

/**
 * Simplify node, remove all children from node, store them in cache.
 *
 * Reset the subdivided flag and restore the visibility.
 *
 * This base method assumes that the node implementation is based off Mesh and that the isMesh property is used to toggle visibility.
 *
 * @method simplify
 */
MapNode.prototype.simplify = function()
{
	if(this.children.length > 0)
	{
		this.childrenCache = this.children;
	}

	this.subdivided = false;
	this.isMesh = true;
	this.children = [];
};

/**
 * Load tile texture from the server.
 * 
 * This base method assumes the existence of a material attribute with a map texture.
 *
 * @method loadTexture
 * @param {Function} onLoad 
 */
MapNode.prototype.loadTexture = function(onLoad)
{
	var texture = new Texture();
	texture.generateMipmaps = false;
	texture.format = RGBFormat;
	texture.magFilter = LinearFilter;
	texture.minFilter = LinearFilter;
	texture.needsUpdate = false;

	this.material.map = texture;

	var self = this;
	
	this.mapView.fetchTile(this.level, this.x, this.y).then(function(image)
	{
		texture.image = image;
		texture.needsUpdate = true;
		self.nodeReady();
	}).catch(function()
	{
		var canvas = new OffscreenCanvas(1, 1);
		var context = canvas.getContext("2d");
		context.fillStyle = "#FF0000";
		context.fillRect(0, 0, 1, 1);
		texture.image = canvas;
		texture.needsUpdate = true;
		self.nodeReady();
	});
};

/** 
 * Increment the child loaded counter.
 *
 * Should be called after a map node is ready for display.
 *
 * @method nodeReady
 */
MapNode.prototype.nodeReady = function()
{
	//Update parent nodes loaded
	if(this.parentNode !== null)
	{
		this.parentNode.nodesLoaded++;

		if(this.parentNode.nodesLoaded >= MapNode.CHILDRENS)
		{
			if(this.parentNode.subdivided === true)
			{
				this.parentNode.isMesh = false;
			}

			for(var i = 0; i < this.parentNode.children.length; i++)
			{
				this.parentNode.children[i].visible = true;
			}
		}
	}
	//If its the root object just set visible
	else
	{
		this.visible = true;
	}
};

/**
 * Get all the neighbors in a specific direction (left, right, up down).
 *
 * @method getNeighborsDirection
 * @param {Number} direction
 * @return {MapNode[]} The neighbors array, if no neighbors found returns empty.
 */
MapNode.prototype.getNeighborsDirection = function(direction)
{
	//TODO <ADD CODE HERE>

	return null;
};

/**
 * Get all the quad tree nodes neighbors. Are considered neighbors all the nodes directly in contact with a edge of this node.
 *
 * @method getNeighbors
 * @return {MapNode[]} The neighbors array, if no neighbors found returns empty.
 */
MapNode.prototype.getNeighbors = function()
{
	var neighbors = [];

	//TODO <ADD CODE HERE>

	return neighbors;
};

export {MapNode};