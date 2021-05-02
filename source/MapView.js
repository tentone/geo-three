import {Mesh, MeshBasicMaterial} from "three";
import {OpenStreetMapsProvider} from "./providers/OpenStreetMapsProvider.js";
import {MapNode} from "./nodes/MapNode.js";
import {MapHeightNode} from "./nodes/MapHeightNode.js";
import {MapPlaneNode} from "./nodes/MapPlaneNode.js";
import {MapSphereNode} from "./nodes/MapSphereNode.js";
import {MapHeightNodeShader} from "./nodes/MapHeightNodeShader.js";
import {LODRaycast} from "./lod/LODRaycast.js";

/**
 * Map viewer is used to read and display map tiles from a server.
 * 
 * It was designed to work with a OpenMapTiles but can also be used with another map tiles.
 *
 * The map is drawn in plane map nodes using a quad tree that is subdivided as necessary to guaratee good map quality.
 *
 * @class MapView
 * @extends {Mesh}
 */
export class MapView extends Mesh
{
	/**
	 * Planar map projection.
	 *
	 * @static
	 * @attribute PLANAR
	 * @type {number}
	 */
	static PLANAR = 200;

	/**
	 * Spherical map projection.
	 *
	 * @static
	 * @attribute SPHERICAL
	 * @type {number}
	 */
	static SPHERICAL = 201;

	/**
	 * Planar map projection with height deformation.
	 *
	 * @static
	 * @attribute HEIGHT
	 * @type {number}
	 */
	static HEIGHT = 202;

	/**
	 * Planar map projection with height deformation using the GPU for height generation.
	 *
	 * @static
	 * @attribute HEIGHT_DISPLACEMENT
	 * @type {number}
	 */
	static HEIGHT_SHADER = 203;

	/**
	 * Map of the map node types available.
	 * 
	 * @static
	 * @attribute mapModes
	 * @type {Map}
	 */
	static mapModes = new Map([
		[MapView.PLANAR, MapPlaneNode],
		[MapView.SPHERICAL, MapSphereNode],
		[MapView.HEIGHT, MapHeightNode],
		[MapView.HEIGHT_SHADER, MapHeightNodeShader],
	]);

	/**
	 * Constructor for the map view objects.
	 * 
	 * @param {number | MapNode} root Map view node modes can be SPHERICAL, HEIGHT or PLANAR. PLANAR is used by default. Can also be a custom MapNode instance.
	 * @param {number} provider Map color tile provider by default a OSM maps provider is used if none specified.
	 * @param {number} heightProvider Map height tile provider, by default no height provider is used.
	 */
	constructor(root, provider, heightProvider)
	{
		root = root !== undefined ? root : MapView.PLANAR;
		
		super(undefined, new MeshBasicMaterial({transparent: true, opacity: 0.0}));
			
		/**
		 * LOD control object used to defined how tiles are loaded in and out of memory.
		 * 
		 * @attribute lod
		 * @type {LODControl}
		 */
		this.lod = new LODRaycast();

		/**
		 * Map tile color layer provider.
		 *
		 * @attribute provider
		 * @type {MapProvider}
		 */
		this.provider = provider !== undefined ? provider : new OpenStreetMapsProvider();

		/**
		 * Map height (terrain elevation) layer provider.
		 *
		 * @attribute heightProvider
		 * @type {MapProvider}
		 */
		this.heightProvider = heightProvider !== undefined ? heightProvider : null;

		/**
		 * Define the type of map node in use, defined how the map is presented.
		 *
		 * Should only be set on creationg.
		 * 
		 * @attribute root
		 * @type {MapNode}
		 */
		this.root = null;
		this.setRoot(root);
	}

	/**
	 * Set the root of the map view.
	 * 
	 * Is set by the constructor by default, can be changed in runtime.
	 * 
	 * @method setRoot
	 * @param {MapNode} root Map node to be used as root. 
	 */
	setRoot(root) {
		if (typeof root === "number")
		{
			if(!MapView.mapModes.has(root))
			{
				throw new Error("Map mode " + root + " does is not registered.");
			}

			var rootConstructor = MapView.mapModes.get(root);
			root = new rootConstructor(null, this, MapNode.ROOT, 0, 0, 0);
		}

		if (this.root !== null) {
			this.remove(this.root);
			this.root = null;
		}

		this.root = root;
		
		this.geometry = this.root.constructor.baseGeometry;
		this.scale.copy(this.root.constructor.baseScale);

		this.root.mapView = this;
		this.add(this.root);
	}

	/**
	 * Change the map provider of this map view.
	 *
	 * Will discard all the tiles already loaded using the old provider.
	 *
	 * @method setProvider
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
	 * @method setHeightProvider
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
	 * @method clear
	 */
	clear()
	{
		this.traverse(function(children)
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
	}

	/**
	 * Ajust node configuration depending on the camera distance.
	 *
	 * Called everytime before render. 
	 *
	 * @method onBeforeRender
	 */
	onBeforeRender(renderer, scene, camera, geometry, material, group)
	{
		this.lod.updateLOD(this, camera, renderer, scene);
	}

	/**
	 * Get map meta data from server if supported.
	 * 
	 * @method getMetaData
	 */
	getMetaData()
	{
		this.provider.getMetaData();
	}

	/**
	 * Fetch tile image URL using its quadtree position and zoom level.
	 * 
	 * @method fetchTile
	 * @param {number} zoom Zoom level.
	 * @param {number} x Tile x.
	 * @param {number} y Tile y.
	 */
	fetchTile(zoom, x, y)
	{
		return this.provider.fetchTile(zoom, x, y);
	}

	raycast(raycaster, intersects)
	{
		return false;
	}
}
