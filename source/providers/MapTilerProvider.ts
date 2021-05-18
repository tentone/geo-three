import {MapProvider} from './MapProvider';


/**
 * Map tiler provider API.
 *
 * The map tiler server is based on open map tiles.
 *
 * API Reference
 *  - https://www.maptiler.com/
 */
export class MapTilerProvider extends MapProvider 
{
	/**
	 * Server API access token.
	 */
	public apiKey: string;

	/**
	 * Map image tile file format (e.g png, jpg)
	 *
	 * Format can be for image or for geometry fetched from the system (e.g quantized-mesh-1.0)
	 */
	public format: string;

	/**
	 * Tile category (e.g. maps, tiles),
	 */
	public category: string;

	/**
	 * Map tile type, some of the vectorial styles available.
	 *
	 * Can be used for rasterized vectorial maps (e.g, basic, bright, darkmatter, hybrid, positron, streets, topo, voyager).
	 *
	 * Cam be used for data tiles (e.g hillshades, terrain-rgb, satellite).
	 */
	public style: string;

	public resolution: number;

	public constructor(apiKey, category, style, format) 
	{
		super();

		this.apiKey = apiKey !== undefined ? apiKey : '';

		this.format = format !== undefined ? format : 'png';

		this.category = category !== undefined ? category : 'maps';

		this.style = style !== undefined ? style : 'satellite';

		this.resolution = 512;
	}

	public fetchTile(zoom: number, x: number, y: number): Promise<any> 
	{
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
			image.src = 'https://api.maptiler.com/' + this.category + '/' + this.style + '/' + zoom + '/' + x + '/' + y + '.' + this.format + '?key=' + this.apiKey;
		});
	}
}
