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

	/**
	 * Raycaster object used to cast rays into the world and check for hits.
	 *
	 * @attribute raycaster
	 * @type {Raycaster}
	 */
	raycaster = new Raycaster();

	/**
	 * Normalized mouse coordinates.
	 *
	 * @attribute mouse
	 * @type {Vector2}
	 */
	mouse = new Vector2();

	/**
	 * Consider the distance powered to level of the node.
	 *
	 * @attribute powerDistance
	 * @type {boolean}
	 */
	powerDistance = false;

	/**
	 * Consider the scale of the node when calculating the distance.
	 *
	 * @attribute scaleDistance
	 * @type {boolean}
	 */
	scaleDistance = true;

	updateLOD(view, camera, renderer, scene) {
		const intersects = [];

		for (let t = 0; t < this.subdivisionRays; t++) {
			// Raycast from random point
			this.mouse.set(Math.random() * 2 - 1, Math.random() * 2 - 1);

			// Check intersection
			this.raycaster.setFromCamera(this.mouse, camera);
			this.raycaster.intersectObjects(view.children, true, intersects);
		}

		for (let i = 0; i < intersects.length; i++) {
			const node = intersects[i].object;
			let distance = intersects[i].distance;

			if (this.powerDistance) {
				distance = Math.pow(distance * 2, node.level);
			}

			if (this.scaleDistance) {
				const matrix = node.matrixWorld.elements;
				const vector = new Vector3(matrix[0], matrix[1], matrix[2]);
				distance = vector.length() / distance;
			}

			if (distance > this.thresholdUp) {
				node.subdivide();
				return;
			} else if (distance < this.thresholdDown) {
				if (node.parentNode !== null) {
					node.parentNode.simplify();
					return;
				}
			}
		}
	}
}
