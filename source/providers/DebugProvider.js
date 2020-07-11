import {MapProvider} from "./MapProvider.js";

/**
 * Debug provider can be used to debug the levels of the map three based on the zoom level they change between green and red.
 *
 * @class DebugProvider
 */
export class DebugProvider extends MapProvider {
	constructor() {
		super();
		
		/**
		 * Resolution in px of each tile.
		 * 
		 * @attribute resolution
		 * @type {Number}
		 */
		this.resolution = 256;
	}

	fetchTile(zoom, x, y) {
		
		const canvas = new OffscreenCanvas(this.resolution, this.resolution);
		const context = canvas.getContext('2d');
		
		const color = zoom / this.maxZoom;
		context.textAlign = "center";
		context.textBaseline = "middle";
		context.font = "bold 48px serif";
		context.fillText("(" 	+ x + ", " + y + ")", this.resolution / 2, this.resolution / 2);

		return context.toDataURL();
	}
}
