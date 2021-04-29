import {Mesh, MeshBasicMaterial} from "three";
import {MapSphereNodeGeometry} from "./geometries/MapSphereNodeGeometry.js";
import {OpenStreetMapsProvider} from "./providers/OpenStreetMapsProvider.js";
import {MapNode} from "./nodes/MapNode.js";
import {MapHeightNode} from "./nodes/MapHeightNode.js";
import {MapPlaneNode} from "./nodes/MapPlaneNode.js";
import {MapSphereNode} from "./nodes/MapSphereNode.js";
import {UnitsUtils} from "./utils/UnitsUtils.js";
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
 * @param {string} mode Map view node modes can be SPHERICAL, HEIGHT or PLANAR. PLANAR is used by default.
 * @param {number} provider Map color tile provider by default a OSM maps provider is used if none specified.
 * @param {number} heightProvider Map height tile provider, by default no height provider is used.
 */
export class MapView extends Mesh
{
	constructor(mode, provider, heightProvider)
	{
		mode = mode !== undefined ? mode : MapView.PLANAR;

		var geometry;

		if (mode === MapView.SPHERICAL)
		{
			geometry = new MapSphereNodeGeometry(UnitsUtils.EARTH_RADIUS, 64, 64, 0, 2 * Math.PI, 0, Math.PI);
		}
		else // if(mode === MapView.PLANAR || mode === MapView.HEIGHT)
		{
			geometry = MapPlaneNode.GEOMETRY;
		}

		super(geometry, new MeshBasicMaterial({transparent: true, opacity: 0.0}));
		
		/**
		 * Define the type of map view in use.
		 *
		 * This value can only be set on creation
		 *
		 * @attribute mode
		 * @type {number}
		 */
		this.mode = mode;

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
		 * Root map node.
		 *
		 * @attribute root
		 * @type {MapPlaneNode}
		 */
		this.root = null;

		if (this.mode === MapView.PLANAR)
		{
			this.scale.set(UnitsUtils.EARTH_PERIMETER, 1, UnitsUtils.EARTH_PERIMETER);
			this.root = new MapPlaneNode(null, this, MapNode.ROOT, 0, 0, 0);
		}
		else if (this.mode === MapView.HEIGHT)
		{
			this.scale.set(UnitsUtils.EARTH_PERIMETER, MapHeightNode.USE_DISPLACEMENT ? MapHeightNode.MAX_HEIGHT : 1, UnitsUtils.EARTH_PERIMETER);
			this.root = new MapHeightNode(null, this, MapNode.ROOT, 0, 0, 0);
		}
		else if (this.mode === MapView.HEIGHT_SHADER)
		{
			this.scale.set(UnitsUtils.EARTH_PERIMETER, MapHeightNode.USE_DISPLACEMENT ? MapHeightNode.MAX_HEIGHT : 1, UnitsUtils.EARTH_PERIMETER);
			this.root = new MapHeightNodeShader(null, this, MapNode.ROOT, 0, 0, 0);
		}
		else if (this.mode === MapView.SPHERICAL)
		{
			this.root = new MapSphereNode(null, this, MapNode.ROOT, 0, 0, 0);
		}
		if (this.root)
		{
			this.add(this.root);
		}
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

/**
 * Planar map projection.
 *
 * @static
 * @attribute PLANAR
 * @type {number}
 */
MapView.PLANAR = 200;

/**
 * Spherical map projection.
 *
 * @static
 * @attribute SPHERICAL
 * @type {number}
 */
MapView.SPHERICAL = 201;

/**
 * Planar map projection with height deformation.
 *
 * @static
 * @attribute HEIGHT
 * @type {number}
 */
MapView.HEIGHT = 202;

/**
 * Planar map projection with height deformation using the GPU for height generation.
 *
 * @static
 * @attribute HEIGHT_DISPLACEMENT
 * @type {number}
 */
MapView.HEIGHT_SHADER = 203;
