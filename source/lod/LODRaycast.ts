import { LODControl } from './LODControl';
import { Raycaster, Vector2, Vector3 } from 'three';
import { MapView } from '../MapView';

/**
 * Use random raycasting to randomly pick n objects to be tested on screen space.
 *
 * Overall the fastest solution but does not include out of screen objects.
 *
 * @class LODRaycast
 * @extends {LODControl}
 */
export class LODRaycast extends LODControl {
	/**
	 * Number of rays used to test nodes and subdivide the map.
	 *
	 * N rays are cast each frame dependeing on this value to check distance to the visible map nodes. A single ray should be enough for must scenarios.
	 *
	 * @attribute subdivisionRays
	 * @type {boolean}
	 */
	subdivisionRays = 1;

	/**
	 * Threshold to subdivide the map tiles.
	 *
	 * Lower value will subdivide earlier (less zoom required to subdivide).
	 *
	 * @attribute thresholdUp
	 * @type {number}
	 */
	thresholdUp = 0.6;

	/**
	 * Threshold to simplify the map tiles.
	 *
	 * Higher value will simplify earlier.
	 *
	 * @attribute thresholdDown
	 * @type {number}
	 */
	thresholdDown = 0.15;

	raycaster = new Raycaster();

	mouse = new Vector2();

	vector = new Vector3();
	updateLOD(view, camera, renderer, scene) {
		const intersects = [];

		for (let t = 0; t < this.subdivisionRays; t++) {
			// Raycast from random point
			this.mouse.set(Math.random() * 2 - 1, Math.random() * 2 - 1);

			// Check intersection
			this.raycaster.setFromCamera(this.mouse, camera);
			this.raycaster.intersectObjects(view.children, true, intersects);
		}

		if (view.mode === MapView.SPHERICAL) {
			for (let i = 0; i < intersects.length; i++) {
				const node = intersects[i].object;
				const distance = Math.pow(intersects[i].distance * 2, node.level);

				if (distance < this.thresholdUp) {
					node.subdivide();
					return;
				} else if (distance > this.thresholdDown) {
					if (node.parentNode !== null) {
						node.parentNode.simplify();
						return;
					}
				}
			}
		} // if(this.mode === MapView.PLANAR || this.mode === MapView.HEIGHT)
		else {
			for (let i = 0; i < intersects.length; i++) {
				const node = intersects[i].object;
				const matrix = node.matrixWorld.elements;
				const scaleX = this.vector.set(matrix[0], matrix[1], matrix[2]).length();
				const value = scaleX / intersects[i].distance;

				if (value > this.thresholdUp) {
					node.subdivide();
					return;
				} else if (value < this.thresholdDown) {
					if (node.parentNode !== null) {
						node.parentNode.simplify();
						return;
					}
				}
			}
		}
	}
}
