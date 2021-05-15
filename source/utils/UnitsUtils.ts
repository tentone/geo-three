import {Vector2} from 'three';

/**
 * Location utils contains utils to access the user location (GPS, IP location or wifi) and convert data between representations.
 *
 * Devices with a GPS, for example, can take a minute or more to get a GPS fix, so less accurate data (IP location or wifi) may be returned.
 */
export class UnitsUtils 
{
	/**
	 * Aproximated radius of earth in meters.
	 */
	public static EARTH_RADIUS: number = 6378137;

	/**
	 * Earth equator perimeter in meters.
	 */
	public static EARTH_PERIMETER: number = 2 * Math.PI * UnitsUtils.EARTH_RADIUS;

	/**
	 * Earth equator perimeter in meters.
	 */
	public static EARTH_ORIGIN: number = UnitsUtils.EARTH_PERIMETER / 2.0;

	/**
	 * Get the current geolocation from the browser using the location API.
	 *
	 * This location can be provided from GPS measure, estimated IP location or any other system available in the host. Precision may vary.
	 *
	 * @param onResult - Callback function onResult(coords, timestamp).
	 * @param onError - Callback to handle errors.
	 */
	public static get(onResult: Function, onError: Function): void
	{
		navigator.geolocation.getCurrentPosition(function(result) 
		{
			onResult(result.coords, result.timestamp);
		// @ts-ignore
		}, onError);
	}

	/**
	 * Converts given lat/lon in WGS84 Datum to XY in Spherical Mercator EPSG:900913.
	 *
	 * @param latitude - Latitude value in degrees.
	 * @param longitude - Longitude value in degrees.
	 */
	public static datumsToSpherical(latitude: number, longitude: number): Vector2
	{
		const x = longitude * UnitsUtils.EARTH_ORIGIN / 180.0;
		let y = Math.log(Math.tan((90 + latitude) * Math.PI / 360.0)) / (Math.PI / 180.0);

		y = y * UnitsUtils.EARTH_ORIGIN / 180.0;

		return new Vector2(x, y);
	}

	/**
	 * Converts XY point from Spherical Mercator EPSG:900913 to lat/lon in WGS84 Datum.
	 *
	 * @param x - X coordinate.
	 * @param y - Y coordinate.
	 */
	public static sphericalToDatums(x: number, y: number): {latitude: number, longitude: number}
	{
		const longitude = x / UnitsUtils.EARTH_ORIGIN * 180.0;
		let latitude = y / UnitsUtils.EARTH_ORIGIN * 180.0;

		latitude = 180.0 / Math.PI * (2 * Math.atan(Math.exp(latitude * Math.PI / 180.0)) - Math.PI / 2.0);

		return {latitude: latitude, longitude: longitude};
	}

	/**
	 * Converts quad tree zoom/x/y to lat/lon in WGS84 Datum.
	 *
	 * @param zoom - Zoom level of the quad tree.
	 * @param x - X coordinate.
	 * @param y - Y coordinate.
	 */
	public static quadtreeToDatums(zoom: number, x: number, y: number): {latitude: number, longitude: number}
	{
		const n = Math.pow(2.0, zoom);
		const longitude = x / n * 360.0 - 180.0;
		const latitudeRad = Math.atan(Math.sinh(Math.PI * (1.0 - 2.0 * y / n)));
		const latitude = 180.0 * (latitudeRad / Math.PI);

		return {latitude: latitude, longitude: longitude};
	}
}
