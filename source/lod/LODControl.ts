import {MapView} from '../MapView';
import {Camera, WebGLRenderer, Object3D} from 'three';

/**
 * LOD control objects define how the map tiles are subsivided or simplified.
 */
export interface LODControl 
{
	/**
	 * Update LOD of the MapView and Camera position on the world.
	 * 
	 * @param view - Map view for wich the LOD will be updated.
	 * @param camera - Camera used to view the scene.
	 * @param renderer - Renderer object.
	 * @param scene - Scene that compose the mapview.
	 */
	updateLOD(view: MapView, camera: Camera, renderer: WebGLRenderer, scene: Object3D);
}
