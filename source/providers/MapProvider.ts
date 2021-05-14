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
	/**
	 * Name of the map provider
	 *
	 * @type {string}
	 */
	name: string = '';

	/**
	 * Minimum tile level.
	 *
	 * @type {number}
	 */
	minZoom: number = 0;

	/**
	 * Maximum tile level.
	 *
	 * @type {number}
	 */
	maxZoom: number = 20;

	/**
	 * Map bounds.
	 *
	 * @type {Array}
	 */
	bounds: number[] = [];

	/**
	 * Map center point.
	 *
	 * @type {Array}
	 */
	center: number[] = [];

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
	async fetchTile(zoom: number, x: number, y: number): Promise<HTMLImageElement | HTMLCanvasElement | OffscreenCanvas | ImageBitmap> 
	{
		return null;
	}

	/**
	 * Get map meta data from server if supported.
	 *
	 * Usually map server have API method to retrieve TileJSON metadata.
	 *
	 * @method getMetaData
	 */
	getMetaData() {}
}
