import {MapProvider} from './MapProvider';
import {XHRUtils} from '../utils/XHRUtils';
import {CancelablePromise} from '../utils/CancelablePromise';

/**
 * Open tile map server tile provider.
 *
 * API Reference
 *  - https://openmaptiles.org/
 */
export class OpenMapTilesProvider extends MapProvider 
{
	/**
	 * Map server address.
	 *
	 * By default the open OSM tile server is used.
	 */
	public address: string;

	/**
	 * Map image tile format.
	 */
	public format: string;

	/**
	 * Map tile theme, some of the styles available.
	 * - dark-matter
	 * - klokantech-basic
	 * - osm-bright
	 * - positron
	 */
	public theme: string;

	public constructor(address: string, format: string = 'png', theme: string = 'klokantech-basic') 
	{
		super();
		
		this.address = address;
		this.format = format;
		this.theme = theme;
	}

	public getMetaData(): void
	{
		const self = this;
		const address = this.address + 'styles/' + this.theme + '.json';

		XHRUtils.get(address, function(data) 
		{
			const meta = JSON.parse(data);

			self.name = meta.name;
			self.format = meta.format;
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
			image.src = this.address + 'styles/' + this.theme + '/' + zoom + '/' + x + '/' + y + '.' + this.format;
		});
	}
}
