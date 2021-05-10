import { MapProvider } from './MapProvider';
import { Color } from 'three';
import { CancelablePromise } from '../utils/CancelablePromise';

/**
 * Debug provider can be used to debug the levels of the map three based on the zoom level they change between green and red.
 *
 * @class DebugProvider
 */
export class DebugProvider extends MapProvider {
	/**
	 * Resolution in px of each tile.
	 *
	 * @attribute resolution
	 * @type {number}
	 */
	resolution = 256;

	fetchTile(zoom, x, y) {
		const canvas = new OffscreenCanvas(this.resolution, this.resolution);
		const context = canvas.getContext('2d');

		const green = new Color(0x00ff00);
		const red = new Color(0xff0000);

		const color = green.lerpHSL(red, (zoom - this.minZoom) / (this.maxZoom - this.minZoom));

		context.fillStyle = color.getStyle();
		context.fillRect(0, 0, this.resolution, this.resolution);

		context.fillStyle = '#000000';
		context.textAlign = 'center';
		context.textBaseline = 'middle';
		context.font = 'bold ' + this.resolution * 0.1 + 'px arial';
		context.fillText('(' + zoom + ')', this.resolution / 2, this.resolution * 0.4);
		context.fillText('(' + x + ', ' + y + ')', this.resolution / 2, this.resolution * 0.6);

		return Promise.resolve(canvas);
	}
}
