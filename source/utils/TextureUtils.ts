import { LinearFilter, RGBAFormat, Texture } from "three";
import { CanvasUtils } from "./CanvasUtils";

/**
 * Utils for texture creation and manipulation.
 */
 export class TextureUtils 
 {
     /**
      * Create a new texture filled with a CSS style.
      * 
      * Can be color, gradient or pattern. Supports all options supported in the fillStyle of the canvas API.
      * 
      * @param color - Style to apply to the texture surface.
      * @param width - Width of the canvas in pixels.
      * @param height - Height of the canvas in pixels.
      */
     public static createFillTexture(color: (string | CanvasGradient | CanvasPattern) = '#FF0000', width: number = 1, height: number = 1): Texture
     {
        const canvas = CanvasUtils.createOffscreenCanvas(width, height);
        const context = canvas.getContext('2d');
        context.fillStyle = color;
        context.fillRect(0, 0, width, height);

        const texture = new Texture(canvas as any);
        texture.format = RGBAFormat;
        texture.magFilter = LinearFilter;
        texture.minFilter = LinearFilter;
        texture.generateMipmaps = false;
        texture.needsUpdate = true;
        
        return texture;
     }
 }
 