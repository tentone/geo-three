/**
 * Map node geometry is a geometry used to represent the map nodes.
 *
 * Consists of a XZ plane with normals facing +Y.
 *
 * @class MapNodeGeometry
 * @extends {THREE.BufferGeometry}
 * @param {Number} width Width of the node.
 * @param {Number} height Height of the node.
 * @param {Number} widthSegments Number of subdivisions along the width.
 * @param {Number} heightSegments Number of subdivisions along the height.
 */
function MapNodeGeometry(width, height, widthSegments, heightSegments)
{
	THREE.BufferGeometry.call(this);

	var widthHalf = width / 2;
	var heightHalf = height / 2;

	var gridX = widthSegments + 1;
	var gridZ = heightSegments + 1;

	var segmentWidth = width / widthSegments;
	var segmentHeight = height / heightSegments;

	//Buffers
	var indices = [];
	var vertices = [];
	var normals = [];
	var uvs = [];

	//Generate vertices, normals and uvs
	for(var iz = 0; iz < gridZ; iz++)
	{
		var z = iz * segmentHeight - heightHalf;

		for(var ix = 0; ix < gridX; ix++)
		{
			var x = ix * segmentWidth - widthHalf;

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
			var a = ix + gridX * iz;
			var b = ix + gridX * (iz + 1);
			var c = (ix + 1) + gridX * (iz + 1);
			var d = (ix + 1) + gridX * iz;

			//faces
			indices.push(a, b, d);
			indices.push(b, c, d);
		}
	}

	this.setIndex(indices);
	this.addAttribute("position", new THREE.Float32BufferAttribute(vertices, 3));
	this.addAttribute("normal", new THREE.Float32BufferAttribute(normals, 3));
	this.addAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
}

MapNodeGeometry.prototype = Object.create(THREE.BufferGeometry.prototype);
MapNodeGeometry.prototype.constructor = MapNodeGeometry;
