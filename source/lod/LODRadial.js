import {LODControl} from "./LODControl";
import {Vector3} from "threejs";

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
	this.subdivideDistance = 8e1;

	/**
	 * Minimum ditance to simplify far away nodes that are subdivided.
	 *
	 * @attribute simplifyDistance
	 * @type {number}
	 */
	this.simplifyDistance = 4e2;
}

LODRadial.prototype = Object.create(LODControl.prototype);

LODRadial.prototype.updateLOD = function(view, camera, renderer, scene)
{
	var view = new Vector3();
	camera.getWorldPosition(view);
	
	var position = new Vector3();
	var self = this;

	view.children[0].traverse(function(node)
	{
		node.getWorldPosition(position);

		var distance = view.distanceTo(position);
		distance /= Math.pow(2, self.provider.maxZoom - node.level);

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
