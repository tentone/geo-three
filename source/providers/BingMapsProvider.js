import {MapProvider} from "./MapProvider.js";
import {XHRUtils} from "../utils/XHRUtils.js";

/**
 * Bing maps tile provider.
 *
 * API Reference
 *  - https://msdn.microsoft.com/en-us/library/bb259689.aspx (Bing Maps Tile System)
 *  - https://msdn.microsoft.com/en-us/library/mt823633.aspx (Directly accessing the Bing Maps tiles)
 *  - https://www.bingmapsportal.com/
 *
 * @class BingMapsProvider
 * @param {String} apiKey Bing API key.
 */
export class BingMapsProvider extends MapProvider
{
	constructor(apiKey, type)
	{
		super();

		this.maxZoom = 19;
		
		/**
		 * Server API access token.
		 * 
		 * @attribute apiKey
		 * @type {String}
		 */
		this.apiKey = apiKey !== undefined ? apiKey : "";

		/** 
		 * The type of the map used.
		 *
		 * @attribute type
		 * @type {String}
		 */
		this.type = type !== undefined ? type : BingMapsProvider.AERIAL;

		/**
		 * Map image tile format, the formats available are:
		 *  - gif: Use GIF image format.
		 *  - jpeg: Use JPEG image format. JPEG format is the default for Road, Aerial and AerialWithLabels imagery.
		 *  - png: Use PNG image format. PNG is the default format for OrdnanceSurvey imagery.
		 *
		 * @attribute format
		 * @type {String}
		 */
		this.format = "jpeg";

		/**
		 * Size of the map tiles.
		 *
		 * @attribute mapSize
		 * @type {Number}
		 */
		this.mapSize = 512;

		/**
		 * Tile server subdomain.
		 *
		 * @attribute subdomain
		 * @type {String}
		 */
		this.subdomain = "t1";
	}

	/** 
	 * Get the base URL for the map configuration requested.
	 *
	 * Uses the follwing format 
	 * http://ecn.{subdomain}.tiles.virtualearth.net/tiles/r{quadkey}.jpeg?g=129&mkt={culture}&shading=hill&stl=H
	 *
	 * @method getMetaData
	 */
	getMetaData()
	{
		const self = this;
		const address = "http://dev.virtualearth.net/REST/V1/Imagery/Metadata/RoadOnDemand?output=json&include=ImageryProviders&key=" + this.apiKey;
		
		XHRUtils.get(address, function(data)
		{
			const meta = JSON.parse(data);

			//TODO <FILL METADATA>
		});
	}

	/**
	 * Convert x, y, zoom quadtree to a bing maps specific quadkey.
	 *
	 * Adapted from original C# code at https://msdn.microsoft.com/en-us/library/bb259689.aspx.
	 *
	 * @method quadKey
	 * @param {Number} x
	 */
	static quadKey(zoom, x, y)
	{
		let quad = "";

		for(let i = zoom; i > 0; i--)
		{
			const mask = 1 << (i - 1);
			let cell = 0;
			
			if((x & mask) != 0)
			{
				cell++;	
			}
			
			if((y & mask) != 0)
			{
				cell += 2;
			}

			quad += cell; 
		}

		return quad; 
	}

	fetchTile(zoom, x, y)
	{
		return new Promise((resolve, reject) =>
		{
			var image = document.createElement("img");
			image.onload = function(){resolve(image);};
			image.onerror = function(){reject();};
			image.crossOrigin = "Anonymous";
			image.src = "http://ecn." + this.subdomain + ".tiles.virtualearth.net/tiles/" + this.type + BingMapsProvider.quadKey(zoom, x, y) + ".jpeg?g=1173";
		});
	}
}

/**
 * Display an aerial view of the map.
 *
 * @static
 * @attribute AERIAL
 * @type {String}
 */
BingMapsProvider.AERIAL = "a";

/**
 * Display a road view of the map.
 *
 * @static
 * @attribute AERIAL
 * @type {String}
 */
BingMapsProvider.ROAD = "r";

/**
 * Display an aerial view of the map with labels.
 *
 * @static
 * @attribute AERIAL_LABELS
 * @type {String}
 */
BingMapsProvider.AERIAL_LABELS = "h";

/**
 * Use this value to display a bird's eye (oblique) view of the map.
 *
 * @static
 * @attribute AERIAL
 * @type {String}
 */
BingMapsProvider.OBLIQUE = "o";

/**
 * Display a bird's eye (oblique) with labels view of the map.
 *
 * @static
 * @attribute AERIAL
 * @type {String}
 */
BingMapsProvider.OBLIQUE_LABELS = "b";