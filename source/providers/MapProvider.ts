

/**
 * A map provider is a object that handles the access to map tiles of a specific service.
 *
 * They contain the access configuration and are responsible for handling the map theme size etc.
 *
 * MapProvider should be used as a base for all the providers.
 */
export abstract class MapProvider 
{
	/**
	 * Name of the map provider
	 */
	public name: string = '';

	/**
	 * Minimum tile level.
	 */
	public minZoom: number = 0;

	/**
	 * Maximum tile level.
	 */
	public maxZoom: number = 20;

	/**
	 * Map bounds.
	 */
	public bounds: number[] = [];

	/**
	 * Map center point.
	 */
	public center: number[] = [];

	/**
	 * Get a tile for the x, y, zoom based on the provider configuration.
	 *
	 * The tile should be returned as a image object, compatible with canvas context 2D drawImage() and with webgl texImage2D() method.
	 *
	 * @param zoom - Zoom level.
	 * @param x - Tile x.
	 * @param y - Tile y.
	 * @returns Promise with the image obtained for the tile ready to use.
	 */
	public fetchTile(zoom: number, x: number, y: number): Promise<any> 
	{
		return null;
	}

	/**
	 * Get a tile as a raw ArrayBuffer for the x, y, zoom based on the provider configuration.
	 *
	 * Returns null by default. Providers that support direct binary fetching (e.g. MapBoxProvider)
	 * override this method. When available this should be preferred over fetchTile() for height
	 * data because it allows PNG decoding without canvas, avoiding fingerprinting noise introduced
	 * by Firefox Enhanced Tracking Protection.
	 *
	 * @param zoom - Zoom level.
	 * @param x - Tile x.
	 * @param y - Tile y.
	 * @returns Promise with the raw tile data as ArrayBuffer, or null if not supported.
	 */
	public fetchTileBuffer(zoom: number, x: number, y: number): Promise<ArrayBuffer | null>
	{
		return Promise.resolve(null);
	}

	/**
	 * Get map meta data from server if supported.
	 *
	 * Usually map server have API method to retrieve TileJSON metadata.
	 */
	public async getMetaData(): Promise<void> {}
}
