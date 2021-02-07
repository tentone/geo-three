import {LODControl} from "./LODControl";
import {Vector3} from "three";

/**
 * Check the planar distance between the nodes center and the view position.
 * 
 * Distance is adjusted with the node level, more consistent results since every node is considered.
 *
 * @class LODRadial
 * @extends {LODControl}
 */
function LODRadial()
{
	LODControl.call(this);
	
	/**
	 * Minimum ditance to subdivide nodes.
	 *
	 * @attribute subdivideDistance
	 * @type {number}
	 */
	this.subdivideDistance = 50;

	/**
	 * Minimum ditance to simplify far away nodes that are subdivided.
	 *
	 * @attribute simplifyDistance
	 * @type {number}
	 */
	this.simplifyDistance = 400;

	/**
	 * If true only the nodes in frustum will be subidivided.
	 * 
	 * @attribute limitToFrustum
	 * @type {boolean}
	 */
	this.limitToFrustum = true;
}

LODRadial.prototype = Object.create(LODControl.prototype);

LODRadial.prototype.updateLOD = function(view, camera, renderer, scene)
{
	var pov = new Vector3();
	camera.getWorldPosition(pov);
	
	var position = new Vector3();
	var self = this;

	view.children[0].traverse(function(node)
	{
		node.getWorldPosition(position);

		var distance = pov.distanceTo(position);
		distance /= Math.pow(2, view.provider.maxZoom - node.level);

		if (distance < self.subdivideDistance)
		{
			node.subdivide();
		}
		else if (distance > self.simplifyDistance && node.parentNode)
		{
			node.parentNode.simplify();
		}
	});
};

export {LODRadial};
