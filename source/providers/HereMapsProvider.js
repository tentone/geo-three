import {MapProvider} from "./MapProvider.js";

/**
 * Here maps tile server.
 *
 * API Reference
 *  - https://developer.here.com/documentation/map-tile/topics/example-satellite-map.html
 *
 * @class HereMapsProvider
 * @param {String} appId HERE maps app id.
 * @param {String} appCode HERE maps app code.
 * @param {String} style Map style.
 * @param {Number} scheme Map scheme.
 * @param {String} format Image format.
 * @param {Number} size Tile size.
 */
export class HereMapsProvider extends MapProvider
{
	constructor(appId, appCode, style, scheme, format, size)
	{
		super();

		/**
		 * Service application access token.
		 * 
		 * @attribute appId
		 * @type {String}
		 */
		this.appId = appId !== undefined ? appId : "";

		/**
		 * Service application code token.
		 * 
		 * @attribute appCode
		 * @type {String}
		 */
		this.appCode = appCode !== undefined ? appCode : "";

		/**
		 * The type of maps to be used.
		 *  - aerial
		 *  - base
		 *  - pano
		 *  - traffic
		 * 
		 * For each type HERE maps has 4 servers:
		 *  - Aerial Tiles https://{1-4}.aerial.maps.api.here.com
		 *  - Base Map Tiles https://{1-4}.base.maps.api.here.com
		 *  - Pano Tiles https://{1-4}.pano.maps.api.here.com
		 *  - Traffic Tiles https://{1-4}.traffic.maps.api.here.com
		 *
		 * @attribute style
		 * @type {String}
		 */
		this.style = style !== undefined ? style : "base";
		
		/**
		 * Specifies the view scheme. A complete list of the supported schemes may be obtained by using the Info resouce.
		 *  - normal.day
		 *  - normal.night
		 *  - terrain.day
		 *  - satellite.day
		 *
		 * Check the scheme list at https://developer.here.com/documentation/map-tile/topics/resource-info.html
		 *
		 * Be aware that invalid combinations of schemes and tiles are rejected. For all satellite, hybrid and terrain schemes, you need to use the Aerial Tiles base URL instead of the normal one.
		 * 
		 * @attribute scheme
		 * @type {String}
		 */
		this.scheme = scheme !== undefined ? scheme : "normal.day";

		/**
		 * Map image tile format, the formats available are:
		 *  - png True color PNG
		 *  - png8 8 bit indexed PNG
		 *  - jpg JPG at 90% quality
		 *
		 * @attribute format
		 * @type {String}
		 */
		this.format = format !== undefined ? format : "png";

		/**
		 * Returned tile map image size.
		 *
		 * The following sizes are supported:
		 *  - 256
		 *  - 512
		 *  - 128 (deprecated, although usage is still accepted)
		 *
		 * @attribute size
		 * @type {Number}
		 */
		this.size = size !== undefined ? size : 512;

		/**
		 * Specifies the map version, either newest or with a hash value.
		 *
		 * @attribute version
		 * @type {String}
		 */
		this.version = "newest";

		/**
		 * Server to be used next.
		 *
		 * There are 4 server available in here maps.
		 *
		 * On each request this number is updated.
		 *
		 * @attribute server
		 * @type {Number}
		 */
		this.server = 1;
 	}

	/**
	 * Update the server counter.
	 *
	 * There are 4 server (1 to 4).
	 *
	 * @method nextServer
	 */
	nextServer()
	{
		this.server = (this.server % 4 === 0 ? 1 : this.server + 1);
	}

	getMetaData() {}

	fetchTile(zoom, x, y)
	{
		this.nextServer();

		return new Promise((resolve, reject) =>
		{
			var image = document.createElement("img");
			image.onload = function(){resolve(image);};
			image.onerror = function(){reject();};
			image.crossOrigin = "Anonymous";
			image.src = "https://" + this.server + "." + this.style + ".maps.api.here.com/maptile/2.1/maptile/" + this.version + "/" + this.scheme + "/" + zoom + "/" + x + "/" + y + "/" + this.size + "/" + this.format + "?app_id=" + this.appId + "&app_code=" + this.appCode;
		});
	}
}

HereMapsProvider.PATH = "/maptile/2.1/";