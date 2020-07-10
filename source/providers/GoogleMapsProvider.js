import {MapProvider} from "./MapProvider.js";
import {XHRUtils} from "../utils/XHRUtils.js";

/**
 * Google maps tile server.
 *
 * The tile API is only available to select partners, and is not included with the Google Maps Core ServiceList.
 *
 * API Reference
 *  - https://developers.google.com/maps/documentation/javascript/coordinates
 *  - https://developers.google.com/maps/documentation/tile
 *
 * @class GoogleMapsProvider
 */
export class GoogleMapsProvider extends MapProvider {
	constructor(apiToken) {
		super();

		/**
		 * Server API access token.
		 * 
		 * @attribute apiToken
		 * @type {String}
		 */
		this.apiToken = apiToken !== undefined ? apiToken : "";

		/**
		 * After the first call a session token is stored.
		 *
		 * The session token is required for subsequent requests for tile and viewport information.
		 *
		 * @attribute sessionToken
		 * @type {String}
		 */
		this.sessionToken = null;

		/**
		 * The map orientation in degrees.
		 *
		 * Can be 0, 90, 180 or 270.
		 *
		 * @attribute orientation
		 * @type {Number}
		 */
		this.orientation = 0;

		/**
		 * Map image tile format, the formats available are:
		 *  - png PNG
		 *  - jpg JPG
		 *
		 * @attribute format
		 * @type {String}
		 */
		this.format = "png";

		/** 
		 * The type of base map. This can be one of the following:
		 *  - roadmap: The standard Google Maps painted map tiles.
		 *  - satellite: Satellite imagery.
		 *  - terrain: Shaded relief maps of 3D terrain. When selecting terrain as the map type, you must also include the layerRoadmap layer type (described in the Optional fields section below).
		 *  - streetview: Street View panoramas. See the Street View guide.
		 *
		 * @attribute mapType
		 * @type {String}
		 */
		this.mapType = "roadmap";

		/**
		 * If true overlays are shown.
		 *
		 * @attribute overlay
		 * @type {Boolean}
		 */
		this.overlay = false;

		this.createSession();
	}

	/**
	 * Create a map tile session in the maps API.
	 *
	 * This method needs to be called before using the provider
	 *
	 * @method createSession
	 */
	createSession() {
		const self = this;

		const address = "https://www.googleapis.com/tile/v1/createSession?key=" + this.apiToken;
		const data = JSON.stringify(
		{
			"mapType": this.mapType,
			"language": "en-EN",
			"region": "en",
			"layerTypes": ["layerRoadmap", "layerStreetview"],
			"overlay":  this.overlay,
			"scale": "scaleFactor1x"
		});

		XHRUtils.request(address, "GET", {"Content-Type": "text/json"}, data, function(response, xhr)
		{
			console.log("Created google maps session.", response, xhr);
			self.sessionToken = response.session;
		},
		function(xhr)
		{
			console.warn("Unable to create a google maps session.", xhr);
		});
	}

	fetchTile(zoom, x, y) {
		return "https://www.googleapis.com/tile/v1/tiles/" + zoom + "/" + x + "/" + y + "?session=" + this.sessionToken + "&orientation=" + this.orientation + "&key=" + this.apiToken;
	}
}
