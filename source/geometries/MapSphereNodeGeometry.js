/**
 * Map node geometry is a geometry used to represent the spherical map nodes.
 *
 * @class MapSphereNodeGeometry
 * @extends {THREE.BufferGeometry}
 * @param {Number} width Width of the node.
 * @param {Number} height Height of the node.
 * @param {Number} widthSegments Number of subdivisions along the width.
 * @param {Number} heightSegments Number of subdivisions along the height.
 */
function MapSphereNodeGeometry(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength)
{
	THREE.BufferGeometry.call(this);

	var thetaEnd = thetaStart + thetaLength;
	var index = 0;
	var grid = [];
	var vertex = new THREE.Vector3();
	var normal = new THREE.Vector3();

	//Buffers
	var indices = [];
	var vertices = [];
	var normals = [];
	var uvs = [];

	//Generate vertices, normals and uvs
	for(var iy = 0; iy <= heightSegments; iy++)
	{
		var verticesRow = [];
		var v = iy / heightSegments;

		for(var ix = 0; ix <= widthSegments; ix++)
		{
			var u = ix / widthSegments;

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
			var a = grid[iy][ix + 1];
			var b = grid[iy][ix];
			var c = grid[iy + 1][ix];
			var d = grid[iy + 1][ix + 1];

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
	this.addAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
	this.addAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
	this.addAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
}

MapSphereNodeGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);
MapSphereNodeGeometry.prototype.constructor = MapSphereNodeGeometry;
