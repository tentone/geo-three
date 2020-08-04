import {Texture, LinearFilter, NearestFilter, RGBFormat, ShaderMaterial, UVMapping, ClampToEdgeWrapping} from "three";
import {MapHeightNode} from "./MapHeightNode.js";

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
		float height = ((theight.r * 65536.0 + theight.g * 256.0 + theight.b) * 0.1) - 10000.0;
		vec3 transformed = position + height * normal;

		gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
	}`;

	var fragmentShader = `
	varying vec2 vUv;

	uniform sampler2D colorMap;

	void main() {
		gl_FragColor = vec4(texture2D(colorMap, vUv).rgb, 1.0);
	}`;

	var material = new ShaderMaterial( {
		uniforms: {
			colorMap: {type: "t", value: new Texture()},
			heightMap: {type: "t", value: new Texture()}
		},
		vertexShader: vertexShader,
		fragmentShader: fragmentShader
	});

	MapHeightNode.call(this, parentNode, mapView, location, level, x, y, material);

	this.frustumCulled = false;
}

MapHeightNodeShader.prototype = Object.create(MapHeightNode.prototype);

MapHeightNodeShader.prototype.constructor = MapHeightNodeShader;

MapHeightNodeShader.prototype.loadTexture = function()
{
	var self = this;

	this.mapView.fetchTile(this.level, this.x, this.y).then(function(image)
	{
		let texture = new Texture(image, UVMapping, ClampToEdgeWrapping, LinearFilter, LinearFilter, RGBFormat);
		texture.generateMipmaps = false;
		texture.needsUpdate = true;

		self.material.uniforms.colorMap.value = texture;
		self.material.uniformsNeedUpdate = true;

		self.textureLoaded = true;
		self.nodeReady();
	}).catch(function(err)
	{
		console.error("GeoThree: Failed to load color node data.", err);
		self.heightLoaded = true;
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
		var texture = new Texture(image, UVMapping, ClampToEdgeWrapping, NearestFilter, NearestFilter, RGBFormat);
		texture.generateMipmaps = false;
		texture.needsUpdate = true;
		
		self.material.uniforms.heightMap.value = texture;
		self.material.uniformsNeedUpdate = true;

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
