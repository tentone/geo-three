import {BufferGeometry, Float32BufferAttribute, Vector3} from 'three';

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
	 * @param skirt - Skirt around the plane to mask gaps between tiles.
	 */
	public constructor(width: number, height: number, widthSegments: number = 1.0, heightSegments: number = 1.0, skirt: boolean = false) 
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


		// Generate geometry skirt
		if (skirt)
		{
			// TODO <ADD CODE HERE>
		}


		let numberOfVertices = 0;
		let groupStart = 0;

		// Auxiliar method to build a plane geometry
		const buildPlane = (u: string, v: string, w: string, udir: number, vdir: number, width: number, height: number, depth: number, gridX: number, gridY: number, materialIndex: number): void =>
		{
			const segmentWidth = width / gridX;
			const segmentHeight = height / gridY;

			const widthHalf = width / 2;
			const heightHalf = height / 2;
			const depthHalf = depth / 2;

			const gridX1 = gridX + 1;
			const gridY1 = gridY + 1;

			let vertexCounter = 0;
			let groupCount = 0;

			const vector = new Vector3();

			// Generate vertices, normals and uvs
			for (let iy = 0; iy < gridY1; iy++) 
			{
				const y = iy * segmentHeight - heightHalf;

				for (let ix = 0; ix < gridX1; ix++) 
				{
					const x = ix * segmentWidth - widthHalf;

					// Set values to correct vector component
					vector[u] = x * udir;
					vector[v] = y * vdir;
					vector[w] = depthHalf;

					// Now apply vector to vertex buffer
					vertices.push(vector.x, vector.y, vector.z);

					// Set values to correct vector component
					vector[u] = 0;
					vector[v] = 0;
					vector[w] = depth > 0 ? 1 : - 1;

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

					groupCount += 6;
				}
			}

			// Add a group to the geometry. this will ensure multi material support
			this.addGroup(groupStart, groupCount, materialIndex);

			// Calculate new start value for groups
			groupStart += groupCount;

			// Update total number of vertices
			numberOfVertices += vertexCounter;
		};

		this.setIndex(indices);
		this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
		this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
		this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
	}

	
}
