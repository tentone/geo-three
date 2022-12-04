
/**
 * Martini mesh tile generator (Mapbox's Awesome Right-Triangulated Irregular Networks, Improved).
 * 
 * Represents a height map tile node using the RTIN method from the paper "Right Triangulated Irregular Networks".
 * 
 * Based off the library https://github.com/mapbox/martini.
 */
export class Martini 
{
	/**
	 * Size of the grid to be generated.
	 */
	public gridSize: number;

	/**
	 * Number of triangles to be used in the tile.
	 */
	public numTriangles: number;

	/**
	 * Number of triangles in the parent node.
	 */
	public numParentTriangles: number;

	/**
	 * Indices of the triangles faces.
	 */
	public indices: Uint32Array;

	/**
	 * Coordinates of the points composing the mesh.
	 */
	public coords: Uint16Array;

	/**
	 * Constructor for the generator.
	 * 
	 * @param gridSize - Size of the grid.
	 */
	public constructor(gridSize: number = 257) 
	{
		this.gridSize = gridSize;
		const tileSize = gridSize - 1;
		
		if (tileSize & tileSize - 1) 
		{
			throw new Error(`Expected grid size to be 2^n+1, got ${gridSize}.`);
		}

		this.numTriangles = tileSize * tileSize * 2 - 2;
		this.numParentTriangles = this.numTriangles - tileSize * tileSize;

		this.indices = new Uint32Array(this.gridSize * this.gridSize);

		// coordinates for all possible triangles in an RTIN tile
		this.coords = new Uint16Array(this.numTriangles * 4);

		// get triangle coordinates from its index in an implicit binary tree
		for (let i = 0; i < this.numTriangles; i++) 
		{
			let id = i + 2;
			let ax = 0, ay = 0, bx = 0, by = 0, cx = 0, cy = 0;
			if (id & 1) 
			{
				bx = by = cx = tileSize; // bottom-left triangle
			}
			else 
			{
				ax = ay = cy = tileSize; // top-right triangle
			}
			while ((id >>= 1) > 1) 
			{
				const mx = ax + bx >> 1;
				const my = ay + by >> 1;

				if (id & 1) 
				{ // left half
					bx = ax; by = ay;
					ax = cx; ay = cy;
				}
				else 
				{ // right half
					ax = bx; ay = by;
					bx = cx; by = cy;
				}
				cx = mx; cy = my;
			}
			const k = i * 4;
			this.coords[k + 0] = ax;
			this.coords[k + 1] = ay;
			this.coords[k + 2] = bx;
			this.coords[k + 3] = by;
		}
	}

	public createTile(terrain): Tile
	{
		return new Tile(terrain, this);
	}
}

/**
 * Class describes the generation of a tile using the Martini method.
 */
class Tile 
{
	/**
	 * Pointer to the martini generator object.
	 */
	public martini: Martini;

	/**
	 * Terrain to generate the tile for.
	 */
	public terrain: Float32Array;

	/**
	 * Errors detected while creating the tile.
	 */
	public errors: Float32Array;

	public constructor(terrain: Float32Array, martini: Martini) 
	{
		const size = martini.gridSize;

		if (terrain.length !== size * size) 
		{
			throw new Error(`Expected terrain data of length ${size * size} (${size} x ${size}), got ${terrain.length}.`);
		}

		this.terrain = terrain;
		this.martini = martini;
		this.errors = new Float32Array(terrain.length);
		this.update();
	}

	public update(): void
	{
		const {numTriangles, numParentTriangles, coords, gridSize: size} = this.martini;
		const {terrain, errors} = this;

		// iterate over all possible triangles, starting from the smallest level
		for (let i = numTriangles - 1; i >= 0; i--) 
		{
			const k = i * 4;
			const ax = coords[k + 0];
			const ay = coords[k + 1];
			const bx = coords[k + 2];
			const by = coords[k + 3];
			const mx = ax + bx >> 1;
			const my = ay + by >> 1;
			const cx = mx + my - ay;
			const cy = my + ax - mx;

			// calculate error in the middle of the long edge of the triangle
			const interpolatedHeight = (terrain[ay * size + ax] + terrain[by * size + bx]) / 2;
			const middleIndex = my * size + mx;
			const middleError = Math.abs(interpolatedHeight - terrain[middleIndex]);

			errors[middleIndex] = Math.max(errors[middleIndex], middleError);

			if (i < numParentTriangles) 
			{ // bigger triangles; accumulate error with children
				const leftChildIndex = (ay + cy >> 1) * size + (ax + cx >> 1);
				const rightChildIndex = (by + cy >> 1) * size + (bx + cx >> 1);
				errors[middleIndex] = Math.max(errors[middleIndex], errors[leftChildIndex], errors[rightChildIndex]);
			}
		}
	}

	public getMesh(maxError: number = 0, withSkirts: boolean = false): {vertices: any, triangles: any, numVerticesWithoutSkirts: number} 
	{
		const {gridSize: size, indices} = this.martini;
		const {errors} = this;
		let numVertices = 0;
		let numTriangles = 0;
		const max = size - 1;
		let aIndex, bIndex, cIndex = 0;

		// Skirt indices
		const leftSkirtIndices = [];
		const rightSkirtIndices = [];
		const bottomSkirtIndices = [];
		const topSkirtIndices = [];

		// Use an index grid to keep track of vertices that were already used to avoid duplication
		indices.fill(0);

		// Retrieve mesh in two stages that both traverse the error map:
		// - countElements: find used vertices (and assign each an index), and count triangles (for minimum allocation)
		// - processTriangle: fill the allocated vertices & triangles typed arrays
		function countElements(ax: number, ay: number, bx: number, by: number, cx: number, cy: number): void
		{
			const mx = ax + bx >> 1;
			const my = ay + by >> 1;

			if (Math.abs(ax - cx) + Math.abs(ay - cy) > 1 && errors[my * size + mx] > maxError) 
			{
				countElements(cx, cy, ax, ay, mx, my);
				countElements(bx, by, cx, cy, mx, my);
			}
			else 
			{
				aIndex = ay * size + ax;
				bIndex = by * size + bx;
				cIndex = cy * size + cx;

				if (indices[aIndex] === 0) 
				{
					if (withSkirts) 
					{
						if (ax === 0) 
						{
							leftSkirtIndices.push(numVertices);
						}
						else if (ax === max)
						{
							rightSkirtIndices.push(numVertices);
						} if (ay === 0) 
						{
							bottomSkirtIndices.push(numVertices);
						}
						else if (ay === max) 
						{
							topSkirtIndices.push(numVertices);
						}
					}
                    
					indices[aIndex] = ++numVertices;
				}
				if (indices[bIndex] === 0) 
				{
					if (withSkirts) 
					{
						if (bx === 0) 
						{
							leftSkirtIndices.push(numVertices);
						}
						else if (bx === max) 
						{
							rightSkirtIndices.push(numVertices);
						} if (by === 0) 
						{
							bottomSkirtIndices.push(numVertices);
						}
						else if (by === max) 
						{
							topSkirtIndices.push(numVertices);
						}
					}
					indices[bIndex] = ++numVertices;
				}
				if (indices[cIndex] === 0) 
				{
					if (withSkirts) 
					{
						if (cx === 0) 
						{
							leftSkirtIndices.push(numVertices);
						}
						else if (cx === max) 
						{
							rightSkirtIndices.push(numVertices);
						} if (cy === 0) 
						{
							bottomSkirtIndices.push(numVertices);
						}
						else if (cy === max) 
						{
							topSkirtIndices.push(numVertices);
						}
					}
					indices[cIndex] = ++numVertices;
				}
				numTriangles++;
			}
		}

		countElements(0, 0, max, max, max, 0);
		countElements(max, max, 0, 0, 0, max);

		let numTotalVertices =numVertices * 2;
		let numTotalTriangles = numTriangles * 3;

		if (withSkirts) 
		{
			numTotalVertices +=(leftSkirtIndices.length + rightSkirtIndices.length + bottomSkirtIndices.length + topSkirtIndices.length) * 2;
			numTotalTriangles += ((leftSkirtIndices.length - 1) * 2 + (rightSkirtIndices.length - 1) * 2 + (bottomSkirtIndices.length - 1) * 2 + (topSkirtIndices.length - 1) * 2) * 3;
		}

		const vertices = new Uint16Array(numTotalVertices);
		const triangles = new Uint32Array(numTotalTriangles);

		let triIndex = 0;

		function processTriangle(ax: number, ay: number, bx: number, by: number, cx: number, cy: number): void
		{
			const mx = ax + bx >> 1;
			const my = ay + by >> 1;

			if (Math.abs(ax - cx) + Math.abs(ay - cy) > 1 && errors[my * size + mx] > maxError) 
			{
				// Triangle doesn't approximate the surface well enough; drill down further
				processTriangle(cx, cy, ax, ay, mx, my);
				processTriangle(bx, by, cx, cy, mx, my);

			}
			else 
			{
				// Add a triangle
				const a = indices[ay * size + ax] - 1;
				const b = indices[by * size + bx] - 1;
				const c = indices[cy * size + cx] - 1;

				vertices[2 * a] = ax;
				vertices[2 * a + 1] = ay;

				vertices[2 * b] = bx;
				vertices[2 * b + 1] = by;

				vertices[2 * c] = cx;
				vertices[2 * c + 1] = cy;
				triangles[triIndex++] = a;
				triangles[triIndex++] = b;
				triangles[triIndex++] = c;
			}
		}

		processTriangle(0, 0, max, max, max, 0);
		processTriangle(max, max, 0, 0, 0, max);

		if (withSkirts) 
		{
			// Sort skirt indices to create adjacent triangles
			leftSkirtIndices.sort((a, b) => {return vertices[2 * a + 1] - vertices[2 * b + 1];});

			// Reverse (b - a) to match triangle winding
			rightSkirtIndices.sort((a, b) => {return vertices[2 * b + 1] - vertices[2 * a + 1];});

			bottomSkirtIndices.sort((a, b) => {return vertices[2 * b] - vertices[2 * a];});

			// Reverse (b - a) to match triangle winding
			topSkirtIndices.sort((a, b) => {return vertices[2 * a] - vertices[2 * b];});

			let skirtIndex = numVertices * 2;

			// Add skirt vertices from index of last mesh vertex
			function constructSkirt(skirt: number[]): void
			{
				const skirtLength = skirt.length;

				// Loop through indices in groups of two to generate triangles
				for (let i = 0; i < skirtLength - 1; i++) 
				{
					const currIndex = skirt[i];
					const nextIndex = skirt[i + 1];
					const currentSkirt = skirtIndex / 2;
					const nextSkirt = (skirtIndex + 2) / 2;

					vertices[skirtIndex++] = vertices[2 * currIndex];
					vertices[skirtIndex++] = vertices[2 * currIndex + 1];

					triangles[triIndex++] = currIndex;
					triangles[triIndex++] = currentSkirt;
					triangles[triIndex++] = nextIndex;

					triangles[triIndex++] = currentSkirt;
					triangles[triIndex++] = nextSkirt;
					triangles[triIndex++] = nextIndex;
				}

				// Add vertices of last skirt not added above (i < skirtLength - 1)
				vertices[skirtIndex++] = vertices[2 * skirt[skirtLength - 1]];
				vertices[skirtIndex++] = vertices[2 * skirt[skirtLength - 1] + 1];
			}

			constructSkirt(leftSkirtIndices);
			constructSkirt(rightSkirtIndices);
			constructSkirt(bottomSkirtIndices);
			constructSkirt(topSkirtIndices);
		}

		// Return vertices and triangles and index into vertices array where skirts start
		return {vertices: vertices, triangles: triangles, numVerticesWithoutSkirts: numVertices};
	}
}
