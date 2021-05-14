import {LODRadial} from './LODRadial';
import {Frustum, Matrix4, Vector3} from 'three';

const projection = new Matrix4();
const pov = new Vector3();
const frustum = new Frustum();
const position = new Vector3();

/**
 * Check the planar distance between the nodes center and the view position.
 *
 * Only subdivides elements inside of the camera frustum.
 */
export class LODFrustum extends LODRadial 
{
	/**
	 * Distance to subdivide the tiles.
	 */
	public subdivideDistance: number = 120;

	/**
	 * Distance to simplify the tiles.
	 */
	public simplifyDistance: number = 400;

	/**
	 * If true only the central point of the plane geometry will be used
	 *
	 * Otherwise the object bouding sphere will be tested, providing better results for nodes on frustum edge but will lower performance.
	 */
	public testCenter: boolean = true;

	/**
	 * If set true only the center point of the object is considered. 
	 * 
	 * Otherwise the full bouding box of the objects are considered.
	 */
	public pointOnly: boolean = false;

	updateLOD(view, camera, renderer, scene) 
	{
		projection.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
		frustum.setFromProjectionMatrix(projection);
		camera.getWorldPosition(pov);

		const self = this;
		view.children[0].traverse(function(node) 
		{
			node.getWorldPosition(position);
			let distance = pov.distanceTo(position);
			distance /= Math.pow(2, view.provider.maxZoom - node.level);

			const inFrustum = self.pointOnly ? frustum.containsPoint(position) : frustum.intersectsObject(node);

			if (distance < self.subdivideDistance && inFrustum) 
			{
				node.subdivide();
			}
			else if (distance > self.simplifyDistance && node.parentNode) 
			{
				node.parentNode.simplify();
			}
		});
	}
}
