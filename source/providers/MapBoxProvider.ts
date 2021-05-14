import {MapProvider} from './MapProvider';
import {XHRUtils} from '../utils/XHRUtils';
import {CancelablePromise} from '../utils/CancelablePromise';

/**
 * Map box service tile provider. Map tiles can be fetched from style or from a map id.
 *
 * API Reference
 *  - https://www.mapbox.com/
 */
export class MapBoxProvider extends MapProvider 
{
	public static ADDRESS: string = 'https://api.mapbox.com/';

	/**
	 * Access the map data using a map style.
	 */
	public static STYLE: number = 100;

	/**
	 * Access the map data using a map id.
	 */
	public static MAP_ID: number = 101;

	/**
	 * Server API access token.
	 */
	public apiToken: string;

	/**
	 * Map image tile format, the formats available are:
	 *  - png True color PNG
	 *  - png32 32 color indexed PNG
	 *  - png64 64 color indexed PNG
	 *  - png128 128 color indexed PNG
	 *  - png256 256 color indexed PNG
	 *  - jpg70 70% quality JPG
	 *  - jpg80 80% quality JPG
	 *  - jpg90 90% quality JPG
	 *  - pngraw Raw png (no interpolation)
	 */
	public format: string;

	/**
	 * Flag to indicate if should use high resolution tiles
	 */
	public useHDPI: boolean;

	/**
	 * Map tile access mode
	 *  - MapBoxProvider.STYLE
	 *  - MapBoxProvider.MAP_ID
	 */
	public mode: number;

	/**
	 * Map identifier composed of {username}.{style}
	 *
	 * Some examples of the public mapbox identifiers:
	 *  - mapbox.mapbox-streets-v7
	 *  - mapbox.satellite
	 *  - mapbox.mapbox-terrain-v2
	 *  - mapbox.mapbox-traffic-v1
	 *  - mapbox.terrain-rgb
	 */
	public mapId: string;

	/**
	 * Map style to be used composed of {username}/{style_id}
	 *
	 * Some example of the syles available:
	 *  - mapbox/streets-v10
	 *  - mapbox/outdoors-v10
	 *  - mapbox/light-v9
	 *  - mapbox/dark-v9
	 *  - mapbox/satellite-v9
	 *  - mapbox/satellite-streets-v10
	 *  - mapbox/navigation-preview-day-v4
	 *  - mapbox/navigation-preview-night-v4
	 *  - mapbox/navigation-guidance-day-v4
	 *  - mapbox/navigation-guidance-night-v4
	 */
	public style: string;

	/**
	 * Mapbox api version
	 *  - mapbox/navigation-guidance-night-v4
	 */
	public version: string;

	/**
	 * @param apiToken - Map box api token.
	 * @param id - Map style or map ID if the mode is set to MAP_ID.
	 * @param mode - Map tile access mode.
	 * @param format - Image format.
	 * @param useHDPI - If true uses high DPI mode.
	 */
	public constructor(apiToken: string = '', id: string = '', mode: number = MapBoxProvider.STYLE, format: string = 'png', useHDPI: boolean = false, version: string = 'v4') 
	{
		super();

		this.apiToken = apiToken;
		this.format = format;
		this.useHDPI = useHDPI;
		this.mode = mode;
		this.mapId = id;
		this.style = id;
		this.version = version;
	}

	public getMetaData(): void
	{
		const self = this;
		const address = MapBoxProvider.ADDRESS + this.version + '/' + this.mapId + '.json?access_token=' + this.apiToken;

		XHRUtils.get(address, function(data) 
		{
			const meta = JSON.parse(data);

			self.name = meta.name;
			self.minZoom = meta.minZoom;
			self.maxZoom = meta.maxZoom;
			self.bounds = meta.bounds;
			self.center = meta.center;
		});
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

			if (this.mode === MapBoxProvider.STYLE) 
			{
				image.src = MapBoxProvider.ADDRESS + 'styles/v1/' + this.style + '/tiles/' + zoom + '/' + x + '/' + y + (this.useHDPI ? '@2x?access_token=' : '?access_token=') + this.apiToken;
			}
			else 
			{
				image.src = MapBoxProvider.ADDRESS + 'v4/' + this.mapId + '/' + zoom + '/' + x + '/' + y + (this.useHDPI ? '@2x.' : '.') + this.format + '?access_token=' + this.apiToken;
			}
		});
	}
}
