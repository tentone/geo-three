import {LODRadial} from './LODRadial';
import {Camera, Frustum, Matrix4, Object3D, Vector3, WebGLRenderer} from 'three';
import {MapView} from '../MapView';

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
	public subdivideDistance: number;

	/**
	 * Distance to simplify the tiles.
	 */
	public simplifyDistance: number;

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

	public constructor(subdivideDistance: number = 120, simplifyDistance: number = 400) 
	{
		super(subdivideDistance, simplifyDistance);
	}

	public updateLOD(view: MapView, camera: Camera, renderer: WebGLRenderer, scene: Object3D): void
	{
		projection.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
		frustum.setFromProjectionMatrix(projection);
		camera.getWorldPosition(pov);

		view.children[0].traverse((node: any) => 
		{
			node.getWorldPosition(position);
			let distance = pov.distanceTo(position);
			distance /= Math.pow(2, view.provider.maxZoom - node.level);

			const inFrustum = this.pointOnly ? frustum.containsPoint(position) : frustum.intersectsObject(node);

			if (distance < this.subdivideDistance && inFrustum) 
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
