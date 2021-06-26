import {BufferGeometry, Float32BufferAttribute, Vector3} from 'three';

/**
 * Map node geometry is a geometry used to represent the map nodes.
 *
 * Consists of a XZ plane with normals facing +Y.
 * 
 * The geometry points start in XZ plane that can be manipulated for example for height adjustment.
 * 
 * Geometry can also include skirts to mask off missalignments between tiles.
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
	 * @param skirt - Skirt around the plane to mask gaps between tiles.
	 */
	public constructor(width: number = 1.0, height: number = 1.0, widthSegments: number = 1.0, heightSegments: number = 1.0, skirt: boolean = false, skirtDepth: number = 10.0)
	{
		super();

		// Half width X 
		const widthHalf = width / 2;

		// Half width Z
		const heightHalf = height / 2;

		// Size of the grid in X
		const gridX = widthSegments + 1;

		// Size of the grid in Z
		const gridZ = heightSegments + 1;

		// Width of each segment X
		const segmentWidth = width / widthSegments;
		
		// Height of each segment Z
		const segmentHeight = height / heightSegments;

		// Buffers
		const indices = [];
		const vertices = [];
		const normals = [];
		const uvs = [];

		// Generate vertices, normals and uvs
		for (let iz = 0; iz < gridZ; iz++) 
		{
			const z = iz * segmentHeight - heightHalf;

			for (let ix = 0; ix < gridX; ix++) 
			{
				const x = ix * segmentWidth - widthHalf;

				vertices.push(x, 0, z);
				normals.push(0, 1, 0);
				uvs.push(ix / widthSegments, 1 - iz / heightSegments);
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

				// Faces
				indices.push(a, b, d, b, c, d);
			}
		}
		

		// Generate the skirt
		if (skirt)
		{
			let start = vertices.length / 3;

			// Down X
			for (let ix = 0; ix < gridX; ix++) 
			{
				const x = ix * segmentWidth - widthHalf;
				const z = -heightHalf;

				vertices.push(x, -skirtDepth, z);
				normals.push(0, 1, 0);
				uvs.push(ix / widthSegments, 1);
			}

			// Indices
			for (let ix = 0; ix < widthSegments; ix++) 
			{
				const a = ix;
				const d = ix + 1;
				const b = ix + start;
				const c = ix + start + 1;
				indices.push(d, b, a, d, c, b);
			}

			start = vertices.length / 3;

			// Up X
			for (let ix = 0; ix < gridX; ix++) 
			{
				const x = ix * segmentWidth - widthHalf;
				const z = heightSegments * segmentHeight - heightHalf;

				vertices.push(x, -skirtDepth, z);
				normals.push(0, 1, 0);
				uvs.push(ix / widthSegments, 0);
			}
			
			// Index of the beginning of the last X row
			let offset = gridX * gridZ - widthSegments - 1; 

			for (let ix = 0; ix < widthSegments; ix++) 
			{
				const a = offset + ix;
				const d = offset + ix + 1;
				const b = ix + start;
				const c = ix + start + 1;
				indices.push(a, b, d, b, c, d);
			}

			start = vertices.length / 3;

			// Down Z
			for (let iz = 0; iz < gridZ; iz++) 
			{
				const z = iz * segmentHeight - heightHalf;
				const x = - widthHalf;

				vertices.push(x, -skirtDepth, z);
				normals.push(0, 1, 0);
				uvs.push(0, 1 - iz / heightSegments);
			}

			for (let iz = 0; iz < heightSegments; iz++) 
			{
				const a = iz * gridZ;
				const d = (iz + 1) * gridZ;
				const b = iz + start;
				const c = iz + start + 1;

				indices.push(a, b, d, b, c, d);
			}

			start = vertices.length / 3;

			// Up Z
			for (let iz = 0; iz < gridZ; iz++) 
			{
				const z = iz * segmentHeight - heightHalf;
				const x = widthSegments * segmentWidth - widthHalf;

				vertices.push(x, -skirtDepth, z);
				normals.push(0, 1, 0);

				uvs.push(1.0, 1 - iz / heightSegments);
			}

			for (let iz = 0; iz < heightSegments; iz++) 
			{
				const a = iz * gridZ + heightSegments;
				const d = (iz + 1) * gridZ + heightSegments;
				const b = iz + start;
				const c = iz + start + 1;
				
				indices.push(d, b, a, d, c, b);
			}
		}

		this.setIndex(indices);
		this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
		this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
		this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
	}


}
