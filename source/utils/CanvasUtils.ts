/**
 * Contains utils to handle canvas element manipulation and common canvas operations.
 */
export class CanvasUtils 
{
	/**
     * Create a offscreen canvas, used to draw content that will not be displayed using DOM.
     * 
     * If OffscreenCanvas object is no available creates a regular DOM canvas object instead.
     * 
     * @param width - Width of the canvas in pixels.
     * @param height - Height of the canvas in pixels.
     */
	public static createOffscreenCanvas(width: number, height: number): (HTMLCanvasElement | OffscreenCanvas) 
	{
		if (OffscreenCanvas) 
		{
			return new OffscreenCanvas(width, height);
		}
		else 
		{
			let canvas = document.createElement('canvas');
			canvas.width = width;
			canvas.height = height;
			return canvas;
		}
	}
}
