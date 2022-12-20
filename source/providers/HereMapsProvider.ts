import {MapProvider} from './MapProvider';


/**
 * Here maps tile server provider.
 *
 * API Reference
 *  - https://developer.here.com/documentation/map-tile/topics/example-satellite-map.html
 */
export class HereMapsProvider extends MapProvider 
{
	/**
	 * Path to map tile API.
	 *
	 * Version of the api is fixed 2.1.
	 */
	public static PATH = '/maptile/2.1/';

	/**
	 * Service application access token.
	 */
	public appId: string;

	/**
	 * Service application code token.
	 */
	public appCode: string;

	/**
	 * The type of maps to be used.
	 *  - aerial
	 *  - base
	 *  - pano
	 *  - traffic
	 *
	 * For each type HERE maps has 4 servers:
	 *  - Aerial Tiles https://\{1-4\}.aerial.maps.api.here.com
	 *  - Base Map Tiles https://\{1-4\}.base.maps.api.here.com
	 *  - Pano Tiles https://\{1-4\}.pano.maps.api.here.com
	 *  - Traffic Tiles https://\{1-4\}.traffic.maps.api.here.com
	 */
	public style: string;

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
	 */
	public scheme: string;

	/**
	 * Map image tile format, the formats available are:
	 *  - png True color PNG
	 *  - png8 8 bit indexed PNG
	 *  - jpg JPG at 90% quality
	 */
	public format: string;

	/**
	 * Returned tile map image size.
	 *
	 * The following sizes are supported:
	 *  - 256
	 *  - 512
	 *  - 128 (deprecated, although usage is still accepted)
	 */
	public size: number;

	/**
	 * Specifies the map version, either newest or with a hash value.
	 */
	public version: string;

	/**
	 * Server to be used next.
	 *
	 * There are 4 server available in here maps.
	 *
	 * On each request this number is updated.
	 */
	public server: number;

	/**
	 * Here maps provider constructor.
	 * 
	 * @param appId - HERE maps app id.
	 * @param appCode - HERE maps app code.
	 * @param style - Map style.
	 * @param scheme - Map scheme.
	 * @param format - Image format.
	 * @param size - Tile size.
	 */
	public constructor(appId: string, appCode: string, style: string, scheme: string, format: string, size: number) 
	{
		super();

		this.appId = appId !== undefined ? appId : '';
		this.appCode = appCode !== undefined ? appCode : '';
		this.style = style !== undefined ? style : 'base';
		this.scheme = scheme !== undefined ? scheme : 'normal.day';
		this.format = format !== undefined ? format : 'png';
		this.size = size !== undefined ? size : 512;
		this.version = 'newest';
		this.server = 1;
	}

	/**
	 * Update the server counter.
	 *
	 * There are 4 server (1 to 4).
	 */
	public nextServer(): void
	{
		this.server = this.server % 4 === 0 ? 1 : this.server + 1;
	}

	public async getMetaData(): Promise<void> {}

	public fetchTile(zoom: number, x: number, y: number): Promise<any>
	{
		this.nextServer();

		return new Promise((resolve, reject) => 
		{
			const image = document.createElement('img');
			image.onload = function() 
			{
				resolve(image);
			};
			image.onerror = function() 
			{
				reject();
			};
			image.crossOrigin = 'Anonymous';

			image.src = 'https://' + this.server + '.' + this.style + '.maps.api.here.com/maptile/2.1/maptile/' +
				this.version + '/' + this.scheme + '/' + zoom + '/' + x + '/' + y + '/' +
				this.size + '/' + this.format + '?app_id=' + this.appId + '&app_code=' + this.appCode;
		});
	}
}
