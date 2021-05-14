import {Mesh, MeshBasicMaterial} from 'three';
import {MapSphereNodeGeometry} from './geometries/MapSphereNodeGeometry';
import {OpenStreetMapsProvider} from './providers/OpenStreetMapsProvider';
import {MapNode} from './nodes/MapNode';
import {MapHeightNode} from './nodes/MapHeightNode';
import {MapPlaneNode} from './nodes/MapPlaneNode';
import {MapSphereNode} from './nodes/MapSphereNode';
import {UnitsUtils} from './utils/UnitsUtils';
import {MapHeightNodeShader} from './nodes/MapHeightNodeShader';
import {LODRaycast} from './lod/LODRaycast';
import {MapProvider} from './providers/MapProvider';

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
	 *
	 * @type {number}
	 */
	static PLANAR = 200;

	/**
	 * Spherical map projection.
	 *
	 * @type {number}
	 */
	static SPHERICAL = 201;

	/**
	 * Planar map projection with height deformation.
	 *
	 * @type {number}
	 */
	static HEIGHT = 202;

	/**
	 * Planar map projection with height deformation using the GPU for height generation.
	 *
	 * @type {number}
	 */
	static HEIGHT_SHADER = 203;

	/**
	 * Map of the map node types available.
	 *
	 * @type {Map}
	 */
	static mapModes = new Map([
		[MapView.PLANAR, MapPlaneNode],
		[MapView.SPHERICAL, MapSphereNode],
		[MapView.HEIGHT, MapHeightNode],
		[MapView.HEIGHT_SHADER, MapHeightNodeShader]
	] as any);

	/**
	 * LOD control object used to defined how tiles are loaded in and out of memory.
	 *
	 * @type {LODControl}
	 */
	lod: LODRaycast;

	/**
	 * Map tile color layer provider.
	 *
	 * @type {MapProvider}
	 */
	provider: MapProvider;

	/**
	 * Map height (terrain elevation) layer provider.
	 *
	 * @type {MapProvider}
	 */
	heightProvider: MapProvider;

	/**
	 * Root map node.
	 *
	 * @type {MapNode}
	 */
	root: MapNode;

	/**
	 * Constructor for the map view objects.
	 *
	 * @param {number | MapNode} root Map view node modes can be SPHERICAL, HEIGHT or PLANAR. PLANAR is used by default. Can also be a custom MapNode instance.
	 * @param {number} provider Map color tile provider by default a OSM maps provider is used if none specified.
	 * @param {number} heightProvider Map height tile provider, by default no height provider is used.
	 */
	public constructor(root, provider, heightProvider) 
	{
		super(undefined, new MeshBasicMaterial({transparent: true, opacity: 0.0}));

		this.lod = new LODRaycast();

		this.provider = provider !== undefined ? provider : new OpenStreetMapsProvider();

		this.heightProvider = heightProvider !== undefined ? heightProvider : null;

		/**
		 * Define the type of map node in use, defined how the map is presented.
		 *
		 * Should only be set on creationg.
		 *
		 * @attribute root
		 * @type {MapNode}
		 */
		this.root = root !== undefined ? root : MapView.PLANAR;
		this.setRoot(root);
	}

	/**
	 * Set the root of the map view.
	 *
	 * Is set by the constructor by default, can be changed in runtime.
	 *
	 * @param {MapNode} root Map node to be used as root.
	 */
	setRoot(root) 
	{
		if (typeof root === 'number') 
		{
			if (!MapView.mapModes.has(root)) 
			{
				throw new Error('Map mode ' + root + ' does is not registered.');
			}

			const rootConstructor = MapView.mapModes.get(root) as typeof MapNode;
			root = new rootpublic constructor(null, null, null, this, MapNode.ROOT, 0, 0, 0);
		}

		if (this.root !== null) 
		{
			this.remove(this.root);
			this.root = null;
		}

		this.root = root;

		this.geometry = this.root.constructor as typeof MapNode.BASE_GEOMETRY;
		this.scale.copy(this.root.constructor as typeof MapNode.BASE_SCALE);

		this.root.mapView = this;
		this.add(this.root);
	}

	/**
	 * Change the map provider of this map view.
	 *
	 * Will discard all the tiles already loaded using the old provider.
	 *
	 */
	setProvider(provider) 
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
	 *
	 */
	setHeightProvider(heightProvider) 
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
	 *
	 */
	clear() 
	{
		this.traverse(function(children: MapNode) 
		{
			if (children.childrenCache !== undefined && children.childrenCache !== null) 
			{
				children.childrenCache = null;
			}

			if (children.loadTexture !== undefined) 
			{
				children.loadTexture();
			}
		});
		return this;
	}

	/**
	 * Ajust node configuration depending on the camera distance.
	 *
	 * Called everytime before render.
	 *
	 */
	onBeforeRender = (renderer, scene, camera, geometry, material, group) => 
	{
		this.lod.updateLOD(this, camera, renderer, scene);
	};

	/**
	 * Get map meta data from server if supported.
	 *
	 */
	getMetaData() 
	{
		this.provider.getMetaData();
	}

	raycast(raycaster, intersects) 
	{
		return false;
	}
}
