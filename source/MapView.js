import {Mesh, MeshBasicMaterial, Vector2, Vector3, Raycaster} from "three";
import {MapSphereNodeGeometry} from "./geometries/MapSphereNodeGeometry.js";
import {OpenStreetMapsProvider} from "./providers/OpenStreetMapsProvider.js";
import {MapNode} from "./nodes/MapNode.js";
import {MapHeightNode} from "./nodes/MapHeightNode.js";
import {MapPlaneNode} from "./nodes/MapPlaneNode.js";
import {MapSphereNode} from "./nodes/MapSphereNode.js";
import {UnitsUtils} from "./utils/UnitsUtils.js";

/**
 * Map viewer is used to read and display map tiles from a server.
 * 
 * It was designed to work with a OpenMapTiles but can also be used with another map tiles.
 *
 * The map is drawn in plane map nodes using a quad tree that is subdivided as necessary to guaratee good map quality.
 *
 * @class MapView
 * @extends {Mesh}
 * @param {String} mode Map view node modes can be SPHERICAL, HEIGHT or PLANAR. PLANAR is used by default.
 * @param {Number} provider Map color tile provider by default a OSM maps provider is used if none specified.
 * @param {Number} heightProvider Map height tile provider, by default no height provider is used.
 */
export class MapView extends Mesh
{
	constructor(mode, provider, heightProvider)
	{
		mode = mode !== undefined ? mode : MapView.PLANAR;

		var geometry;

		if(mode === MapView.SPHERICAL)
		{
			geometry = new MapSphereNodeGeometry(UnitsUtils.EARTH_RADIUS, 64, 64, 0, 2 * Math.PI, 0, Math.PI);
		}
		else if(mode === MapView.PLANAR || mode === MapView.HEIGHT)
		{
			geometry = MapPlaneNode.GEOMETRY;
		}

		super(geometry, new MeshBasicMaterial({transparent:true, opacity:0.0}));
		
		/**
		 * Define the type of map view in use.
		 *
		 * This value can only be set on creation
		 *
		 * @attribute mode
		 * @type {Number}
		 */
		this.mode = mode;

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
		 * Number of rays used to test nodes and subdivide the map.
		 *
		 * N rays are cast each frame dependeing on this value to check distance to the visible map nodes. A single ray should be enough for must scenarios.
		 *
		 * @attribute subdivisionRays
		 * @type {Boolean}
		 */
		this.subdivisionRays = 1;

		/**
		 * Threshold to subdivide the map tiles.
		 * 
		 * Lower value will subdivide earlier (less zoom required to subdivide).
		 * 
		 * @attribute thresholdUp
		 * @type {Number}
		 */
		this.thresholdUp = 0.8;

		/**
		 * Threshold to simplify the map tiles.
		 * 
		 * Higher value will simplify earlier.
		 *
		 * @attribute thresholdDown
		 * @type {Number}
		 */
		this.thresholdDown = 0.2;
		
		/**
		 * Root map node.
		 *
		 * @attribute root
		 * @type {MapPlaneNode}
		 */
		this.root = null;

		if(this.mode === MapView.PLANAR)
		{
			this.scale.set(UnitsUtils.EARTH_PERIMETER, 1, UnitsUtils.EARTH_PERIMETER);
			this.root = new MapPlaneNode(null, this, MapNode.ROOT, 0, 0, 0);
		}
		else if(this.mode === MapView.HEIGHT)
		{
			this.scale.set(UnitsUtils.EARTH_PERIMETER, MapHeightNode.USE_DISPLACEMENT ? MapHeightNode.MAX_HEIGHT : 1, UnitsUtils.EARTH_PERIMETER);
			this.root = new MapHeightNode(null, this, MapNode.ROOT, 0, 0, 0);
			this.thresholdUp = 0.5;
			this.thresholdDown = 0.1;
		}
		else if(this.mode === MapView.SPHERICAL)
		{
			this.root = new MapSphereNode(null, this, MapNode.ROOT, 0, 0, 0);
			this.thresholdUp = 7e7;
			this.thresholdDown = 2e8;
		}
		this.add(this.root);

		this._raycaster = new Raycaster();
		this._mouse = new Vector2();
		this._vector = new Vector3();
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
		if(provider !== this.provider)
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
		if(heightProvider !== this.heightProvider)
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
			if(children.childrenCache !== undefined && children.childrenCache !== null)
			{
				children.childrenCache = null;
			}

			if(children.loadTexture !== undefined)
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
		const intersects = [];

		for(let t = 0; t < this.subdivisionRays; t++)
		{
			//Raycast from random point
			this._mouse.set(Math.random() * 2 - 1, Math.random() * 2 - 1);
			
			//Check intersection
			this._raycaster.setFromCamera(this._mouse, camera);
			this._raycaster.intersectObjects(this.children, true, intersects);
		}

		if(this.mode === MapView.PLANAR || this.mode === MapView.HEIGHT)
		{
			for(var i = 0; i < intersects.length; i++)
			{
				var node = intersects[i].object;
				const matrix = node.matrixWorld.elements;
				const scaleX = this._vector.set(matrix[0], matrix[1], matrix[2]).length();
				const value = scaleX / intersects[i].distance;

				if(value > this.thresholdUp)
				{
					node.subdivide();
					return;
				}
				else if(value < this.thresholdDown)
				{
					if(node.parentNode !== null)
					{
						node.parentNode.simplify();
						return;
					}
				}
			}
		}
		else if(this.mode === MapView.SPHERICAL)
		{
			for(var i = 0; i < intersects.length; i++)
			{
				var node = intersects[i].object;
				const distance = intersects[i].distance * 2 ** node.level;

				if(distance < this.thresholdUp)
				{
					node.subdivide();
					return;
				}
				else if(distance > this.thresholdDown)
				{
					if(node.parentNode !== null)
					{
						node.parentNode.simplify();
						return;
					}
				}
			}
		}
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
	 * @param {Number} zoom Zoom level.
	 * @param {Number} x Tile x.
	 * @param {Number} y Tile y.
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
 * @type {Number}
 */
MapView.PLANAR = 200;

/**
 * Spherical map projection.
 *
 * @static
 * @attribute SPHERICAL
 * @type {Number}
 */
MapView.SPHERICAL = 201;

/**
 * Planar map projection with height deformation.
 *
 * @static
 * @attribute HEIGHT
 * @type {Number}
 */
MapView.HEIGHT = 202;
