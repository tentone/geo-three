import { LinearFilter, Material, Mesh, MeshPhongMaterial, RGBFormat, Texture, Vector3, BufferGeometry } from 'three';
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
	 */
	mapView: MapView;

	/**
	 * Parent node (from an upper tile level).
	 */
	parentNode: MapNode;

	/**
	 * Index of the map node in the quad-tree parent node.
	 *
	 * Position in the tree parent, can be TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT or BOTTOM_RIGHT.
	 */
	location: number;

	/**
	 * Tile level of this node.
	 */
	level: number;

	/**
	 * Tile x position.
	 */
	x: number;

	/**
	 * Tile y position.
	 */
	y: number;

	/**
	 * Indicates how many children nodes where loaded.
	 */
	nodesLoaded: number = 0;

	/**
	 * Variable to check if the node is subdivided.
	 *
	 * To avoid bad visibility changes on node load.
	 */
	subdivided: boolean = false;

	/**
	 * Variable to check if the node is a mesh.
	 *
	 * Used to draw or not draw the node
	 */
	isMesh: boolean = true;

	/**
	 * Cache with the children objects created from subdivision.
	 *
	 * Used to avoid recreate object after simplification and subdivision.
	 *
	 * The default value is null.
	 */
	childrenCache: any[] = null;

	constructor(geometry = null, material = null, parentNode = null, mapView: MapView = null, location = MapNode.ROOT, level = 0, x = 0, y = 0) {
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

		/**
		 * The map view object where the node is placed.
		 *
		 * @attribute mapView
		 * @type {MapView}
		 */
		this.mapView = mapView;

		this.initialize();
	}

	/**
	 * Base geometry is attached to the map viewer object.
	 *
	 * It should have the full size of the world so that operations over the MapView bounding box/sphere work correctly.
	 */
	static BASE_GEOMETRY: BufferGeometry = null;

	/**
	 * Base scale applied to the map viewer object.
	 */
	static BASE_SCALE: Vector3 = null;

	/**
	 * How many children each branch of the tree has.
	 *
	 * For a quad-tree this value is 4.
	 */
	static CHILDRENS: number = 4;

	/**
	 * Root node has no location.
	 */
	static ROOT: number = -1;

	/**
	 * Index of top left quad-tree branch node.
	 *
	 * Can be used to navigate the children array looking for neighbors.
	 */
	static TOP_LEFT: number = 0;

	/**
	 * Index of top left quad-tree branch node.
	 *
	 * Can be used to navigate the children array looking for neighbors.
	 */
	static TOP_RIGHT: number = 1;

	/**
	 * Index of top left quad-tree branch node.
	 *
	 * Can be used to navigate the children array looking for neighbors.
	 */
	static BOTTOM_LEFT = 2;

	/**
	 * Index of top left quad-tree branch node.
	 *
	 * Can be used to navigate the children array looking for neighbors.
	 */
	static BOTTOM_RIGHT = 3;

	/**
	 * Initialize resources that require access to data from the MapView.
	 *
	 * Called automatically by the constructor for child nodes and MapView when a root node is attached to it.
	 */
	initialize() {}

	/**
	 * Create the child nodes to represent the next tree level.
	 *
	 * These nodes should be added to the object, and their transformations matrix should be updated.
	 */
	createChildNodes() {}

	/**
	 * Subdivide node,check the maximum depth allowed for the tile provider.
	 *
	 * Uses the createChildNodes() method to actually create the child nodes that represent the next tree level.
	 */
	subdivide() {
		const maxZoom = Math.min(this.mapView.provider.maxZoom, this.mapView.heightProvider.maxZoom);
		if (this.children.length > 0 || this.level + 1 > maxZoom || (this.parentNode !== null && this.parentNode.nodesLoaded < MapNode.CHILDRENS)) {
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
	 */
	loadTexture() {
		const self = this;

		this.mapView.provider
			.fetchTile(this.level, this.x, this.y)
			.then(function (image) {
				const texture = new Texture(image as any);
				texture.generateMipmaps = false;
				texture.format = RGBFormat;
				texture.magFilter = LinearFilter;
				texture.minFilter = LinearFilter;
				texture.needsUpdate = true;

				self.material.map = texture;
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

				self.material.map = texture;
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
	 * @param - direction Direction to get neighbors.
	 * @returns The neighbors array, if no neighbors found returns empty.
	 */
	getNeighborsDirection(direction: number): MapNode[] {
		// TODO <ADD CODE HERE>

		return null;
	}

	/**
	 * Get all the quad tree nodes neighbors. Are considered neighbors all the nodes directly in contact with a edge of this node.
	 *
	 * @returns The neighbors array, if no neighbors found returns empty.
	 */
	getNeighbors(): MapNode[] {
		const neighbors = [];

		// TODO <ADD CODE HERE>

		return neighbors;
	}
}
