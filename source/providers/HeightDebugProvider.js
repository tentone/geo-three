import {MapProvider} from "./MapProvider.js";

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
	}

	fetchTile(zoom, x, y)
	{
		return new Promise(function(resolve, reject)
		{
			this.provider.fetchTile(zoom, x, y).then(function(image)
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
					
					var ratio = 16777215 / 255;
					value *= ratio;

					//Limit value to fit 1 byte
					if(value < 0) {value = 0;}
					else if(value > 255) {value = 255;}
		
					data[i] = value;
					data[i + 1] = value;
					data[i + 2] = value;
				}
		
				context.putImageData(imageData, 0, 0);

				resolve(canvas);
			}).catch(reject);
		});

	}
}
