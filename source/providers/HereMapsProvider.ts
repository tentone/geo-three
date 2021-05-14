import {MapProvider} from './MapProvider';
import {CancelablePromise} from '../utils/CancelablePromise';

/**
 * Here maps tile server.
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
	 *
	 * @type {string}
	 */
	appId: string;

	/**
	 * Service application code token.
	 *
	 * @type {string}
	 */
	appCode: string;

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
	 * @type {string}
	 */
	style: string;

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
	 * @type {string}
	 */
	scheme: string;

	/**
	 * Map image tile format, the formats available are:
	 *  - png True color PNG
	 *  - png8 8 bit indexed PNG
	 *  - jpg JPG at 90% quality
	 *
	 * @type {string}
	 */
	format: string;

	/**
	 * Returned tile map image size.
	 *
	 * The following sizes are supported:
	 *  - 256
	 *  - 512
	 *  - 128 (deprecated, although usage is still accepted)
	 *
	 * @type {number}
	 */
	size: number;

	/**
	 * Specifies the map version, either newest or with a hash value.
	 *
	 * @type {string}
	 */
	version: string;

	/**
	 * Server to be used next.
	 *
	 * There are 4 server available in here maps.
	 *
	 * On each request this number is updated.
	 *
	 * @type {number}
	 */
	server: number;

	/**
	 *
	 * @param {string} appId HERE maps app id.
	 * @param {string} appCode HERE maps app code.
	 * @param {string} style Map style.
	 * @param {number} scheme Map scheme.
	 * @param {string} format Image format.
	 * @param {number} size Tile size.
	 */
	public constructor(appId, appCode, style, scheme, format, size) 
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
	 *
	 */
	nextServer() 
	{
		this.server = this.server % 4 === 0 ? 1 : this.server + 1;
	}

	getMetaData() {}

	public fetchTile(zoom: number, x: number, y: number): CancelablePromise<any>
	{
		this.nextServer();

		return new CancelablePromise((resolve, reject) => 
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
			image.src =
				'https://' +
				this.server +
				'.' +
				this.style +
				'.maps.api.here.com/maptile/2.1/maptile/' +
				this.version +
				'/' +
				this.scheme +
				'/' +
				zoom +
				'/' +
				x +
				'/' +
				y +
				'/' +
				this.size +
				'/' +
				this.format +
				'?app_id=' +
				this.appId +
				'&app_code=' +
				this.appCode;
		});
	}
}
