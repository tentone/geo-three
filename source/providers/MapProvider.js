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
		 * @type {String}
		 */
		this.name = "";
		
		/**
		 * Minimum tile level.
		 * 
		 * @attribute minZoom
		 * @type {Number}
		 */
		this.minZoom = 0;

		/**
		 * Maximum tile level.
		 * 
		 * @attribute maxZoom
		 * @type {Number}
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
	 * @param {Number} zoom Zoom level.
	 * @param {Number} x Tile x.
	 * @param {Number} y Tile y.
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