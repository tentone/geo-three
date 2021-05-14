import { LODControl } from './LODControl';
import { Vector3 } from 'three';

const pov = new Vector3();
const position = new Vector3();

/**
 * Check the planar distance between the nodes center and the view position.
 *
 * Distance is adjusted with the node level, more consistent results since every node is considered.
 *
 * @class LODRadial
 * @extends {LODControl}
 */
export class LODRadial extends LODControl {
	/**
	 * Minimum ditance to subdivide nodes.
	 *
	 * @attribute subdivideDistance
	 * @type {number}
	 */
	subdivideDistance = 50;

	/**
	 * Minimum ditance to simplify far away nodes that are subdivided.
	 *
	 * @attribute simplifyDistance
	 * @type {number}
	 */
	simplifyDistance = 300;

	updateLOD(view, camera, renderer, scene) {
		const self = this;

		camera.getWorldPosition(pov);

		view.children[0].traverse(function (node) {
			node.getWorldPosition(position);

			let distance = pov.distanceTo(position);
			distance /= Math.pow(2, view.provider.maxZoom - node.level);

			if (distance < self.subdivideDistance) {
				node.subdivide();
			} else if (distance > self.simplifyDistance && node.parentNode) {
				node.parentNode.simplify();
			}
		});
	}
}
