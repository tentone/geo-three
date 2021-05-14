import {MapProvider} from './MapProvider';
import {XHRUtils} from '../utils/XHRUtils';
import {CancelablePromise} from '../utils/CancelablePromise';

/**
 * Google maps tile server.
 *
 * The tile API is only available to select partners, and is not included with the Google Maps Core ServiceList.
 *
 * API Reference
 *  - https://developers.google.com/maps/documentation/javascript/coordinates
 *  - https://developers.google.com/maps/documentation/tile
 */
export class GoogleMapsProvider extends MapProvider 
{
	/**
	 * Server API access token.
	 */
	public apiToken: string;

	/**
	 * After the first call a session token is stored.
	 *
	 * The session token is required for subsequent requests for tile and viewport information.
	 */
	public sessionToken: string = null;

	/**
	 * The map orientation in degrees.
	 *
	 * Can be 0, 90, 180 or 270.
	 */
	public orientation: number = 0;

	/**
	 * Map image tile format, the formats available are:
	 *  - png PNG
	 *  - jpg JPG
	 */
	public format: string = 'png';

	/**
	 * The type of base map. This can be one of the following:
	 *  - roadmap: The standard Google Maps painted map tiles.
	 *  - satellite: Satellite imagery.
	 *  - terrain: Shaded relief maps of 3D terrain. When selecting terrain as the map type, you must also include the layerRoadmap layer type (described in the Optional fields section below).
	 *  - streetview: Street View panoramas. See the Street View guide.
	 */
	public mapType: string = 'roadmap';

	/**
	 * If true overlays are shown.
	 */
	public overlay: boolean = false;

	public constructor(apiToken) 
	{
		super();

		this.apiToken = apiToken !== undefined ? apiToken : '';

		this.createSession();
	}

	/**
	 * Create a map tile session in the maps API.
	 *
	 * This method needs to be called before using the provider
	 *
	 */
	public createSession(): void 
	{
		const self = this;

		const address = 'https://www.googleapis.com/tile/v1/createSession?key=' + this.apiToken;
		const data = JSON.stringify({
			mapType: this.mapType,
			language: 'en-EN',
			region: 'en',
			layerTypes: ['layerRoadmap', 'layerStreetview'],
			overlay: this.overlay,
			scale: 'scaleFactor1x'
		});

		XHRUtils.request(
			address,
			'GET',
			{'Content-Type': 'text/json'},
			data,
			function(response, xhr) 
			{
				console.log('Created google maps session.', response, xhr);
				self.sessionToken = response.session;
			},
			function(xhr) 
			{
				console.warn('Unable to create a google maps session.', xhr);
			}
		);
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
			image.src = 'https://www.googleapis.com/tile/v1/tiles/' + zoom + '/' + x + '/' + y + '?session=' + this.sessionToken + '&orientation=' + this.orientation + '&key=' + this.apiToken;
		});
	}
}
