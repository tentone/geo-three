import {MapProvider} from './MapProvider';


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
	*/
	public address: string;

	/**
	* Map image tile format.
	*/
	public format: string;

	public constructor(address: string = 'https://a.tile.openstreetmap.org/')
	{
		super();

		this.address = address;
		this.format = 'png';
	}

	public fetchTile(zoom: number, x: number, y: number): Promise<any>
	{
		return new Promise<HTMLImageElement>((resolve, reject) => 
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
			image.src = this.address + zoom + '/' + x + '/' + y + '.' + this.format;
		});
	}
}
