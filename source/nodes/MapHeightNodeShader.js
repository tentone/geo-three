import {Texture, LinearFilter, RGBFormat, ShaderMaterial, MeshBasicMaterial, Mesh, NearestFilter} from "three";
import {MapHeightNode} from "./MapHeightNode.js";
import {MapNodeGeometry} from "../geometries/MapNodeGeometry.js";
import {MapPlaneNode} from "./MapPlaneNode.js";
/** 
 * Map height node that uses GPU height calculation to generate the deformed plane mesh.
 * 
 * This solution is faster if no mesh interaction is required since all trasnformations are done in the GPU the transformed mesh cannot be accessed for CPU operations (e.g. raycasting).
 *
 * @class MapHeightNodeShader
 * @param parentNode {MapHeightNode} The parent node of this node.
 * @param mapView {MapView} Map view object where this node is placed.
 * @param location {number} Position in the node tree relative to the parent.
 * @param level {number} Zoom level in the tile tree of the node.
 * @param x {number} X position of the node in the tile tree.
 * @param y {number} Y position of the node in the tile tree.
 */
function MapHeightNodeShader(parentNode, mapView, location, level, x, y)
{
	var material = new MeshBasicMaterial({map: MapHeightNodeShader.EMPTY_TEXTURE});
	material = MapHeightNodeShader.prepareMaterial(material);

	MapHeightNode.call(this, parentNode, mapView, location, level, x, y, material, MapHeightNodeShader.GEOMETRY);

	this.frustumCulled = false;
}

MapHeightNodeShader.prototype = Object.create(MapHeightNode.prototype);
MapHeightNodeShader.prototype.constructor = MapHeightNodeShader;

/**
 * Empty texture used as a placeholder for missing textures.
 * 
 * @static
 * @attribute EMPTY_TEXTURE
 * @type {Texture}
 */
MapHeightNodeShader.EMPTY_TEXTURE = new Texture();

/**
 * Size of the grid of the geometry displayed on the scene for each tile.
 * 
 * @static
 * @attribute GEOMETRY_SIZE
 * @type {number}
 */
MapHeightNodeShader.GEOMETRY_SIZE = 256;

/**
 * Map node plane geometry.
 *
 * @static
 * @attribute GEOMETRY
 * @type {PlaneBufferGeometry}
 */
MapHeightNodeShader.GEOMETRY = new MapNodeGeometry(1, 1, MapHeightNode.GEOMETRY_SIZE, MapHeightNode.GEOMETRY_SIZE);

/**
 * Prepare the threejs material to be used in the map tile.
 * 
 * @param {Material} material Material to be transformed. 
 */
MapHeightNodeShader.prepareMaterial = function(material)
{
	material.userData = {heightMap: {value: MapHeightNodeShader.EMPTY_TEXTURE}};

	material.onBeforeCompile = (shader) =>
	{
		// Pass uniforms from userData to the
		for (let i in material.userData)
		{
			shader.uniforms[i] = material.userData[i];
		}

		// Vertex variables
		shader.vertexShader = `
		uniform sampler2D heightMap;
		` + shader.vertexShader;

		// Vertex depth logic
		shader.vertexShader = shader.vertexShader.replace("#include <fog_vertex>", `
		#include <fog_vertex>

		// Calculate height of the title
		vec4 _theight = texture2D(heightMap, vUv);
		float _height = ((_theight.r * 255.0 * 65536.0 + _theight.g * 255.0 * 256.0 + _theight.b * 255.0) * 0.1) - 10000.0;
		vec3 _transformed = position + _height * normal;

		// Vertex position based on height
		gl_Position = projectionMatrix * modelViewMatrix * vec4(_transformed, 1.0);
		`);
	};

	return material;
};

MapHeightNodeShader.prototype.loadTexture = function()
{
	var self = this;

	this.mapView.fetchTile(this.level, this.x, this.y).then(function(image)
	{
		var texture = new Texture(image);
		texture.generateMipmaps = false;
		texture.format = RGBFormat;
		texture.magFilter = LinearFilter;
		texture.minFilter = LinearFilter;
		texture.needsUpdate = true;

		self.material.map = texture;

		self.textureLoaded = true;
		self.nodeReady();
	}).catch(function(err)
	{
		console.error("GeoThree: Failed to load color node data.", err);
		self.textureLoaded = true;
		self.nodeReady();
	});

	this.loadHeightGeometry();
};

MapHeightNodeShader.prototype.loadHeightGeometry = function()
{
	if (this.mapView.heightProvider === null)
	{
		throw new Error("GeoThree: MapView.heightProvider provider is null.");
	}
	
	var self = this;

	this.mapView.heightProvider.fetchTile(this.level, this.x, this.y).then(function(image)
	{
		var texture = new Texture(image);
		texture.generateMipmaps = false;
		texture.format = RGBFormat;
		texture.magFilter = NearestFilter;
		texture.minFilter = NearestFilter;
		texture.needsUpdate = true;

		self.material.userData.heightMap.value = texture;
		
		self.heightLoaded = true;
		self.nodeReady();
	}).catch(function(err)
	{
		console.error("GeoThree: Failed to load height node data.", err);
		self.heightLoaded = true;
		self.nodeReady();
	});
};

/**
 * Overrides normal raycasting, to avoid raycasting when isMesh is set to false.
 * 
 * Switches the geometry for a simpler one for faster raycasting.
 * 
 * @method raycast
 */
MapHeightNodeShader.prototype.raycast = function(raycaster, intersects)
{
	if (this.isMesh === true)
	{
		this.geometry = MapPlaneNode.GEOMETRY;

		var result = Mesh.prototype.raycast.call(this, raycaster, intersects);

		this.geometry = MapHeightNodeShader.GEOMETRY;

		return result;
	}

	return false;
};

export {MapHeightNodeShader};
