import { LinearFilter, Material, Mesh, MeshPhongMaterial, RGBFormat, Texture } from 'three';
import { MapView } from '../MapView';

/**
 * Represents a map tile node inside of the tiles quad-tree
 *
 * Each map node can be subdivided into other nodes.
 *
 * It is intended to be used as a base class for other map node implementations.
 *
 * @class MapNode
 */
export class MapNode extends Mesh {
	/**
	 * The map view.
	 *
	 * @attribute mapView
	 * @type {MapView}
	 */
	mapView: MapView;

	/**
	 * Parent node (from an upper tile level).
	 *
	 * @attribute parentNode
	 * @type {MapNode}
	 */
	parentNode: MapNode;

	/**
	 * Index of the map node in the quad-tree parent node.
	 *
	 * Position in the tree parent, can be TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT or BOTTOM_RIGHT.
	 *
	 * @attribute location
	 * @type {number}
	 */
	location: number;

	/**
	 * Tile level of this node.
	 *
	 * @attribute level
	 * @type {number}
	 */
	level: number;

	/**
	 * Tile x position.
	 *
	 * @attribute x
	 * @type {number}
	 */
	x: number;

	/**
	 * Tile y position.
	 *
	 * @attribute y
	 * @type {number}
	 */
	y: number;

	/**
	 * Indicates how many children nodes where loaded.
	 *
	 * @attribute nodesLoaded
	 * @type {number}
	 */
	nodesLoaded = 0;

	/**
	 * Variable to check if the node is subdivided.
	 *
	 * To avoid bad visibility changes on node load.
	 *
	 * @attribute subdivided
	 * @type {boolean}
	 */
	subdivided = false;

	/**
	 * Variable to check if the node is a mesh.
	 *
	 * Used to draw or not draw the node
	 *
	 * @attribute subdivided
	 * @type {boolean}
	 */
	isMesh;

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
	childrenCache = null;

	material: Material;

	constructor(geometry, material, parentNode: MapNode, mapView: MapView, location: number, level: number, x: number, y: number) {
		super(geometry, material);

		this.mapView = mapView;
		this.parentNode = parentNode;
		this.location = location;
		this.level = level;
		this.x = x;
		this.y = y;
		this.nodesLoaded = 0;
		this.subdivided = false;
		this.childrenCache = null;
	}

	/**
	 * How many children each branch of the tree has.
	 *
	 * For a quad-tree this value is 4.
	 *
	 * @static
	 * @attribute CHILDRENS
	 * @type {number}
	 */
	static CHILDRENS = 4;

	/**
	 * Root node has no location.
	 *
	 * @static
	 * @attribute ROOT
	 * @type {number}
	 */
	static ROOT = -1;

	/**
	 * Index of top left quad-tree branch node.
	 *
	 * Can be used to navigate the children array looking for neighbors.
	 *
	 * @static
	 * @attribute TOP_LEFT
	 * @type {number}
	 */
	static TOP_LEFT = 0;

	/**
	 * Index of top left quad-tree branch node.
	 *
	 * Can be used to navigate the children array looking for neighbors.
	 *
	 * @static
	 * @attribute TOP_RIGHT
	 * @type {number}
	 */
	static TOP_RIGHT = 1;

	/**
	 * Index of top left quad-tree branch node.
	 *
	 * Can be used to navigate the children array looking for neighbors.
	 *
	 * @static
	 * @attribute BOTTOM_LEFT
	 * @type {number}
	 */
	static BOTTOM_LEFT = 2;

	/**
	 * Index of top left quad-tree branch node.
	 *
	 * Can be used to navigate the children array looking for neighbors.
	 *
	 * @static
	 * @attribute BOTTOM_RIGHT
	 * @type {number}
	 */
	static BOTTOM_RIGHT = 3;

	/**
	 * Create the child nodes to represent the next tree level.
	 *
	 * These nodes should be added to the object, and their transformations matrix should be updated.
	 *
	 * @method createChildNodes
	 */
	createChildNodes() {}

	/**
	 * Subdivide node,check the maximum depth allowed for the tile provider.
	 *
	 * Uses the createChildNodes() method to actually create the child nodes that represent the next tree level.
	 *
	 * @method subdivide
	 */
	subdivide() {
		if (this.children.length > 0 || this.level + 1 > this.mapView.provider.maxZoom || (this.parentNode !== null && this.parentNode.nodesLoaded < MapNode.CHILDRENS)) {
			return;
		}

		this.subdivided = true;

		if (this.childrenCache !== null) {
			this.isMesh = false;
			this.children = this.childrenCache;
		} else {
			this.createChildNodes();
		}
	}

	/**
	 * Simplify node, remove all children from node, store them in cache.
	 *
	 * Reset the subdivided flag and restore the visibility.
	 *
	 * This base method assumes that the node implementation is based off Mesh and that the isMesh property is used to toggle visibility.
	 *
	 * @method simplify
	 */
	simplify() {
		if (this.children.length > 0) {
			this.childrenCache = this.children;
		}

		this.subdivided = false;
		this.isMesh = true;
		this.children = [];
	}

	/**
	 * Load tile texture from the server.
	 *
	 * This base method assumes the existence of a material attribute with a map texture.
	 *
	 * @method loadTexture
	 * @param {Function} onLoad
	 */
	loadTexture(onLoad?) {
		const self = this;

		this.mapView
			.fetchTile(this.level, this.x, this.y)
			.then(function (image) {
				const texture = new Texture(image as any);
				texture.generateMipmaps = false;
				texture.format = RGBFormat;
				texture.magFilter = LinearFilter;
				texture.minFilter = LinearFilter;
				texture.needsUpdate = true;

				(self.material as MeshPhongMaterial).map = texture;
				self.nodeReady();
			})
			.catch(function () {
				const canvas = new OffscreenCanvas(1, 1);
				const context = canvas.getContext('2d');
				context.fillStyle = '#FF0000';
				context.fillRect(0, 0, 1, 1);

				const texture = new Texture(canvas as any);
				texture.generateMipmaps = false;
				texture.needsUpdate = true;

				(self.material as MeshPhongMaterial).map = texture;
				self.nodeReady();
			});
	}

	/**
	 * Increment the child loaded counter.
	 *
	 * Should be called after a map node is ready for display.
	 *
	 * @method nodeReady
	 */
	nodeReady() {
		// Update parent nodes loaded
		if (this.parentNode !== null) {
			this.parentNode.nodesLoaded++;

			if (this.parentNode.nodesLoaded >= MapNode.CHILDRENS) {
				if (this.parentNode.subdivided === true) {
					this.parentNode.isMesh = false;
				}

				for (let i = 0; i < this.parentNode.children.length; i++) {
					this.parentNode.children[i].visible = true;
				}
			}
		}
		// If its the root object just set visible
		else {
			this.visible = true;
		}
	}

	/**
	 * Get all the neighbors in a specific direction (left, right, up down).
	 *
	 * @method getNeighborsDirection
	 * @param {number} direction
	 * @return {MapNode[]} The neighbors array, if no neighbors found returns empty.
	 */
	getNeighborsDirection(direction) {
		// TODO <ADD CODE HERE>

		return null;
	}

	/**
	 * Get all the quad tree nodes neighbors. Are considered neighbors all the nodes directly in contact with a edge of this node.
	 *
	 * @method getNeighbors
	 * @return {MapNode[]} The neighbors array, if no neighbors found returns empty.
	 */
	getNeighbors() {
		const neighbors = [];

		// TODO <ADD CODE HERE>

		return neighbors;
	}
}
