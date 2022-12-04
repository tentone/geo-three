import {Vector2} from 'three';

/**
 * Units utils contains methods to convert data between representations.
 *
 * Multiple methods are used to reprent world coordinates based on the type of data being presented.
 * 
 * WGS84 is the most commonly used representation with (latitude, longitude, altitude).
 * 
 * EPSG:900913 is used for planar coordinates in (X, Y, Z)
 */
export class UnitsUtils 
{
	/**
	 * Average radius of earth in meters.
	 */
	public static EARTH_RADIUS: number = 6371008;

	/**
	 * Earth equator perimeter in meters.
	 */
	public static EARTH_PERIMETER: number = 2 * Math.PI * UnitsUtils.EARTH_RADIUS;

	/**
	 * Earth equator perimeter in meters.
	 */
	public static EARTH_ORIGIN: number = UnitsUtils.EARTH_PERIMETER / 2.0;

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
	 * The X and Y start from 0 from the top/left corner of the quadtree up to (4^zoom - 1)
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
