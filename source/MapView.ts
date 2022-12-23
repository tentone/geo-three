import {BufferGeometry, Camera, Group, Material, Mesh, MeshBasicMaterial, Object3D, Raycaster, Scene, WebGLRenderer} from 'three';
import {OpenStreetMapsProvider} from './providers/OpenStreetMapsProvider';
import {MapNode} from './nodes/MapNode';
import {MapHeightNode} from './nodes/MapHeightNode';
import {MapPlaneNode} from './nodes/MapPlaneNode';
import {MapSphereNode} from './nodes/MapSphereNode';
import {MapHeightNodeShader} from './nodes/MapHeightNodeShader';
import {LODRaycast} from './lod/LODRaycast';
import {MapProvider} from './providers/MapProvider';
import {LODControl} from './lod/LODControl';
import {MapMartiniHeightNode} from './nodes/MapMartiniHeightNode';

/**
 * Map viewer is used to read and display map tiles from a server.
 *
 * It was designed to work with a OpenMapTiles but can also be used with another map tiles.
 *
 * The map is drawn in plane map nodes using a quad tree that is subdivided as necessary to guaratee good map quality.
 */
export class MapView extends Mesh 
{
	/**
	 * Planar map projection.
	 */
	public static PLANAR: number = 200;

	/**
	 * Spherical map projection.
	 */
	public static SPHERICAL: number = 201;

	/**
	 * Planar map projection with height deformation.
	 */
	public static HEIGHT: number = 202;

	/**
	 * Planar map projection with height deformation using the GPU for height generation.
	 */
	public static HEIGHT_SHADER: number = 203;

	/**
	 * RTIN map mode.
	 */
	public static MARTINI: number = 204;

	/**
	 * Map of the map node types available.
	 */
	public static mapModes: Map<number, any> = new Map<number, any>([
		[MapView.PLANAR, MapPlaneNode],
		[MapView.SPHERICAL, MapSphereNode],
		[MapView.HEIGHT, MapHeightNode],
		[MapView.HEIGHT_SHADER, MapHeightNodeShader],
		[MapView.MARTINI, MapMartiniHeightNode]
	]);

	/**
	 * LOD control object used to defined how tiles are loaded in and out of memory.
	 */
	public lod: LODControl = null;

	/**
	 * Map tile color layer provider.
	 */
	public provider: MapProvider = null;

	/**
	 * Map height (terrain elevation) layer provider.
	 * 
	 * Only used for HEIGHT, HEIGHT_SHADER and MARTINI map modes.
	 */
	public heightProvider: MapProvider = null;

	/**
	 * Define the type of map node in use, defined how the map is presented.
	 *
	 * Should only be set on creation.
	 */
	public root: MapNode = null;

	/**
	 * Indicate if the nodes should cache its children when it is simplified. Nodes that are no longer in use should be kept in memory.
	 * 
	 * Usefull for fast moving scenarios to prevent reparsing data in fast moving scenes.
	 * 
	 * Should only be used if the child generation process is time consuming. Should be kept off unless required.
	 */
	public cacheTiles: boolean = false;

	/**
	 * Constructor for the map view objects.
	 *
	 * @param root - Map view node modes can be SPHERICAL, HEIGHT or PLANAR. PLANAR is used by default. Can also be a custom MapNode instance.
	 * @param provider - Map color tile provider by default a OSM maps provider is used if none specified.
	 * @param heightProvider - Map height tile provider, by default no height provider is used.
	 */
	public constructor(root: (number | MapNode) = MapView.PLANAR, provider: MapProvider = new OpenStreetMapsProvider(), heightProvider: MapProvider = null) 
	{
		super(undefined, new MeshBasicMaterial({transparent: true, opacity: 0.0}));

		this.lod = new LODRaycast();

		this.provider = provider;
		this.heightProvider = heightProvider;

		this.setRoot(root);
		this.preSubdivide();
	}

	/**
	 * Ajust node configuration depending on the camera distance.
	 *
	 * Called everytime automatically before render by the renderer.
	 */
	public onBeforeRender: (renderer: WebGLRenderer, scene: Scene, camera: Camera, geometry: BufferGeometry, material: Material, group: Group)=> void = (renderer, scene, camera, geometry, material, group) => 
	{
		this.lod.updateLOD(this, camera, renderer, scene);
	};

	/**
	 * Set the root of the map view.
	 *
	 * Is set by the constructor by default, can be changed in runtime.
	 *
	 * @param root - Map node to be used as root.
	 */
	public setRoot(root: (MapNode | number)): void
	{
		if (typeof root === 'number') 
		{
			if (!MapView.mapModes.has(root)) 
			{
				throw new Error('Map mode ' + root + ' does is not registered.');
			}

			const rootConstructor = MapView.mapModes.get(root);

			// @ts-ignore
			root = new rootConstructor(null, this);
		}

		// Remove old root
		if (this.root !== null) 
		{
			this.remove(this.root);
			this.root = null;
		}

		// @ts-ignore
		this.root = root;

		// Initialize root node
		if (this.root !== null) 
		{
			// @ts-ignore
			this.geometry = this.root.constructor.baseGeometry;
			// @ts-ignore
			this.scale.copy(this.root.constructor.baseScale);

			this.root.mapView = this;
			this.add(this.root);
			this.root.initialize();
		}
	}

	/**
	 * Pre-subdivide map tree to create nodes of levels not available in the provider.
	 * 
	 * Checks for the minimum zoom level in the providers attached to the map view.
	 */
	public preSubdivide(): void 
	{
		function subdivide(node: MapNode, depth: number): void 
		{
			if (depth <= 0) 
			{
				return;
			}

			node.subdivide();

			for (let i = 0; i < node.children.length; i++) 
			{
				if (node.children[i] instanceof MapNode) 
				{
					const child = node.children[i] as MapNode;
					subdivide(child, depth - 1);
				}
			}
		}

		const minZoom = Math.max(this.provider.minZoom, this.heightProvider?.minZoom ?? -Infinity);
		if (minZoom > 0) 
		{
			subdivide(this.root, minZoom);
		}
	}

	/**
	 * Change the map provider of this map view.
	 *
	 * Will discard all the tiles already loaded using the old provider.
	 */
	public setProvider(provider: MapProvider): void
	{
		if (provider !== this.provider) 
		{
			this.provider = provider;
			this.clear();
		}
	}

	/**
	 * Change the map height provider of this map view.
	 *
	 * Will discard all the tiles already loaded using the old provider.
	 */
	public setHeightProvider(heightProvider: MapProvider): void
	{
		if (heightProvider !== this.heightProvider) 
		{
			this.heightProvider = heightProvider;
			this.clear();
		}
	}

	/**
	 * Clears all tiles from memory and reloads data. Used when changing the provider.
	 *
	 * Should be called manually if any changed to the provider are made without setting the provider.
	 */
	public clear(): any
	{
		this.traverse(function(children: Object3D): void
		{
			// @ts-ignore
			if (children.childrenCache) 
			{
				// @ts-ignore
				children.childrenCache = null;
			}

			// @ts-ignore
			if (children.initialize) 
			{
				// @ts-ignore
				children.initialize();
			}
		});

		return this;
	}

	/**
	 * Get the minimum zoom level available in the providers attached to the map view.
	 * 
	 * @returns Minimum zoom level available.
	 */
	public minZoom(): number 
	{
		return Math.max(this.provider.minZoom, this.heightProvider?.minZoom ?? -Infinity);
	}

	/**
	 * Get the maximum zoom level available in the providers attached to the map view.
	 * 
	 * @returns Maximum zoom level available.
	 */
	public maxZoom(): number 
	{
		return Math.min(this.provider.maxZoom, this.heightProvider?.maxZoom ?? Infinity);
	}

	/**
	 * Get map meta data from server if supported.
	 */
	public getMetaData(): void
	{
		this.provider.getMetaData();
	}

	public raycast(raycaster: Raycaster, intersects: any[]): boolean
	{
		return false;
	}
}
