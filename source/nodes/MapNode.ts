import {LinearFilter, Material, Mesh, Texture, Vector3, BufferGeometry, Object3D, RGBAFormat} from 'three';
import {MapView} from '../MapView';
import { TextureUtils } from '../utils/TextureUtils';

/**
 * Constants to store quad-tree positions.
 */
export class QuadTreePosition {
	/**
	 * Root node has no location.
	 */
	public static root: number = -1;

	/**
	 * Index of top left quad-tree branch node.
	 *
	 * Can be used to navigate the children array looking for neighbors.
	 */
	public static topLeft: number = 0;

	/**
	 * Index of top left quad-tree branch node.
	 *
	 * Can be used to navigate the children array looking for neighbors.
	 */
	public static topRight: number = 1;

	/**
	 * Index of top left quad-tree branch node.
	 *
	 * Can be used to navigate the children array looking for neighbors.
	 */
	public static bottomLeft: number = 2;

	/**
	 * Index of top left quad-tree branch node.
	 *
	 * Can be used to navigate the children array looking for neighbors.
	 */
	public static bottomRight: number = 3;
}

/**
 * Represents a map tile node inside of the tiles quad-tree
 *
 * Each map node can be subdivided into other nodes.
 *
 * It is intended to be used as a base class for other map node implementations.
 */
export abstract class MapNode extends Mesh 
{
	/**
	 * The map view object where the node is placed.
	 */
	public mapView: MapView = null;

	/**
	 * Parent node (from an upper tile level).
	 */
	public parentNode: MapNode = null;

	/**
	 * Index of the map node in the quad-tree parent node.
	 *
	 * Position in the tree parent, can be topLeft, topRight, bottomLeft or bottomRight.
	 */
	public location: number;

	/**
	 * Tile level of this node.
	 */
	public level: number;

	/**
	 * Tile x position.
	 */
	public x: number;

	/**
	 * Tile y position.
	 */
	public y: number;

	/**
	 * Variable to check if the node is subdivided.
	 *
	 * To avoid bad visibility changes on node load.
	 */
	public subdivided: boolean = false;

	/**
	 * Flag to indicate if the map node was disposed.
	 * 
	 * When a map node is disposed its resources are dealocated to save memory.
	 */
	public disposed: boolean = false;

	/**
	 * Indicates how many children nodes are loaded.
	 * 
	 * The child on become visible once all of them are loaded.
	 */
	public nodesLoaded: number = 0;

	/**
	 * Cache with the children objects created from subdivision.
	 *
	 * Used to avoid recreate object after simplification and subdivision.
	 *
	 * The default value is null. Only used if "cacheTiles" is set to true.
	 */
	public childrenCache: Object3D[] = null;

	/**
	 * Base geometry is attached to the map viewer object.
	 *
	 * It should have the full size of the world so that operations over the MapView bounding box/sphere work correctly.
	 */
	public static baseGeometry: BufferGeometry = null;

	/**
	 * Base scale applied to the map viewer object.
	 */
	public static baseScale: Vector3 = null;
 
	/**
	 * How many children each branch of the tree has.
	 *
	 * For a quad-tree this value is 4.
	 */
	public static childrens: number = 4;

	/**
	 * Flag to check if the node is a mesh by the renderer.
	 *
	 * Used to toggle the visibility of the node. The renderer skips the node rendering if this is set false.
	 */
	// @ts-ignore
	public isMesh: boolean = true;

	public constructor(parentNode: MapNode = null, mapView: MapView = null, location: number = QuadTreePosition.root, level: number = 0, x: number = 0, y: number = 0, geometry: BufferGeometry = null, material: Material = null) 
	{
		super(geometry, material);

		this.mapView = mapView;
		this.parentNode = parentNode;
		this.disposed = false;

		this.location = location;
		this.level = level;
		this.x = x;
		this.y = y;

		this.initialize();
	}

	/**
	 * Initialize resources that require access to data from the MapView.
	 *
	 * Called automatically by the constructor for child nodes and MapView when a root node is attached to it.
	 */
	public async initialize(): Promise<void> {}

	/**
	 * Create the child nodes to represent the next tree level.
	 *
	 * These nodes should be added to the object, and their transformations matrix should be updated.
	 */
	public createChildNodes(): void {}

	/**
	 * Subdivide node,check the maximum depth allowed for the tile provider.
	 *
	 * Uses the createChildNodes() method to actually create the child nodes that represent the next tree level.
	 */
	public subdivide(): void
	{
		const maxZoom = Math.min(this.mapView.provider.maxZoom, this.mapView.heightProvider?.maxZoom ?? Infinity);
		if (this.children.length > 0 || this.level + 1 > maxZoom || this.parentNode !== null && this.parentNode.nodesLoaded < MapNode.childrens)
		{
			return;
		}

		if (this.mapView.cacheTiles && this.childrenCache !== null) 
		{
			this.isMesh = false;
			this.children = this.childrenCache;
			this.nodesLoaded = this.childrenCache.length;
		}
		else 
		{
			this.createChildNodes();
		}

		this.subdivided = true;
	}

	/**
	 * Simplify node, remove all children from node, store them in cache.
	 *
	 * Reset the subdivided flag and restore the visibility.
	 *
	 * This base method assumes that the node implementation is based off Mesh and that the isMesh property is used to toggle visibility.
	 */
	public simplify(): void
	{
		if (this.mapView.cacheTiles) 
		{
			// Store current children in cache.
			this.childrenCache = this.children;
		}
		else
		{
			// Dispose resources in use
			for (let i = 0; i < this.children.length; i++) {
				(this.children[i] as MapNode).dispose();
			}
		}
		
		// Clear children and reset flags
		this.subdivided = false;
		this.isMesh = true;
		this.children = [];
		this.nodesLoaded = 0;
	}

	/**
	 * Load tile texture from the server.
	 *
	 * This base method assumes the existence of a material attribute with a map texture.
	 */
	public async loadData(): Promise<void>
	{
		try 
		{
			const image: HTMLImageElement = await this.mapView.provider.fetchTile(this.level, this.x, this.y);
		
			const texture = new Texture(image);
			texture.generateMipmaps = false;
			texture.format = RGBAFormat;
			texture.magFilter = LinearFilter;
			texture.minFilter = LinearFilter;
			texture.needsUpdate = true;
			
			// @ts-ignore
			this.material.map = texture;
		}
		catch (e) 
		{
			// @ts-ignore
			this.material.map = TextureUtils.createFillTexture();
		}

		// @ts-ignore
		this.material.needsUpdate = true;
	}
1
	/**
	 * Increment the child loaded counter.
	 *
	 * Should be called after a map node is ready for display.
	 */
	public nodeReady(): void
	{
		if (this.disposed) {
			console.error('Geo-Three: nodeReady() called for disposed node.', this);
			return;
		}

		if (this.parentNode !== null) 
		{
			this.parentNode.nodesLoaded++;

			if (this.parentNode.nodesLoaded == MapNode.childrens) 
			{
				if (this.parentNode.subdivided === true) 
				{
					this.parentNode.isMesh = false;
				}
				
				for (let i = 0; i < this.parentNode.children.length; i++) 
				{
					this.parentNode.children[i].visible = true;
				}
			}

			if (this.parentNode.nodesLoaded > MapNode.childrens) {
				console.error('Geo-Three: Loaded more children objects than expected.', this.parentNode.nodesLoaded, this);
			}
		}
		// If its the root object just set visible
		else
		{
			this.visible = true;
		}
	}

	/**
	 * Dispose the map node and its resources.
	 * 
	 * Cancel all ongoing requests for data.
	 */
	public dispose(): void {
		this.disposed = true;

		const self = this as Mesh;
		(self.material as Material).dispose();
		self.geometry.dispose();
	}
}
