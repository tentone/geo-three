/**
 * Open street maps tile server.
 *
 * Works with any service that uses a address/zoom/x/y.format URL for tile access.
 *
 * @class OpenStreetMapsProvider
 */
function OpenStreetMapsProvider(address)
{
	MapProvider.call(this);

	/**
	 * Map server address.
	 *
	 * By default the open OSM tile server is used.
	 * 
	 * @attribute address
	 * @type {String}
	 */
	this.address = address !== undefined ? address : "https://a.tile.openstreetmap.org/";

	/**
	 * Map image tile format.
	 * 
	 * @attribute format
	 * @type {String}
	 */
	this.format = "png";
}

OpenStreetMapsProvider.prototype = Object.create(MapProvider.prototype);

OpenStreetMapsProvider.prototype.fetchTile = function(zoom, x, y)
{
	return this.address + "/" + zoom + "/" + x + "/" + y + "." + this.format;
};
