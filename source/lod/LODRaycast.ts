import {LODControl} from './LODControl';
import {Camera, Object3D, Raycaster, Vector2, Vector3, WebGLRenderer} from 'three';
import {MapView} from '../MapView';

/**
 * Use random raycasting to randomly pick n objects to be tested on screen space.
 *
 * Overall the fastest solution but does not include out of screen objects.
 */
export class LODRaycast implements LODControl 
{
	/**
	 * Number of rays used to test nodes and subdivide the map.
	 *
	 * N rays are cast each frame dependeing on this value to check distance to the visible map nodes. A single ray should be enough for must scenarios.
	 */
	public subdivisionRays: number = 1;

	/**
	 * Threshold to subdivide the map tiles.
	 *
	 * Lower value will subdivide earlier (less zoom required to subdivide).
	 */
	public thresholdUp: number = 0.6;

	/**
	 * Threshold to simplify the map tiles.
	 *
	 * Higher value will simplify earlier.
	 */
	public thresholdDown: number = 0.15;

	/**
	 * Raycaster object used to cast rays into the world and check for hits.
	 */
	public raycaster: Raycaster = new Raycaster();

	/**
	 * Normalized mouse coordinates.
	 */
	public mouse: Vector2 = new Vector2();

	/**
	 * Consider the distance powered to level of the node.
	 */
	public powerDistance: boolean = false;

	/**
	 * Consider the scale of the node when calculating the distance.
	 * 
	 * If distance is not considered threshold values should be absolute distances.
	 */
	public scaleDistance: boolean = true;

	public updateLOD(view: MapView, camera: Camera, renderer: WebGLRenderer, scene: Object3D): void
	{
		const intersects = [];

		for (let t = 0; t < this.subdivisionRays; t++) 
		{
			// Generate random point in viewport
			this.mouse.set(Math.random() * 2 - 1, Math.random() * 2 - 1);

			// Check intersection
			this.raycaster.setFromCamera(this.mouse, camera);

			let myIntersects = [];
			this.raycaster.intersectObjects(view.children, true, myIntersects);
			if (myIntersects.length > 0) 
			{
				// Only use first intersection with the terrain
				intersects.push(myIntersects[0]);
			}
		}

		for (let i = 0; i < intersects.length; i++) 
		{
			const node = intersects[i].object;
			let distance = intersects[i].distance;

			if (this.powerDistance) 
			{
				distance = Math.pow(distance * 2, node.level);
			}

			if (this.scaleDistance) 
			{
				// Get scale from transformation matrix directly
				const matrix = node.matrixWorld.elements;
				const vector = new Vector3(matrix[0], matrix[1], matrix[2]);
				distance = vector.length() / distance;
			}

			if (distance > this.thresholdUp) 
			{
				node.subdivide();
			}
			else if (distance < this.thresholdDown && node.parentNode) 
			{
				node.parentNode.simplify();
			}
		}
	}
}
