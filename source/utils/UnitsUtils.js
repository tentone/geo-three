/**
 * Location utils contains utils to access the user location (GPS, IP location or wifi) and convert data between representations.
 *
 * Devices with a GPS, for example, can take a minute or more to get a GPS fix, so less accurate data (IP location or wifi) may be returned.
 *
 * @static
 * @class UnitsUtils
 */
export class UnitsUtils {
	/**
	 * Get the current geolocation from the browser using the location API.
	 * 
	 * This location can be provided from GPS measure, estimated IP location or any other system available in the host. Precision may vary.
	 *
	 * @method get
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
	 * @method datumsToSpherical
	 * @param {number} latitude
	 * @param {number} longitude
	 */
	static datumsToSpherical(latitude, longitude)
	{
		var x = longitude * UnitsUtils.EARTH_ORIGIN / 180.0;
		var y = Math.log(Math.tan((90 + latitude) * Math.PI / 360.0)) / (Math.PI / 180.0);

		y = y * UnitsUtils.EARTH_ORIGIN / 180.0;

		return {x:x, y:y};
	}

	/**
	 * Converts XY point from Spherical Mercator EPSG:900913 to lat/lon in WGS84 Datum.
	 *
	 * @method sphericalToDatums
	 * @param {number} x
	 * @param {number} y
	 */
	static sphericalToDatums(x, y)
	{
		var longitude = (x / UnitsUtils.EARTH_ORIGIN) * 180.0;
		var latitude = (y / UnitsUtils.EARTH_ORIGIN) * 180.0;

		latitude = (180.0 / Math.PI) * (2 * Math.atan(Math.exp(latitude * Math.PI / 180.0)) - Math.PI / 2.0);

		return {latitude:latitude, longitude:longitude};
	}

	/**
	 * Converts quad tree zoom/x/y to lat/lon in WGS84 Datum.
	 *
	 * @method quadtreeToDatums
	 * @param {number} zoom
	 * @param {number} x
	 * @param {number} y
	 */
	static quadtreeToDatums(zoom, x, y)
	{
		var n = Math.pow(2.0, zoom);
		var longitude = x / n * 360.0 - 180.0;
		var latitudeRad = Math.atan(Math.sinh(Math.PI * (1.0 - 2.0 * y / n)));
		var latitude = 180.0 * (latitudeRad / Math.PI);

		return {latitude:latitude, longitude:longitude};
	}
}

/**
 * Aproximated radius of earth in meters.
 *
 * @static
 * @attribute EARTH_RADIUS
 */
UnitsUtils.EARTH_RADIUS = 6378137;

/**
 * Earth equator perimeter in meters.
 *
 * @static
 * @attribute EARTH_RADIUS
 */
UnitsUtils.EARTH_PERIMETER = 2 * Math.PI * UnitsUtils.EARTH_RADIUS;

/**
 * Earth equator perimeter in meters.
 *
 * @static
 * @attribute EARTH_ORIGIN
 */
UnitsUtils.EARTH_ORIGIN = UnitsUtils.EARTH_PERIMETER / 2.0;
