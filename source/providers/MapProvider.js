/**
 * A map provider is a object that handles the access to map tiles of a specific service.
 *
 * They contain the access configuration and are responsible for handling the map theme size etc.
 *
 * MapProvider should be used as a base for all the providers.
 *
 * @class MapProvider
 */
export class MapProvider
{
	constructor()
	{
		/** 
		 * Name of the map provider
		 *
		 * @attribute name
		 * @type {string}
		 */
		this.name = "";
		
		/**
		 * Minimum tile level.
		 * 
		 * @attribute minZoom
		 * @type {number}
		 */
		this.minZoom = 0;

		/**
		 * Maximum tile level.
		 * 
		 * @attribute maxZoom
		 * @type {number}
		 */
		this.maxZoom = 20;

		/**
		 * Map bounds.
		 *
		 * @attribute bounds
		 * @type {Array}
		 */
		this.bounds = [];

		/**
		 * Map center point.
		 *
		 * @attribute center
		 * @type {Array}
		 */
		this.center = [];
	}

	/**
	 * Get a tile for the x, y, zoom based on the provider configuration.
	 * 
	 * The tile should be returned as a image object, compatible with canvas context 2D drawImage() and with webgl texImage2D() method.
	 *
	 * @method fetchTile
	 * @param {number} zoom Zoom level.
	 * @param {number} x Tile x.
	 * @param {number} y Tile y.
	 * @return {Promise<HTMLImageElement | HTMLCanvasElement | OffscreenCanvas | ImageBitmap>} Promise with the image obtained for the tile ready to use.
	 */
	fetchTile(zoom, x, y) {}

	/**
	 * Get map meta data from server if supported.
	 *
	 * Usually map server have API method to retrieve TileJSON metadata.
	 * 
	 * @method getMetaData
	 */
	getMetaData() {}
}