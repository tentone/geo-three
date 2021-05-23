import {LODControl} from './LODControl';
import {Camera, Object3D, Vector3, WebGLRenderer} from 'three';
import {MapView} from '../MapView';

const pov = new Vector3();
const position = new Vector3();

/**
 * Check the planar distance between the nodes center and the view position.
 *
 * Distance is adjusted with the node level, more consistent results since every node is considered.
 */
export class LODRadial implements LODControl 
{
	/**
	 * Minimum ditance to subdivide nodes.
	 */
	public subdivideDistance: number = 50;

	/**
	 * Minimum ditance to simplify far away nodes that are subdivided.
	 */
	public simplifyDistance: number = 300;

	public updateLOD(view: MapView, camera: Camera, renderer: WebGLRenderer, scene: Object3D): void
	{
		camera.getWorldPosition(pov);

		view.children[0].traverse((node: any) =>
		{
			node.getWorldPosition(position);

			let distance = pov.distanceTo(position);
			distance /= Math.pow(2, view.provider.maxZoom - node.level);

			if (distance < this.subdivideDistance) 
			{
				node.subdivide();
			}
			else if (distance > this.simplifyDistance && node.parentNode) 
			{
				node.parentNode.simplify();
			}
		});
	}
}
