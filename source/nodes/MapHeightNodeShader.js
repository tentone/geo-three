import {Texture, LinearFilter, RGBFormat, ShaderMaterial} from "three";
import {MapHeightNode} from "./MapHeightNode.js";
import {MapNodeGeometry} from "../geometries/MapNodeGeometry.js";
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
	var vertexShader = `
	varying vec2 vUv;
	
	uniform sampler2D heightMap;

	void main() 
	{
		vUv = uv;
		
		vec4 theight = texture2D(heightMap, vUv);
		float height = ((theight.r * 255.0 * 65536.0 + theight.g * 255.0 * 256.0 + theight.b * 255.0) * 0.1) - 10000.0;
		vec3 transformed = position + height * normal;

		gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
	}`;

	var fragmentShader = `
	varying vec2 vUv;

	uniform sampler2D colorMap;

	void main() {
		gl_FragColor = vec4(texture2D(colorMap, vUv).rgb, 1.0);
	}`;

	var material = new ShaderMaterial({
		uniforms: {
			colorMap: {value: MapHeightNodeShader.EMPTY_TEXTURE},
			heightMap: {value: MapHeightNodeShader.EMPTY_TEXTURE}
		},
		vertexShader: vertexShader,
		fragmentShader: fragmentShader
	});

	MapHeightNode.call(this, parentNode, mapView, location, level, x, y, material, MapHeightNodeShader.GEOMETRY);

	this.frustumCulled = false;
}

MapHeightNodeShader.prototype = Object.create(MapHeightNode.prototype);

MapHeightNodeShader.prototype.constructor = MapHeightNodeShader;

MapHeightNodeShader.EMPTY_TEXTURE = new Texture();

/**
 * Size of the grid of the geometry displayed on the scene for each tile.
 *
 * @static
 * @attribute GEOMETRY_SIZE
 * @type {number}
 */
MapHeightNodeShader.GEOMETRY_SIZE = 128;

/**
 * Map node plane geometry.
 *
 * @static
 * @attribute GEOMETRY
 * @type {PlaneBufferGeometry}
 */
MapHeightNodeShader.GEOMETRY = new MapNodeGeometry(1, 1, MapHeightNode.GEOMETRY_SIZE, MapHeightNode.GEOMETRY_SIZE);

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

		self.material.uniforms.colorMap.value = texture;

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
	if(this.mapView.heightProvider === null)
	{
		throw new Error("GeoThree: MapView.heightProvider provider is null.");
	}
	
	var self = this;

	this.mapView.heightProvider.fetchTile(this.level, this.x, this.y).then(function(image)
	{
		var texture = new Texture(image);
		texture.generateMipmaps = false;
		texture.format = RGBFormat;
		texture.magFilter = LinearFilter;
		texture.minFilter = LinearFilter;
		texture.needsUpdate = true;

		self.material.uniforms.heightMap.value = texture;
		
		self.heightLoaded = true;
		self.nodeReady();
	}).catch(function(err)
	{
		console.error("GeoThree: Failed to load height node data.", err);
		self.heightLoaded = true;
		self.nodeReady();
	});
};

export {MapHeightNodeShader};
