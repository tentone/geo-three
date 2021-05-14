/**
 * Location utils contains utils to access the user location (GPS, IP location or wifi) and convert data between representations.
 *
 * Devices with a GPS, for example, can take a minute or more to get a GPS fix, so less accurate data (IP location or wifi) may be returned.
 *
 * @static
 * @class UnitsUtils
 */
export class UnitsUtils 
{
	/**
	 * Aproximated radius of earth in meters.
	 *
	 */
	static EARTH_RADIUS: number = 6378137;

	/**
	 * Earth equator perimeter in meters.
	 *
	 */
	static EARTH_PERIMETER: number = 2 * Math.PI * UnitsUtils.EARTH_RADIUS;

	/**
	 * Earth equator perimeter in meters.
	 *
	 */
	static EARTH_ORIGIN: number = UnitsUtils.EARTH_PERIMETER / 2.0;

	/**
	 * Get the current geolocation from the browser using the location API.
	 *
	 * This location can be provided from GPS measure, estimated IP location or any other system available in the host. Precision may vary.
	 *
	 * @param {Function} onResult Callback function onResult(coords, timestamp).
	 */
	static get(onResult, onError) 
	{
		navigator.geolocation.getCurrentPosition(function(result) 
		{
			onResult(result.coords, result.timestamp);
		}, onError);
	}

	/**
	 * Converts given lat/lon in WGS84 Datum to XY in Spherical Mercator EPSG:900913.
	 *
	 * @param {number} latitude
	 * @param {number} longitude
	 */
	static datumsToSpherical(latitude, longitude) 
	{
		const x = longitude * UnitsUtils.EARTH_ORIGIN / 180.0;
		let y = Math.log(Math.tan((90 + latitude) * Math.PI / 360.0)) / (Math.PI / 180.0);

		y = y * UnitsUtils.EARTH_ORIGIN / 180.0;

		return {x: x, y: y};
	}

	/**
	 * Converts XY point from Spherical Mercator EPSG:900913 to lat/lon in WGS84 Datum.
	 *
	 * @param {number} x
	 * @param {number} y
	 */
	static sphericalToDatums(x, y) 
	{
		const longitude = x / UnitsUtils.EARTH_ORIGIN * 180.0;
		let latitude = y / UnitsUtils.EARTH_ORIGIN * 180.0;

		latitude = 180.0 / Math.PI * (2 * Math.atan(Math.exp(latitude * Math.PI / 180.0)) - Math.PI / 2.0);

		return {latitude: latitude, longitude: longitude};
	}

	/**
	 * Converts quad tree zoom/x/y to lat/lon in WGS84 Datum.
	 *
	 * @param {number} zoom
	 * @param {number} x
	 * @param {number} y
	 */
	static quadtreeToDatums(zoom, x, y) 
	{
		const n = Math.pow(2.0, zoom);
		const longitude = x / n * 360.0 - 180.0;
		const latitudeRad = Math.atan(Math.sinh(Math.PI * (1.0 - 2.0 * y / n)));
		const latitude = 180.0 * (latitudeRad / Math.PI);

		return {latitude: latitude, longitude: longitude};
	}
}
