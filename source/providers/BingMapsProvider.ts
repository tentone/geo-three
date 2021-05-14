import {MapProvider} from './MapProvider';
import {XHRUtils} from '../utils/XHRUtils';
import {CancelablePromise} from '../utils/CancelablePromise';

/**
 * Bing maps tile provider.
 *
 * API Reference
 *  - https://msdn.microsoft.com/en-us/library/bb259689.aspx (Bing Maps Tile System)
 *  - https://msdn.microsoft.com/en-us/library/mt823633.aspx (Directly accessing the Bing Maps tiles)
 *  - https://www.bingmapsportal.com/
 */
export class BingMapsProvider extends MapProvider 
{
	/**
	 * Maximum zoom level allows by the provider.
	 */
	public maxZoom: number = 19;

	/**
	 * Server API access token.
	 */
	public apiKey: string;

	/**
	 * The type of the map used.
	 */
	public type: string;

	/**
	 * Map image tile format, the formats available are:
	 *  - gif: Use GIF image format.
	 *  - jpeg: Use JPEG image format. JPEG format is the default for Road, Aerial and AerialWithLabels imagery.
	 *  - png: Use PNG image format. PNG is the default format for OrdnanceSurvey imagery.
	 */
	public format: string = 'jpeg';

	/**
	 * Size of the map tiles.
	 */
	public mapSize: number = 512;

	/**
	 * Tile server subdomain.
	 */
	public subdomain: string = 't1';

	/**
	 * @param apiKey - Bing API key.
	 * @param type - Type provider.
	 */
	public constructor(apiKey: string = '', type: string = BingMapsProvider.AERIAL) 
	{
		super();

		this.apiKey = apiKey;
		this.type = type;
	}

	/**
	 * Display an aerial view of the map.
	 */
	public static AERIAL: string = 'a';

	/**
	 * Display a road view of the map.
	 */
	public static ROAD: string = 'r';

	/**
	 * Display an aerial view of the map with labels.
	 */
	public static AERIAL_LABELS: string = 'h';

	/**
	 * Use this value to display a bird's eye (oblique) view of the map.
	 */
	public static OBLIQUE: string = 'o';

	/**
	 * Display a bird's eye (oblique) with labels view of the map.
	 */
	public static OBLIQUE_LABELS: string = 'b';

	/**
	 * Get the base URL for the map configuration requested.
	 *
	 * Uses the follwing format
	 * http://ecn.{subdomain}.tiles.virtualearth.net/tiles/r{quadkey}.jpeg?g=129&mkt={culture}&shading=hill&stl=H
	 */
	public getMetaData(): void 
	{
		const address = 'http://dev.virtualearth.net/REST/V1/Imagery/Metadata/RoadOnDemand?output=json&include=ImageryProviders&key=' + this.apiKey;

		XHRUtils.get(address, function(data) 
		{
			const meta = JSON.parse(data);

			// TODO <FILL METADATA>
		});
	}

	/**
	 * Convert x, y, zoom quadtree to a bing maps specific quadkey.
	 *
	 * Adapted from original C# code at https://msdn.microsoft.com/en-us/library/bb259689.aspx.
	 */
	public static quadKey(zoom: number, x: number, y: number): string
	{
		let quad = '';

		for (let i = zoom; i > 0; i--) 
		{
			const mask = 1 << i - 1;
			let cell = 0;

			if ((x & mask) !== 0) 
			{
				cell++;
			}

			if ((y & mask) !== 0) 
			{
				cell += 2;
			}

			quad += cell;
		}

		return quad;
	}

	public fetchTile(zoom: number, x: number, y: number): CancelablePromise<any>
	{
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
			image.src = 'http://ecn.' + this.subdomain + '.tiles.virtualearth.net/tiles/' + this.type + BingMapsProvider.quadKey(zoom, x, y) + '.jpeg?g=1173';
		});
	}
}
