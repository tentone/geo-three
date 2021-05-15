import {BufferGeometry, Intersection, LinearFilter, Material, Mesh, MeshPhongMaterial, NearestFilter, Object3D, Raycaster, RGBFormat, Texture, Vector3} from 'three';
import {MapHeightNode} from './MapHeightNode';
import {MapNodeGeometry} from '../geometries/MapNodeGeometry';
import {MapPlaneNode} from './MapPlaneNode';
import {UnitsUtils} from '../utils/UnitsUtils';
import {MapNode} from './MapNode';
import {MapView} from '../MapView';
import {CancelablePromise} from '../utils/CancelablePromise';

/**
 * Map height node that uses GPU height calculation to generate the deformed plane mesh.
 *
 * This solution is faster if no mesh interaction is required since all trasnformations are done in the GPU the transformed mesh cannot be accessed for CPU operations (e.g. raycasting).
 *
 * @param parentNode - The parent node of this node.
 * @param mapView - Map view object where this node is placed.
 * @param location - Position in the node tree relative to the parent.
 * @param level - Zoom level in the tile tree of the node.
 * @param x - X position of the node in the tile tree.
 * @param y - Y position of the node in the tile tree.
 */
export class MapHeightNodeShader extends MapHeightNode 
{
	public constructor(parentNode: MapHeightNode = null, mapView: MapView = null, location: number = MapNode.ROOT, level: number = 0, x: number = 0, y: number = 0) 
	{
		let material = new MeshPhongMaterial({map: MapHeightNodeShader.EMPTY_TEXTURE});
		// @ts-ignore
		material = MapHeightNodeShader.prepareMaterial(material);

		super(parentNode, mapView, location, level, x, y, material, MapHeightNodeShader.GEOMETRY);

		this.frustumCulled = false;
	}

	/**
	 * Empty texture used as a placeholder for missing textures.
	 */
	public static EMPTY_TEXTURE: Texture = new Texture();

	/**
	 * Size of the grid of the geometry displayed on the scene for each tile.
	 */
	public static GEOMETRY_SIZE: number = 256;

	/**
	 * Map node plane geometry.
	 */
	public static GEOMETRY: BufferGeometry = new MapNodeGeometry(1, 1, MapHeightNode.GEOMETRY_SIZE, MapHeightNode.GEOMETRY_SIZE);

	public static BASE_GEOMETRY: BufferGeometry = MapPlaneNode.GEOMETRY;

	public static BASE_SCALE: Vector3 = new Vector3(UnitsUtils.EARTH_PERIMETER, 1, UnitsUtils.EARTH_PERIMETER);

	/**
	 * Prepare the threejs material to be used in the map tile.
	 *
	 * @param material - Material to be transformed.
	 */
	public static prepareMaterial(material: Material): Material
	{
		material.userData = {heightMap: {value: MapHeightNodeShader.EMPTY_TEXTURE}};

		material.onBeforeCompile = (shader) => 
		{
			// Pass uniforms from userData to the
			for (const i in material.userData) 
			{
				shader.uniforms[i] = material.userData[i];
			}

			// Vertex variables
			shader.vertexShader =
				`
			uniform sampler2D heightMap;
			` + shader.vertexShader;

			// Vertex depth logic
			shader.vertexShader = shader.vertexShader.replace('#include <fog_vertex>', `
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
	}

	public loadTexture(): void 
	{
		this.mapView.provider.fetchTile(this.level, this.x, this.y).then(function(image) 
		{
			const texture = new Texture(image as any);
			texture.generateMipmaps = false;
			texture.format = RGBFormat;
			texture.magFilter = LinearFilter;
			texture.minFilter = LinearFilter;
			texture.needsUpdate = true;

			// @ts-ignore
			this.material.map = texture;
			this.textureLoaded = true;
			this.nodeReady();
		}).catch(function(err) 
		{
			console.error('GeoThree: Failed to load color node data.', err);
			this.textureLoaded = true;
			this.nodeReady();
		});

		this.loadHeightGeometry();
	}

	public loadHeightGeometry(): CancelablePromise<any> 
	{
		if (this.mapView.heightProvider === null) 
		{
			throw new Error('GeoThree: MapView.heightProvider provider is null.');
		}

		return this.mapView.heightProvider.fetchTile(this.level, this.x, this.y).then(function(image) 
		{
			const texture = new Texture(image as any);
			texture.generateMipmaps = false;
			texture.format = RGBFormat;
			texture.magFilter = NearestFilter;
			texture.minFilter = NearestFilter;
			texture.needsUpdate = true;

			// @ts-ignore
			this.material.userData.heightMap.value = texture;

			this.heightLoaded = true;
			this.nodeReady();
		}).catch(function(err) 
		{
			console.error('GeoThree: Failed to load height node data.', err);
			this.heightLoaded = true;
			this.nodeReady();
		});
	}

	/**
	 * Overrides normal raycasting, to avoid raycasting when isMesh is set to false.
	 *
	 * Switches the geometry for a simpler one for faster raycasting.
	 */
	public raycast(raycaster: Raycaster, intersects: Intersection[]): void
	{
		if (this.isMesh === true) 
		{
			this.geometry = MapPlaneNode.GEOMETRY;

			const result = super.raycast(raycaster, intersects);

			this.geometry = MapHeightNodeShader.GEOMETRY;

			return result;
		}
		
		// @ts-ignore
		return false;
	}
}
