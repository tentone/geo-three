import {MapProvider} from "./MapProvider.js";

/**
 * Map tiler provider API.
 *
 * The map tiler server is based on open map tiles.
 *
 * API Reference
 *  - https://www.maptiler.com/
 *
 * @class MapTilerProvider
 * @param {string} apiKey
 */
export class MapTilerProvider extends MapProvider
{
	constructor(apiKey, category, style, format)
	{
		super();

		/**
		 * Server API access token.
		 * 
		 * @attribute apiToken
		 * @type {string}
		 */
		this.apiKey = apiKey !== undefined ? apiKey : "";

		/**
		 * Map image tile file format (e.g png, jpg)
		 *
		 * Format can be for image or for geometry fetched from the system (e.g quantized-mesh-1.0)
		 * 
		 * @attribute format
		 * @type {string}
		 */
		this.format = format !== undefined ? format : "png";

		/**
		 * Tile category (e.g. maps, tiles), 
		 *
		 * @attribute category
		 * @type {string}
		 */
		this.category = category !== undefined ? category : "maps";

		/**
		 * Map tile type, some of the vectorial styles available.
		 * 
		 * Can be used for rasterized vectorial maps (e.g, basic, bright, darkmatter, hybrid, positron, streets, topo, voyager).
		 *
		 * Cam be used for data tiles (e.g hillshades, terrain-rgb, satellite).
		 *
		 * @attribute style
		 * @type {string}
		 */
		this.style = style !== undefined ? style : "satellite";

		this.resolution = 512;
	}

	fetchTile(zoom, x, y)
	{
		return new Promise((resolve, reject) =>
		{
			var image = document.createElement("img");
			image.onload = function() {resolve(image);};
			image.onerror = function() {reject();};
			image.crossOrigin = "Anonymous";
			image.src = "https://api.maptiler.com/" + this.category + "/" + this.style + "/" + zoom + "/" + x + "/" + y + "." + this.format + "?key=" + this.apiKey;
		});
	}
}
