import {Float32BufferAttribute, BufferGeometry, Vector3} from "three";

/**
 * Map node geometry is a geometry used to represent the spherical map nodes.
 *
 * @class MapSphereNodeGeometry
 * @extends {BufferGeometry}
 * @param {Number} width Width of the node.
 * @param {Number} height Height of the node.
 * @param {Number} widthSegments Number of subdivisions along the width.
 * @param {Number} heightSegments Number of subdivisions along the height.
 */
export class MapSphereNodeGeometry extends BufferGeometry {
	constructor(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)
	{
		super();

		const thetaEnd = thetaStart + thetaLength;
		let index = 0;
		const grid = [];
		const vertex = new Vector3();
		const normal = new Vector3();

		//Buffers
		const indices = [];
		const vertices = [];
		const normals = [];
		const uvs = [];

		//Generate vertices, normals and uvs
		for(var iy = 0; iy <= heightSegments; iy++)
		{
			const verticesRow = [];
			const v = iy / heightSegments;

			for(var ix = 0; ix <= widthSegments; ix++)
			{
				const u = ix / widthSegments;

				//Vertex
				vertex.x = -radius * Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
				vertex.y = radius * Math.cos(thetaStart + v * thetaLength);
				vertex.z = radius * Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);

				vertices.push(vertex.x, vertex.y, vertex.z);

				//Normal
				normal.set(vertex.x, vertex.y, vertex.z).normalize();
				normals.push(normal.x, normal.y, normal.z);

				//UV
				uvs.push(u, 1 - v);
				verticesRow.push(index++);
			}

			grid.push(verticesRow);
		}

		//Indices
		for(var iy = 0; iy < heightSegments; iy++)
		{
			for(var ix = 0; ix < widthSegments; ix++)
			{
				const a = grid[iy][ix + 1];
				const b = grid[iy][ix];
				const c = grid[iy + 1][ix];
				const d = grid[iy + 1][ix + 1];

				if(iy !== 0 || thetaStart > 0)
				{
					indices.push(a, b, d);
				}

				if(iy !== heightSegments - 1 || thetaEnd < Math.PI)
				{
					indices.push(b, c, d);
				}
			}
		}

		this.setIndex(indices);
		this.setAttribute("position", new Float32BufferAttribute(vertices, 3));
		this.setAttribute("normal", new Float32BufferAttribute(normals, 3));
		this.setAttribute("uv", new Float32BufferAttribute(uvs, 2));
	}
}
