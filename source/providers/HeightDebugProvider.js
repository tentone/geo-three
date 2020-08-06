import {MapProvider} from "./MapProvider.js";
import {Color} from "three";

/**
 * Height debug provider takes a RGB encoded height map from another provider and converts it to a gradient for preview.
 *
 * Usefull to preview and compare height of different providers. Can also be usefull to generate grayscale maps to be feed into other libraries (e.g. physics engine).
 * 
 * @class HeightDebugProvider
 */
export class HeightDebugProvider extends MapProvider
{
	constructor(provider)
	{
		super();

		/**
		 * The provider used to retrieve the base RGB information to be debugged.
		 * 
		 * @attribute provider
		 * @type {MapProvider}
		 */
		this.provider = provider;

		/**
		 * Initial color to be used for lower values.
		 * 
		 * @attribute fromColor
		 * @type {Color}
		 */
		this.fromColor = new Color(0xFF0000);

		/**
		 * Final color to be used for higher values.
		 * 
		 * @attribute toColor
		 * @type {Color}
		 */
		this.toColor = new Color(0x00FF00);
	}

	fetchTile(zoom, x, y)
	{
		return new Promise((resolve, reject) =>
		{
			this.provider.fetchTile(zoom, x, y).then((image) =>
			{
				const resolution = 256;

				const canvas = new OffscreenCanvas(resolution, resolution);
				const context = canvas.getContext('2d');
				
				context.drawImage(image, 0, 0, resolution, resolution, 0, 0, resolution, resolution);
		
				var imageData = context.getImageData(0, 0, resolution, resolution);
				var data = imageData.data;
				for(var i = 0; i < data.length; i += 4)
				{
					var r = data[i];
					var g = data[i + 1];
					var b = data[i + 2];
		
					//The value will be composed of the bits RGB
					var value = (((r * 65536 + g * 256 + b) * 0.1) - 1e4);
					
					// (16777216 * 0.1) - 1e4
					var max = 1667721.6;

					const color = this.fromColor.clone().lerpHSL(this.toColor, value / max);

					// Set pixel color
					data[i] = color.r * 255;
					data[i + 1] = color.g * 255;
					data[i + 2] = color.b * 255;
				}
		
				context.putImageData(imageData, 0, 0);

				resolve(canvas);
			}).catch(reject);
		});

	}
}
