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
function MapHeightNode(parentNode, mapView, location, level, x, y)
{
	var material = new THREE.MeshPhongMaterial(
	{
		color: 0x000000,
		specular: 0x000000,
		shininess: 0,
		wireframe: false,
		emissive: 0xFFFFFF
	});

	THREE.Mesh.call(this, MapHeightNode.GEOMETRY, material);
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

MapHeightNode.prototype = Object.create(THREE.Mesh.prototype);
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
 * @type {THREE.PlaneBufferGeometry}
 */
MapHeightNode.GEOMETRY = new MapNodeGeometry(1, 1, MapHeightNode.GEOMETRY_SIZE, MapHeightNode.GEOMETRY_SIZE);

/**
 * Load tile texture from the server.
 * 
 * Aditionally in this height node it loads elevation data from the height provider and generate the appropiate maps.
 *
 * @method loadTexture
 */
MapHeightNode.prototype.loadTexture = function()
{
	var texture = new THREE.Texture();
	texture.generateMipmaps = false;
	texture.format = THREE.RGBFormat;
	texture.magFilter = THREE.LinearFilter;
	texture.minFilter = THREE.LinearFilter;
	texture.needsUpdate = false;

	this.material.emissiveMap = texture;

	var loader = new THREE.ImageLoader();
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
};

/** 
 * Load height texture from the server and create a geometry to match it.
 *
 + @method loadHeightGeometry
 */
MapHeightNode.prototype.loadHeightGeometry = function()
{
	var self = this;
	
	var geometry = new MapNodeGeometry(1, 1, MapHeightNode.GEOMETRY_SIZE, MapHeightNode.GEOMETRY_SIZE);
	var vertices = geometry.attributes.position.array;
	var itemSize = geometry.attributes.position.itemSize;

	var image = document.createElement("img");
	image.src = this.mapView.heightProvider.fetchTile(this.level, this.x, this.y);
	image.crossOrigin = "Anonymous";
	image.onload = function()
	{
		var canvas = document.createElement("canvas");
		canvas.width = MapHeightNode.GEOMETRY_SIZE + 1;
		canvas.height = MapHeightNode.GEOMETRY_SIZE + 1;

		var context = canvas.getContext("2d");
		context.imageSmoothingEnabled = false;
		context.drawImage(image, 0, 0, MapHeightNode.TILE_SIZE, MapHeightNode.TILE_SIZE, 0, 0, canvas.width, canvas.height);
		
		var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		var data = imageData.data;
		for(var i = 0, j = 0; i < data.length && j < vertices.length; i += 4, j += 3)
		{
			var r = data[i];
			var g = data[i + 1];
			var b = data[i + 2];

			//The value will be composed of the bits RGB
			var value = (((r * 65536 + g * 256 + b) * 0.1) - 1e4);

			vertices[j + 1] = value;
		}

		self.geometry = geometry;
		self.nodeReady();
	};
};

/** 
 * Load height texture from the server and create a displacement map from it.
 *
 + @method loadHeightDisplacement
 */
MapHeightNode.prototype.loadHeightDisplacement = function()
{
	var self = this;
	var material = this.material;

	var image = document.createElement("img");
	image.src = this.mapView.heightProvider.fetchTile(this.level, this.x, this.y);
	image.crossOrigin = "Anonymous";
	image.onload = function()
	{
		var canvas = document.createElement("canvas");
		canvas.width = MapHeightNode.GEOMETRY_SIZE;
		canvas.height = MapHeightNode.GEOMETRY_SIZE;

		var context = canvas.getContext("2d");
		context.imageSmoothingEnabled = false;
		context.drawImage(image, 0, 0, MapHeightNode.TILE_SIZE, MapHeightNode.TILE_SIZE, 0, 0, canvas.width, canvas.height);
		
		var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		var data = imageData.data;

		for(var i = 0; i < data.length; i += 4)
		{
			var r = data[i];
			var g = data[i + 1];
			var b = data[i + 2];

			//The value will be composed of the bits RGB
			var value = (((r * 65536 + g * 256 + b) * 0.1) - 1e4) / MapHeightNode.HEIGHT_DAMPENING;

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

		var displacement = new THREE.CanvasTexture(canvas);
		displacement.generateMipmaps = false;
		displacement.format = THREE.RGBFormat;
		displacement.magFilter = THREE.LinearFilter;
		displacement.minFilter = THREE.LinearFilter;

		material.displacementMap = displacement;
		material.displacementScale = 1.0;
		material.displacementBias = 0.0;
		material.needsUpdate = true;

		self.nodeReady();
	};
};

MapHeightNode.prototype.createChildNodes = function()
{
	var level = this.level + 1;

	var x = this.x * 2;
	var y = this.y * 2;

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
};

/**
 * Overrides normal raycasting, to avoid raycasting when isMesh is set to false.
 * 
 * @method raycast
 */
MapHeightNode.prototype.raycast = function(raycaster, intersects)
{
	if(this.isMesh === true)
	{
		return THREE.Mesh.prototype.raycast.call(this, raycaster, intersects);
	}

	return false;
};
