import {BufferGeometry, Float32BufferAttribute, Vector3} from 'three';
import {MapNodeGeometry} from './MapNodeGeometry';

export class MapNodeHeightGeometry extends BufferGeometry
{
	/**
	 * Map node geometry constructor.
	 *
	 * @param width - Width of the node.
	 * @param height - Height of the node.
	 * @param widthSegments - Number of subdivisions along the width.
	 * @param heightSegments - Number of subdivisions along the height.
	 * @param skirt - Skirt around the plane to mask gaps between tiles.
	 */
	public constructor(width: number = 1.0, height: number = 1.0, widthSegments: number = 1.0, heightSegments: number = 1.0, skirt: boolean = false, skirtDepth: number = 10.0)
	{
		super();

		// Buffers
		const indices = [];
		const vertices = [];
		const normals = [];
		const uvs = [];

		// Build plane
		MapNodeGeometry.buildPlane(width, height, widthSegments, heightSegments, indices, vertices, normals, uvs);

		// TODO <CALCULATE NORMALS>

		// Generate the skirt
		if (skirt)
		{
			MapNodeGeometry.buildSkirt(width, height, widthSegments, heightSegments, skirtDepth, indices, vertices, normals, uvs);
		}

		this.setIndex(indices);
		this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
		this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
		this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
	}
}