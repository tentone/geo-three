import {MapProvider} from './MapProvider';


/**
 * Google 3D tiles provider, used to load 3D tiles using the library.
 *
 * API Reference
 *  - https://developers.google.com/maps/documentation/tile/3d-tiles-overview
 *  - https://developers.google.com/maps/documentation/tile/create-renderer
 */
export class GoogleMaps3DTilesProvider extends MapProvider 
{
	/**
	 * Server API access token.
	 */
	public apiToken: string;

	public constructor(apiToken: string) 
	{
		super();

		this.apiToken = apiToken !== undefined ? apiToken : '';
	}

	/**
	 * Get root tile.
	 */
	public getRoot() {
		// https://tile.googleapis.com/v1/3dtiles/root.json?key=YOUR_API_KEY
	}



	public fetchTile(zoom: number, x: number, y: number): Promise<any>
	{
		// /v1/3dtiles/datasets/CgA/files/UlRPVEYuYnVs.json?session=CIqhrPOFvdHSYg// 
		 
		// TODO <ADD CODE HERE>
		return;
	}
}
