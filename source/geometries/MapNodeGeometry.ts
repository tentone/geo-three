import {BufferGeometry, Float32BufferAttribute} from 'three';

/**
 * Map node geometry is a geometry used to represent the map nodes.
 *
 * Consists of a XZ plane with normals facing +Y.
 */
export class MapNodeGeometry extends BufferGeometry 
{	
	/**
	 * Map node geometry constructor.
	 * 
	 * @param width - Width of the node.
	 * @param height - Height of the node.
	 * @param widthSegments - Number of subdivisions along the width.
	 * @param heightSegments - Number of subdivisions along the height.
	 */
	public constructor(width: number, height: number, widthSegments: number, heightSegments: number) 
	{
		super();

		const widthHalf = width / 2;
		const heightHalf = height / 2;

		const gridX = widthSegments + 1;
		const gridZ = heightSegments + 1;

		const segmentWidth = width / widthSegments;
		const segmentHeight = height / heightSegments;

		// Buffers
		const indices = [];
		const vertices = [];
		const uvs = [];

		// Generate vertices, normals and uvs
		for (let iz = 0; iz < gridZ; iz++) 
		{
			const z = iz * segmentHeight - heightHalf;

			for (let ix = 0; ix < gridX; ix++) 
			{
				const x = ix * segmentWidth - widthHalf;

				vertices.push(x, 0, z);
				uvs.push(ix / widthSegments);
				uvs.push(1 - iz / heightSegments);
			}
		}

		// Indices
		for (let iz = 0; iz < heightSegments; iz++) 
		{
			for (let ix = 0; ix < widthSegments; ix++) 
			{
				const a = ix + gridX * iz;
				const b = ix + gridX * (iz + 1);
				const c = ix + 1 + gridX * (iz + 1);
				const d = ix + 1 + gridX * iz;

				// faces
				indices.push(a, b, d);
				indices.push(b, c, d);
			}
		}

		this.setIndex(indices);
		this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
		this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
	}
}
