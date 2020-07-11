import {Float32BufferAttribute, BufferGeometry} from "three";

/**
 * Map node geometry is a geometry used to represent the map nodes.
 *
 * Consists of a XZ plane with normals facing +Y.
 *
 * @class MapNodeGeometry
 * @extends {BufferGeometry}
 * @param {Number} width Width of the node.
 * @param {Number} height Height of the node.
 * @param {Number} widthSegments Number of subdivisions along the width.
 * @param {Number} heightSegments Number of subdivisions along the height.
 */
export class MapNodeGeometry extends BufferGeometry {
	constructor(width, height, widthSegments, heightSegments) {
		super();

		const widthHalf = width / 2;
		const heightHalf = height / 2;

		const gridX = widthSegments + 1;
		const gridZ = heightSegments + 1;

		const segmentWidth = width / widthSegments;
		const segmentHeight = height / heightSegments;

		//Buffers
		const indices = [];
		const vertices = [];
		const normals = [];
		const uvs = [];

		//Generate vertices, normals and uvs
		for(var iz = 0; iz < gridZ; iz++)
		{
			const z = iz * segmentHeight - heightHalf;

			for(var ix = 0; ix < gridX; ix++)
			{
				const x = ix * segmentWidth - widthHalf;

				vertices.push(x, 0, z);
				normals.push(0, 1, 0);
				uvs.push(ix / widthSegments);
				uvs.push(1 - (iz / heightSegments));
			}
		}

		//Indices
		for(var iz = 0; iz < heightSegments; iz++)
		{
			for(var ix = 0; ix < widthSegments; ix++)
			{
				const a = ix + gridX * iz;
				const b = ix + gridX * (iz + 1);
				const c = (ix + 1) + gridX * (iz + 1);
				const d = (ix + 1) + gridX * iz;

				//faces
				indices.push(a, b, d);
				indices.push(b, c, d);
			}
		}

		this.setIndex(indices);
		this.setAttribute("position", new Float32BufferAttribute(vertices, 3));
		this.setAttribute("normal", new Float32BufferAttribute(normals, 3));
		this.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
	}
}
