import {
	Box3,
	type Camera,
	Frustum,
	Matrix4,
	type Object3D,
	type OrthographicCamera,
	Vector3,
	type WebGLRenderer
} from 'three';
import {LODFrustum} from './LODFrustum';
import {MapView} from '../MapView';
import {MapPlaneNode} from '../nodes/MapPlaneNode';

const projection = new Matrix4();
const pov = new Vector3();
const frustum = new Frustum();
const position = new Vector3();

// https://docs.mapbox.com/help/glossary/zoom-level/#zoom-levels-and-geographical-distance
const zoomLevelPixelRatios = [
	78271.484, 39135.742, 19567.871, 9783.936, 4891.968, 2445.984, 1222.992,
	611.496, 305.748, 152.874, 76.437, 38.218, 19.109, 9.555, 4.777, 2.389, 1.194,
	0.597, 0.299, 0.149, 0.075, 0.037, 0.019
];

/**
 * LOD control based on the orthographic camera frustum.
 * 
 * This control is only applied to orthographic cameras.
 */
export class LODFrustumOrthographic extends LODFrustum 
{
	public updateLOD(view: MapView, camera: Camera, renderer: WebGLRenderer, scene: Object3D): void 
	{
		const isOrthographic = (camera as OrthographicCamera).isOrthographicCamera;
		if (!isOrthographic) 
		{
			super.updateLOD(view, camera, renderer, scene);
			return;
		}
		projection.multiplyMatrices(
			camera.projectionMatrix,
			camera.matrixWorldInverse
		);
		frustum.setFromProjectionMatrix(projection);
		camera.getWorldPosition(pov);

        // @ts-ignore
		view.children[0].traverse((obj) => 
		{
			const node = obj as MapPlaneNode&Object3D;

			node.getWorldPosition(position);
			const nodeBox = new Box3().setFromObject(node);
			let distance = nodeBox.distanceToPoint(pov);
			distance /= 2 ** (view.provider.maxZoom - node.level);

			const inFrustum = frustum.intersectsObject(node);

			if (inFrustum) 
			{
				const metresPerPixel = 1 / (camera as OrthographicCamera).zoom;
				let closestZoomLevel = 0;
				let minDifference = Number.POSITIVE_INFINITY;
				for (let i = 0; i < zoomLevelPixelRatios.length; i++) 
				{
					const difference = Math.abs(zoomLevelPixelRatios[i] - metresPerPixel);
					if (difference < minDifference) 
					{
						minDifference = difference;
						closestZoomLevel = i;
					}
				}
				if (node.level < closestZoomLevel) 
				{
					if (!(node.children.length > 0)) 
					{
						node.subdivide();
					}
				}
				else if (node.level > closestZoomLevel) 
				{
					node.parentNode?.simplify();
				}
			}
		});
	}
}
