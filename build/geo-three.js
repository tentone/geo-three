(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('three')) :
	typeof define === 'function' && define.amd ? define(['exports', 'three'], factory) :
	(global = global || self, factory(global.Geo = {}, global.three));
}(this, (function (exports, three) { 'use strict';

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
	class MapSphereNodeGeometry extends three.BufferGeometry {
		constructor(
			radius,
			widthSegments,
			heightSegments,
			phiStart,
			phiLength,
			thetaStart,
			thetaLength
		) {
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
			this.addAttribute("position", new three.Float32BufferAttribute(vertices, 3));
			this.addAttribute("normal", new three.Float32BufferAttribute(normals, 3));
			this.addAttribute("uv", new three.Float32BufferAttribute(uvs, 2));
		}
	}

	/**
	 * A map provider is a object that handles the access to map tiles of a specific service.
	 *
	 * They contain the access configuration and are responsible for handling the map theme size etc.
	 *
	 * MapProvider should be used as a base for all the providers.
	 *
	 * @class MapProvider
	 */
	class MapProvider {
		constructor() {
			/** 
			* Name of the map provider
			*
			* @attribute name
			* @type {String}
			*/
			this.name = "";
			
			/**
			* Minimum tile level.
			* 
			* @attribute minZoom
			* @type {Number}
			*/
			this.minZoom = 0;

			/**
			* Maximum tile level.
			* 
			* @attribute maxZoom
			* @type {Number}
			*/
			this.maxZoom = 20;

			/**
			* Map bounds.
			*
			* @attribute bounds
			* @type {Array}
			*/
			this.bounds = [];

			/**
			* Map center point.
			*
			* @attribute center
			* @type {Array}
			*/
			this.center = [];
		}

		/**
		* Get a tile for the x, y, configuration provided.
		*
		* @method fetchTile
		* @param {Number} zoom Zoom level.
		* @param {Number} x Tile x.
		* @param {Number} y Tile y.
		*/
		fetchTile(zoom, x, y) {}

		/**
		* Get map meta data from server if supported.
		*
		* Usually map server have a method to retrieve TileJSON metadata.
		* 
		* @method getMetaData
		*/
		getMetaData() {}
	}

	/**
	 * Open street maps tile server.
	 *
	 * Works with any service that uses a address/zoom/x/y.format URL for tile access.
	 *
	 * @class OpenStreetMapsProvider
	 */
	class OpenStreetMapsProvider extends MapProvider {
		constructor(address) {
			super();

			/**
			* Map server address.
			*
			* By default the open OSM tile server is used.
			* 
			* @attribute address
			* @type {String}
			*/
			this.address = address !== undefined ? address : "https://a.tile.openstreetmap.org/";

			/**
			* Map image tile format.
			* 
			* @attribute format
			* @type {String}
			*/
			this.format = "png";
		}

		fetchTile(zoom, x, y) {
			return this.address + "/" + zoom + "/" + x + "/" + y + "." + this.format;
		}
	}

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
	class MapNodeGeometry extends three.BufferGeometry {
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
			this.addAttribute("position", new three.Float32BufferAttribute(vertices, 3));
			this.addAttribute("normal", new three.Float32BufferAttribute(normals, 3));
			this.addAttribute("uv", new three.Float32BufferAttribute(uvs, 2));
		}
	}

	/** 
	 * Represents a map tile node.
	 * 
	 * A map node can be subdivided into other nodes (Quadtree).
	 * 
	 * The height node is designed to use MapBox elevation data.
	 *  - https://www.mapbox.com/help/access-elevation-data/
	 *
	 * @class MapHeightNode
	 */
	class MapHeightNode extends three.Mesh {
		constructor(parentNode, mapView, location, level, x, y) {
			const material = new three.MeshPhongMaterial(
			{
				color: 0x000000,
				specular: 0x000000,
				shininess: 0,
				wireframe: false,
				emissive: 0xFFFFFF
			});

			super(MapHeightNode.GEOMETRY, material);
			MapNode.call(this, parentNode, mapView, location, level, x, y);

			this.matrixAutoUpdate = false;
			this.isMesh = true;

			/**
			 * Cache with the children objects created from subdivision.
			 * 
			 * Used to avoid recreate object after simplification and subdivision.
			 * 
			 * The default value is null.
			 *
			 * @attribute childrenCache
			 * @type {Array}
			 */
			this.childrenCache = null;

			this.loadTexture();
		}

		/**
		 * Load tile texture from the server.
		 * 
		 * Aditionally in this height node it loads elevation data from the height provider and generate the appropiate maps.
		 *
		 * @method loadTexture
		 */
		loadTexture() {
			const texture = new three.Texture();
			texture.generateMipmaps = false;
			texture.format = three.RGBFormat;
			texture.magFilter = three.LinearFilter;
			texture.minFilter = three.LinearFilter;
			texture.needsUpdate = false;

			this.material.emissiveMap = texture;

			const loader = new three.ImageLoader();
			loader.setCrossOrigin("anonymous");
			loader.load(this.mapView.fetchTile(this.level, this.x, this.y), function(image)
			{
				texture.image = image;
				texture.needsUpdate = true;
			});

			if(MapHeightNode.USE_DISPLACEMENT)
			{
				this.loadHeightDisplacement();
			}
			else
			{
				this.loadHeightGeometry();
			}
		}

		/** 
		 * Load height texture from the server and create a geometry to match it.
		 *
		 + @method loadHeightGeometry
		 */
		loadHeightGeometry() {
			const self = this;
			
			const geometry = new MapNodeGeometry(1, 1, MapHeightNode.GEOMETRY_SIZE, MapHeightNode.GEOMETRY_SIZE);
			const vertices = geometry.attributes.position.array;
			const itemSize = geometry.attributes.position.itemSize;

			const image = document.createElement("img");
			image.src = this.mapView.heightProvider.fetchTile(this.level, this.x, this.y);
			image.crossOrigin = "Anonymous";
			image.onload = function()
			{
				const canvas = document.createElement("canvas");
				canvas.width = MapHeightNode.GEOMETRY_SIZE + 1;
				canvas.height = MapHeightNode.GEOMETRY_SIZE + 1;

				const context = canvas.getContext("2d");
				context.imageSmoothingEnabled = false;
				context.drawImage(image, 0, 0, MapHeightNode.TILE_SIZE, MapHeightNode.TILE_SIZE, 0, 0, canvas.width, canvas.height);
				
				const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
				const data = imageData.data;
				for(let i = 0, j = 0; i < data.length && j < vertices.length; i += 4, j += 3)
				{
					const r = data[i];
					const g = data[i + 1];
					const b = data[i + 2];

					//The value will be composed of the bits RGB
					const value = (((r * 65536 + g * 256 + b) * 0.1) - 1e4);

					vertices[j + 1] = value;
				}

				self.geometry = geometry;
				self.nodeReady();
			};
		}

		/** 
		 * Load height texture from the server and create a displacement map from it.
		 *
		 + @method loadHeightDisplacement
		 */
		loadHeightDisplacement() {
			const self = this;
			const material = this.material;

			const image = document.createElement("img");
			image.src = this.mapView.heightProvider.fetchTile(this.level, this.x, this.y);
			image.crossOrigin = "Anonymous";
			image.onload = function()
			{
				const canvas = document.createElement("canvas");
				canvas.width = MapHeightNode.GEOMETRY_SIZE;
				canvas.height = MapHeightNode.GEOMETRY_SIZE;

				const context = canvas.getContext("2d");
				context.imageSmoothingEnabled = false;
				context.drawImage(image, 0, 0, MapHeightNode.TILE_SIZE, MapHeightNode.TILE_SIZE, 0, 0, canvas.width, canvas.height);
				
				const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
				const data = imageData.data;

				for(let i = 0; i < data.length; i += 4)
				{
					const r = data[i];
					const g = data[i + 1];
					const b = data[i + 2];

					//The value will be composed of the bits RGB
					let value = (((r * 65536 + g * 256 + b) * 0.1) - 1e4) / MapHeightNode.HEIGHT_DAMPENING;

					//Limit value to fit 1 byte
					if(value < 0)
					{
						value = 0;
					}
					else if(value > 255)
					{
						value = 255;
					}

					data[i] = value;
					data[i + 1] = value;
					data[i + 2] = value;
				}

				context.putImageData(imageData, 0, 0);

				const displacement = new CanvasTexture(canvas);
				displacement.generateMipmaps = false;
				displacement.format = three.RGBFormat;
				displacement.magFilter = three.LinearFilter;
				displacement.minFilter = three.LinearFilter;

				material.displacementMap = displacement;
				material.displacementScale = 1.0;
				material.displacementBias = 0.0;
				material.needsUpdate = true;

				self.nodeReady();
			};
		}

		createChildNodes() {
			const level = this.level + 1;

			const x = this.x * 2;
			const y = this.y * 2;

			var node = new MapHeightNode(this, this.mapView, MapNode.TOP_LEFT, level, x, y);
			node.scale.set(0.5, 1, 0.5);
			node.position.set(-0.25, 0, -0.25);
			this.add(node);
			node.updateMatrix();
			node.updateMatrixWorld(true);

			var node = new MapHeightNode(this, this.mapView, MapNode.TOP_RIGHT, level, x + 1, y);
			node.scale.set(0.5, 1, 0.5);
			node.position.set(0.25, 0, -0.25);
			this.add(node);
			node.updateMatrix();
			node.updateMatrixWorld(true);

			var node = new MapHeightNode(this, this.mapView, MapNode.BOTTOM_LEFT, level, x, y + 1);
			node.scale.set(0.5, 1, 0.5);
			node.position.set(-0.25, 0, 0.25);
			this.add(node);
			node.updateMatrix();
			node.updateMatrixWorld(true);

			var node = new MapHeightNode(this, this.mapView, MapNode.BOTTOM_RIGHT, level, x + 1, y + 1);
			node.scale.set(0.5, 1, 0.5);
			node.position.set(0.25, 0, 0.25);
			this.add(node);
			node.updateMatrix();
			node.updateMatrixWorld(true);
		}

		/**
		 * Overrides normal raycasting, to avoid raycasting when isMesh is set to false.
		 * 
		 * @method raycast
		 */
		raycast(raycaster, intersects) {
			if(this.isMesh === true)
			{
				return three.Mesh.prototype.raycast.call(this, raycaster, intersects);
			}

			return false;
		}
	}

	Object.assign(MapHeightNode.prototype, MapNode.prototype);

	/**
	 * If true a displacement map is used for surface deformation.
	 *
	 * @static
	 * @attribute USE_DISPLACEMENT
	 * @type {Boolean}
	 */
	MapHeightNode.USE_DISPLACEMENT = false;

	/**
	 * Max world height allowed.
	 *
	 * Applied when USE_DISPLACEMENT set to true to concatenate value to 8 bit range.
	 *
	 * @static
	 * @attribute MAX_HEIGHT
	 * @type {Number}
	 */
	MapHeightNode.MAX_HEIGHT = 2e3;

	/**
	 * Dampening factor applied to the height retrieved from the server.
	 *
	 * Applied when USE_DISPLACEMENT set to true to concatenate value to 8 bit range.
	 *
	 * @static
	 * @attribute HEIGHT_DAMPENING
	 * @type {Number}
	 */
	MapHeightNode.HEIGHT_DAMPENING = 10.0;

	/**
	 * Original tile size of the images retrieved from the height provider.
	 *
	 * @static
	 * @attribute TILE_SIZE
	 * @type {Number}
	 */
	MapHeightNode.TILE_SIZE = 256;

	/**
	 * Size of the grid of the geometry displayed on the scene for each tile.
	 *
	 * @static
	 * @attribute GEOMETRY_SIZE
	 * @type {Number}
	 */
	MapHeightNode.GEOMETRY_SIZE = 16;

	/**
	 * Map node plane geometry.
	 *
	 * @static
	 * @attribute GEOMETRY
	 * @type {PlaneBufferGeometry}
	 */
	MapHeightNode.GEOMETRY = new MapNodeGeometry(1, 1, MapHeightNode.GEOMETRY_SIZE, MapHeightNode.GEOMETRY_SIZE);

	/** 
	 * Represents a map tile node inside of the quadtree
	 * 
	 * A map node can be subdivided into other nodes (Quadtree).
	 * 
	 * It is intended to be used as a base class for other map node implementations.
	 * 
	 * @class MapNode
	 */
	class MapNode$1 {
		constructor(parentNode, mapView, location, level, x, y) {
			/**
			 * The map view.
			 *
			 * @attribute mapView
			 * @type {MapView}
			 */
			this.mapView = mapView;

			/**
			 * Parent node (from an upper tile level).
			 * 
			 * @attribute parentNode
			 * @type {MapPlaneNode}
			 */
			this.parentNode = parentNode;

			/**
			 * Index of the map node in the quad-tree parent node.
			 *
			 * Position in the tree parent, can be TOP_LEFT, TOP_RIGHT, BOTTOM_LEFT or BOTTOM_RIGHT.
			 *
			 * @attribute location
			 * @type {Number}
			 */
			this.location = location;

			/**
			 * Tile level of this node.
			 * 
			 * @attribute level
			 * @type {Number}
			 */
			this.level = level;

			/**
			 * Tile x position.
			 * 
			 * @attribute x
			 * @type {Number}
			 */
			this.x = x;

			/**
			 * Tile y position.
			 * 
			 * @attribute y
			 * @type {Number}
			 */
			this.y = y;

			/**
			 * Indicates how many children nodes where loaded.
			 *
			 * @attribute nodesLoaded
			 * @type {Number}
			 */
			this.nodesLoaded = 0;

			/** 
			 * Variable to check if the node is subdivided.
			 *
			 * To avoid bad visibility changes on node load.
			 *
			 * @attribute subdivided
			 * @type {Boolean}
			 */
			this.subdivided = false;
	 	}

		/**
		 * Create the child nodes to represent the next tree level.
		 *
		 * These nodes should be added to the object, and their transformations matrix should be updated.
		 *
		 * @method createChildNodes 
		 */
		createChildNodes() {}

		/**
		 * Subdivide node,check the maximum depth allowed for the tile provider.
		 *
		 * Uses the createChildNodes to actually create the child nodes that represent the next tree level.
		 * 
		 * @method subdivide
		 */
		subdivide() {
			if(this.children.length > 0 || this.level + 1 > this.mapView.provider.maxZoom)
			{
				return;
			}

			this.subdivided = true;

			if(this.childrenCache !== null)
			{
				this.isMesh = false;
				this.children = this.childrenCache;
			}
			else
			{
				this.createChildNodes();
			}
		}

		/**
		 * Simplify node, remove all children from node, store them in cache.
		 *
		 * Reset the subdivided flag and restore the visibility.
		 *
		 * This base method assumes that the node implementation is based off THREE.Mesh and that the isMesh property is used to toggle visibility.
		 *
		 * @method simplify
		 */
		simplify() {
			if(this.children.length > 0)
			{
				this.childrenCache = this.children;
			}

			this.subdivided = false;
			this.isMesh = true;
			this.children = [];
		}

	 /**
	  * Get a neighbor in a specific direction.
	  *
	  * @method getNeighbor
	  * @param {Number} direction
	  * @return {MapNode} The neighbor node if found, null otherwise.
	  */
	 getNeighbor(direction) {
		 //TODO <ADD CODE HERE>

		 return null;
	 }

	 /**
	  * Get the quad tree neighbors (left, right, top, down) in an array.
	  *
	  * @method getNeighbors
	  * @return {Array} The neighbors array, not found neighbors will be returned null.
	  */
	 getNeighbors() {
		 const neighbors = [];

		 //TODO <ADD CODE HERE>

		 return neighbors;
	 }

	 /**
	  * Load tile texture from the server.
	  * 
	  * This base method assumes the existence of a material attribute with a map texture.
	  *
	  * @method loadTexture
	  * @param {Function} onLoad 
	  */
	 loadTexture(onLoad) {
		 const texture = new three.Texture();
		 texture.generateMipmaps = false;
		 texture.format = three.RGBFormat;
		 texture.magFilter = three.LinearFilter;
		 texture.minFilter = three.LinearFilter;
		 texture.needsUpdate = false;
		 
		 this.material.map = texture;

		 const self = this;
		 const loader = new three.ImageLoader();
		 loader.setCrossOrigin("anonymous");
		 loader.load(this.mapView.fetchTile(this.level, this.x, this.y), function(image)
		 {
			 texture.image = image;
			 texture.needsUpdate = true;
			 self.nodeReady();
		 });
	 }

	 /** 
	  * Increment the child loaded counter.
	  *
	  * Should be called after a map node is ready for display.
	  *
	  * @method nodeReady
	  */
	 nodeReady() {
		 //Update parent nodes loaded
		 if(this.parentNode !== null)
		 {
			 this.parentNode.nodesLoaded++;

			 if(this.parentNode.nodesLoaded >= MapNode$1.CHILDRENS)
			 {
				 if(this.parentNode.subdivided === true)
				 {
					 this.parentNode.isMesh = false;
				 }

				 for(let i = 0; i < this.parentNode.children.length; i++)
				 {
					 this.parentNode.children[i].visible = true;
				 }
			 }
		 }
		 //If its the root object just set visible
		 else
		 {
			 this.visible = true;
		 }
	 }
	}

	/**
	 * How many children each branch of the tree has.
	 *
	 * For a quad-tree this value is 4.
	 *
	 * @static
	 * @attribute CHILDRENS
	 * @type {Number}
	 */
	MapNode$1.CHILDRENS = 4;

	/**
	 * Root node has no location.
	 *
	 * @static
	 * @attribute ROOT
	 * @type {Number}
	 */
	MapNode$1.ROOT = -1;

	/**
	 * Index of top left quad-tree branch node.
	 *
	 * Can be used to navigate the children array looking for neighbors.
	 *
	 * @static
	 * @attribute TOP_LEFT
	 * @type {Number}
	 */
	MapNode$1.TOP_LEFT = 0;

	/**
	 * Index of top left quad-tree branch node.
	 *
	 * Can be used to navigate the children array looking for neighbors.
	 *
	 * @static
	 * @attribute TOP_RIGHT
	 * @type {Number}
	 */
	MapNode$1.TOP_RIGHT = 1;

	/**
	 * Index of top left quad-tree branch node.
	 *
	 * Can be used to navigate the children array looking for neighbors.
	 *
	 * @static
	 * @attribute BOTTOM_LEFT
	 * @type {Number}
	 */
	MapNode$1.BOTTOM_LEFT = 2;

	/**
	 * Index of top left quad-tree branch node.
	 *
	 * Can be used to navigate the children array looking for neighbors.
	 *
	 * @static
	 * @attribute BOTTOM_RIGHT
	 * @type {Number}
	 */
	MapNode$1.BOTTOM_RIGHT = 3;

	/** 
	 * Represents a map tile node.
	 * 
	 * A map node can be subdivided into other nodes (Quadtree).
	 * 
	 * @class MapPlaneNode
	 */
	class MapPlaneNode extends three.Mesh {
		constructor(parentNode, mapView, location, level, x, y) {
			super(MapPlaneNode.GEOMETRY, new three.MeshBasicMaterial({wireframe: false}));
			MapNode$1.call(this, parentNode, mapView, location, level, x, y);

			this.matrixAutoUpdate = false;
			this.isMesh = true;
			this.visible = false;

			/**
			 * Cache with the children objects created from subdivision.
			 * 
			 * Used to avoid recreate object after simplification and subdivision.
			 * 
			 * The default value is null.
			 *
			 * @attribute childrenCache
			 * @type {Array}
			 */
			this.childrenCache = null;
			
			this.loadTexture();
		}

		createChildNodes() {
			const level = this.level + 1;

			const x = this.x * 2;
			const y = this.y * 2;

			var node = new MapPlaneNode(this, this.mapView, MapNode$1.TOP_LEFT, level, x, y);
			node.scale.set(0.5, 1, 0.5);
			node.position.set(-0.25, 0, -0.25);
			this.add(node);
			node.updateMatrix();
			node.updateMatrixWorld(true);

			var node = new MapPlaneNode(this, this.mapView, MapNode$1.TOP_RIGHT, level, x + 1, y);
			node.scale.set(0.5, 1, 0.5);
			node.position.set(0.25, 0, -0.25);
			this.add(node);
			node.updateMatrix();
			node.updateMatrixWorld(true);

			var node = new MapPlaneNode(this, this.mapView, MapNode$1.BOTTOM_LEFT, level, x, y + 1);
			node.scale.set(0.5, 1, 0.5);
			node.position.set(-0.25, 0, 0.25);
			this.add(node);
			node.updateMatrix();
			node.updateMatrixWorld(true);

			var node = new MapPlaneNode(this, this.mapView, MapNode$1.BOTTOM_RIGHT, level, x + 1, y + 1);
			node.scale.set(0.5, 1, 0.5);
			node.position.set(0.25, 0, 0.25);
			this.add(node);
			node.updateMatrix();
			node.updateMatrixWorld(true);
		}

		/**
		 * Overrides normal raycasting, to avoid raycasting when isMesh is set to false.
		 * 
		 * @method raycast
		 */
		raycast(raycaster, intersects) {
			if(this.isMesh === true)
			{
				return three.Mesh.prototype.raycast.call(this, raycaster, intersects);
			}

			return false;
		}
	}

	Object.assign(MapPlaneNode.prototype, MapNode$1.prototype);

	/**
	 * Map node plane geometry.
	 *
	 * @static
	 * @attribute GEOMETRY
	 * @type {PlaneBufferGeometry}
	 */
	MapPlaneNode.GEOMETRY = new MapNodeGeometry(1, 1, 1, 1);

	/** 
	 * Represents a map tile node.
	 * 
	 * A map node can be subdivided into other nodes (Quadtree).
	 * 
	 * @class MapSphereNode
	 */
	class MapSphereNode extends three.Mesh {
		constructor(parentNode, mapView, location, level, x, y) {
			super(
				MapSphereNode.createGeometry(level, x, y),
				new three.MeshBasicMaterial({wireframe:false})
			);
			MapNode$1.call(this, parentNode, mapView, location, level, x, y);

			this.applyScaleNode();

			this.matrixAutoUpdate = false;
			this.isMesh = true;
			this.visible = false;

			/**
			 * Cache with the children objects created from subdivision.
			 * 
			 * Used to avoid recreate object after simplification and subdivision.
			 * 
			 * The default value is null.
			 *
			 * @attribute childrenCache
			 * @type {Array}
			 */
			this.childrenCache = null;

			this.loadTexture();
		}

		/**
		 * Create a geometry for a sphere map node.
		 *
		 * @method createGeometry
		 * @param {Number} zoom
		 * @param {Number} x
		 * @param {Number} y
		 */
		static createGeometry(zoom, x, y) {
			const range = 2 ** zoom;
			const max = 40;
			const segments = Math.floor(MapSphereNode.SEGMENTS * (max / (zoom + 1)) / max);

			//X
			const phiLength = (1 / range) * 2 * Math.PI;
			const phiStart = x * phiLength;

			//Y
			const thetaLength = (1 / range) * Math.PI;
			const thetaStart = y * thetaLength;

			return new MapSphereNodeGeometry(1, segments, segments, phiStart, phiLength, thetaStart, thetaLength);
		}

		/** 
		 * Apply scale and offset position to the sphere node geometry.
		 *
		 * @method applyScaleNode
		 */
		applyScaleNode() {
			this.geometry.computeBoundingBox();

			const box = this.geometry.boundingBox.clone();
			const center = box.getCenter(new three.Vector3());

			const matrix = new three.Matrix4();
			matrix.compose(new three.Vector3(-center.x, -center.y, -center.z), new three.Quaternion(), new three.Vector3(GeolocationUtils.EARTH_RADIUS, GeolocationUtils.EARTH_RADIUS, GeolocationUtils.EARTH_RADIUS));
			this.geometry.applyMatrix(matrix);

			this.position.copy(center);

			this.updateMatrix();
			this.updateMatrixWorld();
		}

		updateMatrix() {
			this.matrix.setPosition(this.position);
			this.matrixWorldNeedsUpdate = true;
		}

		updateMatrixWorld(force) {
			if(this.matrixWorldNeedsUpdate || force)
			{
				this.matrixWorld.copy(this.matrix);
				this.matrixWorldNeedsUpdate = false;
			}
		}

		createChildNodes() {
			const level = this.level + 1;

			const x = this.x * 2;
			const y = this.y * 2;

			var node = new MapSphereNode(this, this.mapView, MapNode$1.TOP_LEFT, level, x, y);
			this.add(node);
			node.updateMatrix();
			node.updateMatrixWorld(true);

			var node = new MapSphereNode(this, this.mapView, MapNode$1.TOP_RIGHT, level, x + 1, y);
			this.add(node);
			node.updateMatrix();
			node.updateMatrixWorld(true);

			var node = new MapSphereNode(this, this.mapView, MapNode$1.BOTTOM_LEFT, level, x, y + 1);
			this.add(node);
			node.updateMatrix();
			node.updateMatrixWorld(true);

			var node = new MapSphereNode(this, this.mapView, MapNode$1.BOTTOM_RIGHT, level, x + 1, y + 1);
			this.add(node);
			node.updateMatrix();
			node.updateMatrixWorld(true);
		}

		/**
		 * Overrides normal raycasting, to avoid raycasting when isMesh is set to false.
		 * 
		 * @method raycast
		 */
		raycast(raycaster, intersects) {
			if(this.isMesh === true)
			{
				return three.Mesh.prototype.raycast.call(this, raycaster, intersects);
			}

			return false;
		}
	}

	Object.assign(MapSphereNode.prototype, MapNode$1.prototype);

	/**
	 * Number of segments per node geometry.
	 *
	 * @STATIC
	 * @static SEGMENTS
	 * @type {Number}
	 */
	MapSphereNode.SEGMENTS = 80;

	/**
	 * Map viewer is used to read and display map tiles from a server.
	 * 
	 * It was designed to work with a OpenMapTiles but can also be used with another map tiles.
	 *
	 * The map is drawn in plane map nodes using a quad tree that is subdivided as necessary to guaratee good map quality.
	 *
	 * @class MapView
	 * @extends {Mesh}
	 * @param {String} mode Map view node modes.
	 * @param {Number} provider Map color tile provider.
	 * @param {Number} heightProvider Map height tile provider.
	 */
	class MapView extends three.Mesh {
		constructor(mode, provider, heightProvider) {
			/**
			 * Define the type of map view in use.
			 *
			 * This value can only be set on creation
			 *
			 * @attribute mode
			 * @type {Number}
			 */
			this.mode = mode !== undefined ? mode : MapView.PLANAR;

			let geometry;
			if(this.mode === MapView.SPHERICAL)
			{
				geometry = new MapSphereNodeGeometry(GeolocationUtils.EARTH_RADIUS, 64, 64, 0, 2 * Math.PI, 0, Math.PI);
			}
			else if(this.mode === MapView.PLANAR || this.mode === MapView.HEIGHT)
			{
				geometry = MapPlaneNode.GEOMETRY;
			}

			super(geometry, new three.MeshBasicMaterial({transparent:true, opacity:0.0}));

			/**
			 * Map tile color layer provider.
			 *
			 * @attribute provider
			 * @type {MapProvider}
			 */
			this.provider = provider !== undefined ? provider : new OpenStreetMapsProvider();

			/**
			 * Map height (terrain elevation) layer provider.
			 *
			 * @attribute heightProvider
			 * @type {MapProvider}
			 */
			this.heightProvider = heightProvider !== undefined ? heightProvider : null;

			/**
			 * Number of rays used to test nodes and subdivide the map.
			 *
			 * One ray is cast each frame, one should be enough for must scenarios.
			 *
			 * @attribute subdivisionRays
			 * @type {Boolean}
			 */
			this.subdivisionRays = 1;

			/**
			 * Threshold to subdivide the map tiles.
			 * 
			 * Lower value will subdivide earlier (less zoom required to subdivide).
			 * 
			 * @attribute thresholdUp
			 * @type {Number}
			 */
			this.thresholdUp = 0.8;

			/**
			 * Threshold to simplify the map tiles.
			 * 
			 * Higher value will simplify earlier.
			 *
			 * @attribute thresholdDown
			 * @type {Number}
			 */
			this.thresholdDown = 0.2;
			
			/**
			 * Root map node.
			 *
			 * @attribute root
			 * @type {MapPlaneNode}
			 */
			this.root = null;

			if(this.mode === MapView.PLANAR)
			{
				this.scale.set(GeolocationUtils.EARTH_PERIMETER, 1, GeolocationUtils.EARTH_PERIMETER);
				this.root = new MapPlaneNode(null, this, MapNode.ROOT, 0, 0, 0);
			}
			else if(this.mode === MapView.HEIGHT)
			{
				this.scale.set(GeolocationUtils.EARTH_PERIMETER, MapHeightNode.USE_DISPLACEMENT ? MapHeightNode.MAX_HEIGHT : 1, GeolocationUtils.EARTH_PERIMETER);
				this.root = new MapHeightNode(null, this, MapNode.ROOT, 0, 0, 0);
				this.thresholdUp = 0.5;
				this.thresholdDown = 0.1;
			}
			else if(this.mode === MapView.SPHERICAL)
			{
				this.root = new MapSphereNode(null, this, MapNode.ROOT, 0, 0, 0);
				this.thresholdUp = 7e7;
				this.thresholdDown = 2e8;
			}
			this.add(this.root);

			this._raycaster = new three.Raycaster();
			this._mouse = new three.Vector2();
			this._vector = new three.Vector3();
		}

		/**
		 * Change the map provider of this map view.
		 *
		 * Will discard all the tiles already loaded using the old provider.
		 *
		 * @method setProvider
		 */
		setProvider(provider) {
			if(provider !== this.provider)
			{
				this.provider = provider;

				//Clear cache and reload tiles
				this.traverse(function(children)
				{
					if(children.childrenCache !== undefined && children.childrenCache !== null)
					{
						children.childrenCache = null;
					}

					if(children.loadTexture !== undefined)
					{
						children.loadTexture();
					}
				});
			}
		}

		/**
		 * Ajust node configuration depending on the camera distance.
		 *
		 * Called everytime before render. 
		 *
		 * @method onBeforeRender
		 */
		onBeforeRender(renderer, scene, camera, geometry, material, group) {
			const intersects = [];

			for(let t = 0; t < this.subdivisionRays; t++)
			{
				//Raycast from random point
				this._mouse.set(Math.random() * 2 - 1, Math.random() * 2 - 1);
				
				//Check intersection
				this._raycaster.setFromCamera(this._mouse, camera);
				this._raycaster.intersectObjects(this.children, true, intersects);
			}

			if(this.mode === MapView.PLANAR || this.mode === MapView.HEIGHT)
			{
				for(var i = 0; i < intersects.length; i++)
				{
					var node = intersects[i].object;
					const matrix = node.matrixWorld.elements;
					const scaleX = this._vector.set(matrix[0], matrix[1], matrix[2]).length();
					const value = scaleX / intersects[i].distance;

					if(value > this.thresholdUp)
					{
						node.subdivide();
						return;
					}
					else if(value < this.thresholdDown)
					{
						if(node.parentNode !== null)
						{
							node.parentNode.simplify();
							return;
						}
					}
				}
			}
			else if(this.mode === MapView.SPHERICAL)
			{
				for(var i = 0; i < intersects.length; i++)
				{
					var node = intersects[i].object;
					const distance = intersects[i].distance * 2 ** node.level;

					if(distance < this.thresholdUp)
					{
						node.subdivide();
						return;
					}
					else if(distance > this.thresholdDown)
					{
						if(node.parentNode !== null)
						{
							node.parentNode.simplify();
							return;
						}
					}
				}
			}
		}

		/**
		 * Get map meta data from server if supported.
		 * 
		 * @method getMetaData
		 */
		getMetaData() {
			this.provider.getMetaData();
		}

		/**
		 * Fetch tile image URL using its quadtree position and zoom level.
		 * 
		 * @method fetchTile
		 * @param {Number} zoom Zoom level.
		 * @param {Number} x Tile x.
		 * @param {Number} y Tile y.
		 */
		fetchTile(zoom, x, y) {
			return this.provider.fetchTile(zoom, x, y);
		}

		raycast(raycaster, intersects) {
			return false;
		}
	}

	/**
	 * Planar map projection.
	 *
	 * @static
	 * @attribute PLANAR
	 * @type {Number}
	 */
	MapView.PLANAR = 200;

	/**
	 * Spherical map projection.
	 *
	 * @static
	 * @attribute SPHERICAL
	 * @type {Number}
	 */
	MapView.SPHERICAL = 201;

	/**
	 * Planar map projection with height deformation.
	 *
	 * @static
	 * @attribute HEIGHT
	 * @type {Number}
	 */
	MapView.HEIGHT = 202;

	/**
	 * XHR utils contains static methods to allow easy access to services via XHR.
	 *
	 * @static
	 * @class Service
	 */
	class XHRUtils {
		/**
		 * Read file data from URL, using XHR.
		 * 
		 * @method readFile
		 * @param {String} fname File URL.
		 * @param {Boolean} sync If set to true or undefined the file is read syncronosly.
		 * @param {Function} onLoad On load callback.
		 * @param {Function} onError On progress callback.
		 */
		static get(fname, onLoad, onError) {
			var file = new XMLHttpRequest();
			file.overrideMimeType("text/plain");
			file.open("GET", fname, true);

			if(onLoad !== undefined)
			{
				file.onload = function()
				{
					onLoad(file.response);
				};
			}

			if(onError !== undefined)
			{
				file.onerror = onError;
			}

			file.send(null);
		}

		/**
		 * Perform a request with the specified configuration.
		 * 
		 * Syncronous request should be avoided unless they are strictly necessary.
		 * 
		 * @method request
		 * @param {String} url Target for the request.
		 * @param {String} type Resquest type (POST, GET, ...)
		 * @param {String} header Object with data to be added to the request header.
		 * @param {String} body Data to be sent in the resquest.
		 * @param {Function} onLoad On load callback, receives data (String or Object) and XHR as arguments.
		 * @param {Function} onError XHR onError callback.
		 */
		static request(url, type, header, body, onLoad, onError) {
			function parseResponse(response)
			{
				try
				{
					return JSON.parse(response);
				}
				catch(e)
				{
					return response;
				}
			}

			var xhr = new XMLHttpRequest();
			xhr.overrideMimeType("text/plain");
			xhr.open(type, url, true);

			//Fill header data from Object
			if(header !== null && header !== undefined)
			{
				for(var i in header)
				{
					xhr.setRequestHeader(i, header[i]);
				}
			}

			if(onLoad !== undefined)
			{
				xhr.onload = function(event)
				{
					onLoad(parseResponse(xhr.response), xhr);
				};
			}

			if(onError !== undefined)
			{
				xhr.onerror = onError;
			}

			if(onProgress !== undefined)
			{
				xhr.onprogress = onProgress;
			}

			if(body !== undefined)
			{
				xhr.send(body);
			}
			else
			{
				xhr.send(null);
			}
		}
	}

	/**
	 * Bing maps tile provider.
	 *
	 * API Reference
	 *  - https://msdn.microsoft.com/en-us/library/bb259689.aspx (Bing Maps Tile System)
	 *  - https://msdn.microsoft.com/en-us/library/mt823633.aspx (Directly accessing the Bing Maps tiles)
	 *  - https://www.bingmapsportal.com/
	 *
	 * @class BingMapsProvider
	 * @param {String} apiKey Bing API key.
	 */
	class BingMapsProvider extends MapProvider {
		constructor(apiKey, type) {
			super();

			this.maxZoom = 19;
			
			/**
			 * Server API access token.
			 * 
			 * @attribute apiKey
			 * @type {String}
			 */
			this.apiKey = apiKey !== undefined ? apiKey : "";

			/** 
			 * The type of the map used.
			 *
			 * @attribute type
			 * @type {String}
			 */
			this.type = type !== undefined ? type : BingMapsProvider.AERIAL;

			/**
			 * Map image tile format, the formats available are:
			 *  - gif: Use GIF image format.
			 *  - jpeg: Use JPEG image format. JPEG format is the default for Road, Aerial and AerialWithLabels imagery.
			 *  - png: Use PNG image format. PNG is the default format for OrdnanceSurvey imagery.
			 *
			 * @attribute format
			 * @type {String}
			 */
			this.format = "jpeg";

			/**
			 * Size of the map tiles.
			 *
			 * @attribute mapSize
			 * @type {Number}
			 */
			this.mapSize = 512;

			/**
			 * Tile server subdomain.
			 *
			 * @attribute subdomain
			 * @type {String}
			 */
			this.subdomain = "t1";
		}

		/** 
		 * Get the base URL for the map configuration requested.

		* Uses the format 
		* http://ecn.{subdomain}.tiles.virtualearth.net/tiles/r{quadkey}.jpeg?g=129&mkt={culture}&shading=hill&stl=H
		*
		* @method getMetaData
		*/
		getMetaData() {
			const address = "http://dev.virtualearth.net/REST/V1/Imagery/Metadata/RoadOnDemand?output=json&include=ImageryProviders&key=" + this.apiKey;
			
			XHRUtils.get(address, function(data)
			{
				const meta = JSON.parse(data);

				//TODO <FILL METADATA>
			});
		}

		/**
		 * Convert x, y, zoom quadtree to a bing maps specific quadkey.
		 *
		 * Adapted from original C# code at https://msdn.microsoft.com/en-us/library/bb259689.aspx.
		 *
		 * @method quadKey
		 * @param {Number} x
		 */
		static quadKey(zoom, x, y) {
			let quad = "";

			for(let i = zoom; i > 0; i--)
			{
				const mask = 1 << (i - 1);
				let cell = 0;
				
				if((x & mask) != 0)
				{
					cell++;	
				}
				
				if((y & mask) != 0)
				{
					cell += 2;
				}

				quad += cell; 
			}

			return quad; 
		}

		fetchTile(zoom, x, y) {
			return "http://ecn." + this.subdomain + ".tiles.virtualearth.net/tiles/" + this.type + BingMapsProvider.quadKey(zoom, x, y) + ".jpeg?g=1173";
		}
	}

	/**
	 * Display an aerial view of the map.
	 *
	 * @static
	 * @attribute AERIAL
	 * @type {String}
	 */
	BingMapsProvider.AERIAL = "a";

	/**
	 * Display a road view of the map.
	 *
	 * @static
	 * @attribute AERIAL
	 * @type {String}
	 */
	BingMapsProvider.ROAD = "r";

	/**
	 * Display an aerial view of the map with labels.
	 *
	 * @static
	 * @attribute AERIAL_LABELS
	 * @type {String}
	 */
	BingMapsProvider.AERIAL_LABELS = "h";

	/**
	 * Use this value to display a bird's eye (oblique) view of the map.
	 *
	 * @static
	 * @attribute AERIAL
	 * @type {String}
	 */
	BingMapsProvider.OBLIQUE = "o";

	/**
	 * Display a bird's eye (oblique) with labels view of the map.
	 *
	 * @static
	 * @attribute AERIAL
	 * @type {String}
	 */
	BingMapsProvider.OBLIQUE_LABELS = "b";

	/**
	 * Google maps tile server.
	 *
	 * The tile API is only available to select partners, and is not included with the Google Maps Core ServiceList.
	 *
	 * API Reference
	 *  - https://developers.google.com/maps/documentation/javascript/coordinates
	 *  - https://developers.google.com/maps/documentation/tile
	 *
	 * @class GoogleMapsProvider
	 */
	class GoogleMapsProvider extends MapProvider {
		constructor(apiToken) {
			super();

			/**
			 * Server API access token.
			 * 
			 * @attribute apiToken
			 * @type {String}
			 */
			this.apiToken = apiToken !== undefined ? apiToken : "";

			/**
			 * After the first call a session token is stored.
			 *
			 * The session token is required for subsequent requests for tile and viewport information.
			 *
			 * @attribute sessionToken
			 * @type {String}
			 */
			this.sessionToken = null;

			/**
			 * The map orientation in degrees.
			 *
			 * Can be 0, 90, 180 or 270.
			 *
			 * @attribute orientation
			 * @type {Number}
			 */
			this.orientation = 0;

			/**
			 * Map image tile format, the formats available are:
			 *  - png PNG
			 *  - jpg JPG
			 *
			 * @attribute format
			 * @type {String}
			 */
			this.format = "png";

			/** 
			 * The type of base map. This can be one of the following:
			 *  - roadmap: The standard Google Maps painted map tiles.
			 *  - satellite: Satellite imagery.
			 *  - terrain: Shaded relief maps of 3D terrain. When selecting terrain as the map type, you must also include the layerRoadmap layer type (described in the Optional fields section below).
			 *  - streetview: Street View panoramas. See the Street View guide.
			 *
			 * @attribute mapType
			 * @type {String}
			 */
			this.mapType = "roadmap";

			/**
			 * If true overlays are shown.
			 *
			 * @attribute overlay
			 * @type {Boolean}
			 */
			this.overlay = false;

			this.createSession();
		}

		/**
		 * Create a map tile session in the maps API.
		 *
		 * This method needs to be called before using the provider
		 *
		 * @method createSession
		 */
		createSession() {
			const self = this;

			const address = "https://www.googleapis.com/tile/v1/createSession?key=" + this.apiToken;
			const data = JSON.stringify(
			{
				"mapType": this.mapType,
				"language": "en-EN",
				"region": "en",
				"layerTypes": ["layerRoadmap", "layerStreetview"],
				"overlay":  this.overlay,
				"scale": "scaleFactor1x"
			});

			XHRUtils.request(address, "GET", {"Content-Type": "text/json"}, data, function(response, xhr)
			{
				console.log("Created google maps session.", response, xhr);
				self.sessionToken = response.session;
			},
			function(xhr)
			{
				console.warn("Unable to create a google maps session.", xhr);
			});
		}

		fetchTile(zoom, x, y) {
			return "https://www.googleapis.com/tile/v1/tiles/" + zoom + "/" + x + "/" + y + "?session=" + this.sessionToken + "&orientation=" + this.orientation + "&key=" + this.apiToken;
		}
	}

	/**
	 * Here maps tile server.
	 *
	 * API Reference
	 *  - https://developer.here.com/documentation/map-tile/topics/example-satellite-map.html
	 *
	 * @class HereMapsProvider
	 * @param {String} appId HERE maps app id.
	 * @param {String} appCode HERE maps app code.
	 * @param {String} style Map style.
	 * @param {Number} scheme Map scheme.
	 * @param {String} format Image format.
	 * @param {Number} size Tile size.
	 */
	class HereMapsProvider extends MapProvider {
		constructor(appId, appCode, style, scheme, format, size) {
			super();

			/**
			 * Service application access token.
			 * 
			 * @attribute appId
			 * @type {String}
			 */
			this.appId = appId !== undefined ? appId : "";

			/**
			 * Service application code token.
			 * 
			 * @attribute appCode
			 * @type {String}
			 */
			this.appCode = appCode !== undefined ? appCode : "";

			/**
			 * The type of maps to be used.
			 *  - aerial
			 *  - base
			 *  - pano
			 *  - traffic
			 * 
			 * For each type HERE maps has 4 servers:
			 *  - Aerial Tiles https://{1-4}.aerial.maps.api.here.com
			 *  - Base Map Tiles https://{1-4}.base.maps.api.here.com
			 *  - Pano Tiles https://{1-4}.pano.maps.api.here.com
			 *  - Traffic Tiles https://{1-4}.traffic.maps.api.here.com
			 *
			 * @attribute style
			 * @type {String}
			 */
			this.style = style !== undefined ? style : "base";
			
			/**
			 * Specifies the view scheme. A complete list of the supported schemes may be obtained by using the Info resouce.
			 *  - normal.day
			 *  - normal.night
			 *  - terrain.day
			 *  - satellite.day
			 *
			 * Check the scheme list at https://developer.here.com/documentation/map-tile/topics/resource-info.html
			 *
			 * Be aware that invalid combinations of schemes and tiles are rejected. For all satellite, hybrid and terrain schemes, you need to use the Aerial Tiles base URL instead of the normal one.
			 * 
			 * @attribute scheme
			 * @type {String}
			 */
			this.scheme = scheme !== undefined ? scheme : "normal.day";

			/**
			 * Map image tile format, the formats available are:
			 *  - png True color PNG
			 *  - png8 8 bit indexed PNG
			 *  - jpg JPG at 90% quality
			 *
			 * @attribute format
			 * @type {String}
			 */
			this.format = format !== undefined ? format : "png";

			/**
			 * Returned tile map image size.
			 *
			 * The following sizes are supported:
			 *  - 256
			 *  - 512
			 *  - 128 (deprecated, although usage is still accepted)
			 *
			 * @attribute size
			 * @type {Number}
			 */
			this.size = size !== undefined ? size : 512;

			/**
			 * Specifies the map version, either newest or with a hash value.
			 *
			 * @attribute version
			 * @type {String}
			 */
			this.version = "newest";

			/**
			 * Server to be used next.
			 *
			 * There are 4 server available in here maps.
			 *
			 * On each request this number is updated.
			 *
			 * @attribute server
			 * @type {Number}
			 */
			this.server = 1;
	 	}

		/**
		 * Update the server counter.
		 *
		 * There are 4 server (1 to 4).
		 *
		 * @method nextServer
		 */
		nextServer() {
			this.server = (this.server % 4 === 0 ? 1 : this.server + 1);
		}

		getMetaData() {}

		fetchTile(zoom, x, y) {
			this.nextServer();

			return "https://" + this.server + "." + this.style + ".maps.api.here.com/maptile/2.1/maptile/" + this.version + "/" + this.scheme + "/" + zoom + "/" + x + "/" + y + "/" + this.size + "/" + this.format + "?app_id=" + this.appId + "&app_code=" + this.appCode;
		}
	}

	HereMapsProvider.PATH = "/maptile/2.1/";

	/**
	 * Map box service tile provider. Map tiles can be fetched from style or from a map id.
	 *
	 * API Reference
	 *  - https://www.mapbox.com/
	 *
	 * @class MapBoxProvider
	 * @param {String} apiToken Map box api token.
	 * @param {String} id Map style or mapID if the mode is set to MAP_ID.
	 * @param {Number} mode Map tile access mode.
	 * @param {String} format Image format.
	 * @param {Boolean} useHDPI
	 */
	class MapBoxProvider extends MapProvider {
		constructor(apiToken, id, mode, format, useHDPI) {
			/**
			* Server API access token.
			* 
			* @attribute apiToken
			* @type {String}
			*/
			this.apiToken = apiToken !== undefined ? apiToken : "";

			/**
			* Map image tile format, the formats available are:
			*  - png True color PNG
			*  - png32 32 color indexed PNG
			*  - png64 64 color indexed PNG
			*  - png128 128 color indexed PNG
			*  - png256 256 color indexed PNG
			*  - jpg70 70% quality JPG
			*  - jpg80 80% quality JPG
			*  - jpg90 90% quality JPG
			*  - pngraw Raw png (no interpolation)
			*
			* @attribute format
			* @type {String}
			*/
			this.format = format !== undefined ? format : "png";

			/**
			* Flag to indicate if should use high resolution tiles
			*
			* @attribute useHDPI
			* @type {Boolean}
			*/
			this.useHDPI = useHDPI !== undefined ? useHDPI : false;

			/** 
			* Map tile access mode
			*  - MapBoxProvider.STYLE
			*  - MapBoxProvider.MAP_ID
			*
			* @attribute mode
			* @type {Number}
			*/
			this.mode = mode !== undefined ? mode : MapBoxProvider.STYLE;

			/**
			* Map identifier composed of {username}.{style}
			*
			* Some examples of the public mapbox identifiers:
			*  - mapbox.mapbox-streets-v7
			*  - mapbox.satellite
			*  - mapbox.mapbox-terrain-v2
			*  - mapbox.mapbox-traffic-v1
			*  - mapbox.terrain-rgb
			*
			* @attribute mapId
			* @type {String}
			*/
			this.mapId = id !== undefined ? id : "";

			/**
			* Map style to be used composed of {username}/{style_id}
			*
			* Some example of the syles available:
			*  - mapbox/streets-v10
			*  - mapbox/outdoors-v10
			*  - mapbox/light-v9
			*  - mapbox/dark-v9
			*  - mapbox/satellite-v9
			*  - mapbox/satellite-streets-v10
			*  - mapbox/navigation-preview-day-v4
			*  - mapbox/navigation-preview-night-v4
			*  - mapbox/navigation-guidance-day-v4
			*  - mapbox/navigation-guidance-night-v4
			*
			* @attribute style
			* @type {String}
			*/
			this.style = id !== undefined ? id : "";
		}

		getMetaData() {
			const self = this;
			const address = MapBoxProvider.ADDRESS + this.version + "/" + this.mapId + ".json?access_token=" + this.apiToken;

			XHRUtils.get(address, function(data)
			{
				const meta = JSON.parse(data);

				self.name = meta.name;
				self.minZoom = meta.minZoom;
				self.maxZoom = meta.maxZoom;
				self.bounds = meta.bounds;
				self.center = meta.center;
			});
		}

		fetchTile(zoom, x, y) {
			if(this.mode === MapBoxProvider.STYLE)
			{
				return MapBoxProvider.ADDRESS + "styles/v1/" + this.style + "/tiles/" + zoom + "/" + x + "/" + y + (this.useHDPI ? "@2x?access_token=" : "?access_token=") + this.apiToken;
			}
			else
			{
				return MapBoxProvider.ADDRESS + "v4/" + this.mapId + "/" + zoom + "/" + x + "/" + y + (this.useHDPI ? "@2x." : ".") + this.format + "?access_token=" + this.apiToken;
			}
		}
	}

	MapBoxProvider.ADDRESS = "https://api.mapbox.com/";

	/**
	 * Access the map data using a map style.
	 *
	 * @static
	 * @attribute STYLE
	 * @type {Number}
	 */
	MapBoxProvider.STYLE = 100;

	/**
	 * Access the map data using a map id.
	 *
	 * @static
	 * @attribute MAP_ID
	 * @type {Number}
	 */
	MapBoxProvider.MAP_ID = 101;

	/**
	 * Map tiler provider API.
	 *
	 * The map tiler server is based on open map tiles.
	 *
	 * API Reference
	 *  - https://www.maptiler.com/
	 *
	 * @class MapTilerProvider
	 * @param {String} apiKey
	 */
	class MapTilerProvider extends MapProvider {
		constructor(apiKey, type, style, format) {
			super();

			/**
			* Server API access token.
			* 
			* @attribute apiToken
			* @type {String}
			*/
			this.apiKey = apiKey !== undefined ? apiKey : "";

			/**
			* Map image tile format.
			*  - png
			*  - jpg
			*
			* @attribute format
			* @type {String}
			*/
			this.format = format !== undefined ? format : "png";

			/** 
			* The type of the map being provided, can be
			*  - styles For vectorial map styles
			*  - data For data map styles.
			*
			* @attribute type
			* @type {String}
			*/
			this.type = type !== undefined ? type : "styles";

			/**
			* Map tile style, some of the vectorial styles available.
			* - basic
			* - bright
			* - darkmatter
			* - hybrid
			* - positron
			* - streets
			* - topo
			* - voyager
			*
			* Data styles:
			* - hillshades
			* - terrain-rgb
			* - satellite
			*
			* @attribute style
			* @type {String}
			*/
			this.style = style !== undefined ? style : "klokantech-basic";
		}

		fetchTile(zoom, x, y) {
			return "https://maps.tilehosting.com/" + this.type + "/" + this.style + "/" + zoom + "/" + x + "/" + y + "." + this.format + "?key=" + this.apiKey;
		}
	}

	/**
	 * Open tile map server tile provider.
	 *
	 * API Reference
	 *  - https://openmaptiles.org/
	 *
	 * @class OpenMapTilesProvider
	 */
	class OpenMapTilesProvider extends MapProvider {
		constructor(address) {
			super();

			/**
			* Map server address.
			*
			* By default the open OSM tile server is used.
			* 
			* @attribute address
			* @type {String}
			*/
			this.address = address;

			/**
			* Map image tile format.
			* 
			* @attribute format
			* @type {String}
			*/
			this.format = "png";

			/**
			* Map tile theme, some of the styles available.
			* - dark-matter
			* - klokantech-basic
			* - osm-bright
			* - positron
			* 
			* @attribute theme
			* @type {String}
			*/
			this.theme = "klokantech-basic";
		}

		getMetaData() {
			const self = this;
			const address = this.address + "styles/" + this.theme + ".json";

			XHRUtils.get(address, function(data)
			{
				const meta = JSON.parse(data);

				self.name = meta.name;
				self.format = meta.format;
				self.minZoom = meta.minZoom;
				self.maxZoom = meta.maxZoom;
				self.bounds = meta.bounds;
				self.center = meta.center;
			});
		}

		fetchTile(zoom, x, y) {
			return this.address + "styles/" + this.theme + "/" + zoom + "/" + x + "/" + y + "." + this.format;
		}
	}

	exports.BingMapsProvider = BingMapsProvider;
	exports.GoogleMapsProvider = GoogleMapsProvider;
	exports.HereMapsProvider = HereMapsProvider;
	exports.MapBoxProvider = MapBoxProvider;
	exports.MapHeightNode = MapHeightNode;
	exports.MapNode = MapNode$1;
	exports.MapNodeGeometry = MapNodeGeometry;
	exports.MapPlaneNode = MapPlaneNode;
	exports.MapProvider = MapProvider;
	exports.MapSphereNode = MapSphereNode;
	exports.MapSphereNodeGeometry = MapSphereNodeGeometry;
	exports.MapTilerProvider = MapTilerProvider;
	exports.MapView = MapView;
	exports.OpenMapTilesProvider = OpenMapTilesProvider;
	exports.OpenStreetMapsProvider = OpenStreetMapsProvider;

	Object.defineProperty(exports, '__esModule', { value: true });

})));
