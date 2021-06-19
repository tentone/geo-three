import {BufferGeometry, Float32BufferAttribute, Vector3} from 'three';

/**
 * Map node geometry is a geometry used to represent the map nodes.
 *
 * Consists of a XZ plane with normals facing +Y.
 * 
 * The geometry points start in XZ plane that can be manipulated for example for height adjustment.
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
	public constructor(width: number = 1.0, height: number = 1.0, widthSegments: number = 1.0, heightSegments: number = 1.0, skirt: boolean = true, skirtDepth: number = 10.0)
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
				indices.push(a, b, d, b, c, d);
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
				const x = 0 * segmentWidth - widthHalf;

				vertices.push(x, -skirtDepth, z);
				normals.push(0, 1, 0);
				uvs.push(0 / widthSegments, 1 - iz / heightSegments);
			}
			
		}

		/*
		// Count the number of vertices.
		let numberOfVertices = 0;

		// Auxiliar method to build a plane geometry
		const buildPlane = (u: string, v: string, w: string, udir: number, vdir: number, size: Vector3, offset: Vector3, gridX: number, gridY: number): void =>
		{
			const segmentWidth = size.x / gridX;
			const segmentHeight = size.y / gridY;

			const gridX1 = gridX + 1;
			const gridY1 = gridY + 1;

			let vertexCounter = 0;

			const vector = new Vector3();

			// Generate vertices, normals and uvs
			for (let iy = 0; iy < gridY1; iy++)
			{
				const y = iy * segmentHeight - offset.y;

				for (let ix = 0; ix < gridX1; ix++)
				{
					const x = ix * segmentWidth - offset.x;

					// Set values to correct vector component
					vector[u] = x * udir;
					vector[v] = y * vdir;
					vector[w] = offset.z;

					// Now apply vector to vertex buffer
					vertices.push(vector.x, vector.y, vector.z);

					// Set values to correct vector component
					vector[u] = 0;
					vector[v] = 0;
					vector[w] = size.z > 0 ? 1 : - 1;

					// Now apply vector to normal buffer
					normals.push(vector.x, vector.y, vector.z);

					// UVs
					uvs.push(ix / gridX);
					uvs.push(1 - iy / gridY);

					// Counters
					vertexCounter += 1;
				}
			}

			// Three indices to draw a single face, each segment consists of two faces, we generate six (2*3) indices per segment
			for (let iy = 0; iy < gridY; iy ++)
			{
				for (let ix = 0; ix < gridX; ix ++)
				{
					const a = numberOfVertices + ix + gridX1 * iy;
					const b = numberOfVertices + ix + gridX1 * (iy + 1);
					const c = numberOfVertices + (ix + 1) + gridX1 * (iy + 1);
					const d = numberOfVertices + (ix + 1) + gridX1 * iy;

					// Faces
					indices.push(a, b, d);
					indices.push(b, c, d);
				}
			}

			// Update total number of vertices
			numberOfVertices += vertexCounter;
		};

		// Build top plane
		buildPlane('x', 'z', 'y', 1, 1, new Vector3(width, height, skirtDepth), new Vector3(width / 2, height / 2, 0), widthSegments, skirtSegments); // py

		// Generate geometry skirt
		if (skirt)
		{
			buildPlane('z', 'y', 'x', -1, -1, new Vector3(height, skirtDepth, width), new Vector3(height / 2, 0, width / 2), skirtSegments, heightSegments); // px
			buildPlane('z', 'y', 'x', 1, -1, new Vector3(height, skirtDepth, -width), new Vector3(height / 2, 0, -width / 2), skirtSegments, heightSegments); // nx
			buildPlane('x', 'y', 'z', 1, -1, new Vector3(width, skirtDepth, height), new Vector3(width / 2, 0, height / 2), widthSegments, heightSegments); // pz
			buildPlane('x', 'y', 'z', -1, -1, new Vector3(width, skirtDepth, -height), new Vector3(width / 2, 0, -height / 2), widthSegments, heightSegments); // nz
		}
		*/

		this.setIndex(indices);
		this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
		this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
		this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
	}


}
