import {MapProvider} from "./MapProvider.js";
import {XHRUtils} from "../utils/XHRUtils.js";

/**
 * Map box service tile provider. Map tiles can be fetched from style or from a map id.
 *
 * API Reference
 *  - https://www.mapbox.com/
 *
 * @class MapBoxProvider
 * @param {String} apiToken Map box api token.
 * @param {String} id Map style or mapID if the mode is set to MAP_ID.
 * @param {Number} mode Map tile access mode.
 * @param {String} format Image format.
 * @param {Boolean} useHDPI
 */
export class MapBoxProvider extends MapProvider
{
	constructor(apiToken, id, mode, format, useHDPI)
	{
		super();

		/**
		 * Server API access token.
		 * 
		 * @attribute apiToken
		 * @type {String}
		 */
		this.apiToken = apiToken !== undefined ? apiToken : "";

		/**
		 * Map image tile format, the formats available are:
		 *  - png True color PNG
		 *  - png32 32 color indexed PNG
		 *  - png64 64 color indexed PNG
		 *  - png128 128 color indexed PNG
		 *  - png256 256 color indexed PNG
		 *  - jpg70 70% quality JPG
		 *  - jpg80 80% quality JPG
		 *  - jpg90 90% quality JPG
		 *  - pngraw Raw png (no interpolation)
		 *
		 * @attribute format
		 * @type {String}
		 */
		this.format = format !== undefined ? format : "png";

		/**
		 * Flag to indicate if should use high resolution tiles
		 *
		 * @attribute useHDPI
		 * @type {Boolean}
		 */
		this.useHDPI = useHDPI !== undefined ? useHDPI : false;

		/** 
		 * Map tile access mode
		 *  - MapBoxProvider.STYLE
		 *  - MapBoxProvider.MAP_ID
		 *
		 * @attribute mode
		 * @type {Number}
		 */
		this.mode = mode !== undefined ? mode : MapBoxProvider.STYLE;

		/**
		 * Map identifier composed of {username}.{style}
		 *
		 * Some examples of the public mapbox identifiers:
		 *  - mapbox.mapbox-streets-v7
		 *  - mapbox.satellite
		 *  - mapbox.mapbox-terrain-v2
		 *  - mapbox.mapbox-traffic-v1
		 *  - mapbox.terrain-rgb
		 *
		 * @attribute mapId
		 * @type {String}
		 */
		this.mapId = id !== undefined ? id : "";

		/**
		 * Map style to be used composed of {username}/{style_id}
		 *
		 * Some example of the syles available:
		 *  - mapbox/streets-v10
		 *  - mapbox/outdoors-v10
		 *  - mapbox/light-v9
		 *  - mapbox/dark-v9
		 *  - mapbox/satellite-v9
		 *  - mapbox/satellite-streets-v10
		 *  - mapbox/navigation-preview-day-v4
		 *  - mapbox/navigation-preview-night-v4
		 *  - mapbox/navigation-guidance-day-v4
		 *  - mapbox/navigation-guidance-night-v4
		 *
		 * @attribute style
		 * @type {String}
		 */
		this.style = id !== undefined ? id : "";
	}

	getMetaData()
	{
		const self = this;
		const address = MapBoxProvider.ADDRESS + this.version + "/" + this.mapId + ".json?access_token=" + this.apiToken;

		XHRUtils.get(address, function(data)
		{
			const meta = JSON.parse(data);

			self.name = meta.name;
			self.minZoom = meta.minZoom;
			self.maxZoom = meta.maxZoom;
			self.bounds = meta.bounds;
			self.center = meta.center;
		});
	}

	fetchTile(zoom, x, y)
	{
		return new Promise((resolve, reject) =>
		{
			var image = document.createElement("img");
			image.onload = function(){resolve(image);};
			image.onerror = function(){reject();};
			image.crossOrigin = "Anonymous";

			if(this.mode === MapBoxProvider.STYLE)
			{
				image.src = MapBoxProvider.ADDRESS + "styles/v1/" + this.style + "/tiles/" + zoom + "/" + x + "/" + y + (this.useHDPI ? "@2x?access_token=" : "?access_token=") + this.apiToken;
			}
			else
			{
				image.src = MapBoxProvider.ADDRESS + "v4/" + this.mapId + "/" + zoom + "/" + x + "/" + y + (this.useHDPI ? "@2x." : ".") + this.format + "?access_token=" + this.apiToken;
			}
		});
	}
}

MapBoxProvider.ADDRESS = "https://api.mapbox.com/";

/**
 * Access the map data using a map style.
 *
 * @static
 * @attribute STYLE
 * @type {Number}
 */
MapBoxProvider.STYLE = 100;

/**
 * Access the map data using a map id.
 *
 * @static
 * @attribute MAP_ID
 * @type {Number}
 */
MapBoxProvider.MAP_ID = 101;
