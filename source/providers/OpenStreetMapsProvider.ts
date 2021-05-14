import {MapProvider} from './MapProvider';
import {CancelablePromise} from '../utils/CancelablePromise';

/**
 * Open street maps tile server.
 *
 * Works with any service that uses a address/zoom/x/y.format URL for tile access.
 */
export class OpenStreetMapsProvider extends MapProvider 
{
	/**
	 * Map server address.
	 *
	 * By default the open OSM tile server is used.
	 *
	 * @type {string}
	 */
	address: string;

	/**
	 * Map image tile format.
	 *
	 * @type {string}
	 */
	format: string;

	public constructor(address = 'https://a.tile.openstreetmap.org/') 
	{
		super();
		this.address = address;
		this.format = 'png';
	}

	fetchTile(zoom: number, x: number, y: number) 
	{
		return new CancelablePromise<HTMLImageElement>((resolve, reject) => 
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
			image.src = this.address + '/' + zoom + '/' + x + '/' + y + '.' + this.format;
		});
	}
}
