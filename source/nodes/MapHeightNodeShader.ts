import {BufferGeometry, Intersection, LinearFilter, Material, MeshPhongMaterial, NearestFilter, Raycaster, RGBAFormat, Texture, Vector3} from 'three';
import {MapHeightNode} from './MapHeightNode';
import {MapNodeGeometry} from '../geometries/MapNodeGeometry';
import {MapPlaneNode} from './MapPlaneNode';
import {UnitsUtils} from '../utils/UnitsUtils';
import {QuadTreePosition} from './MapNode';
import {MapView} from '../MapView';
import {TextureUtils} from '../utils/TextureUtils';

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
	public constructor(parentNode: MapHeightNode = null, mapView: MapView = null, location: number = QuadTreePosition.root, level: number = 0, x: number = 0, y: number = 0) 
	{
		const material: Material = MapHeightNodeShader.prepareMaterial(new MeshPhongMaterial({map: MapHeightNodeShader.emptyTexture, color: 0xFFFFFF}));

		super(parentNode, mapView, location, level, x, y, MapHeightNodeShader.geometry, material);

		this.frustumCulled = false;
	}

	/**
	 * Empty texture used as a placeholder for missing textures.
	 */
	public static emptyTexture: Texture = new Texture();

	/**
	 * Size of the grid of the geometry displayed on the scene for each tile.
	 */
	public static geometrySize: number = 256;

	/**
	 * Map node plane geometry.
	 */
	public static geometry: BufferGeometry = new MapNodeGeometry(1.0, 1.0, MapHeightNodeShader.geometrySize, MapHeightNodeShader.geometrySize, true);

	public static baseGeometry: BufferGeometry = MapPlaneNode.geometry;

	public static baseScale: Vector3 = new Vector3(UnitsUtils.EARTH_PERIMETER, 1, UnitsUtils.EARTH_PERIMETER);

	/**
	 * Prepare the three.js material to be used in the map tile.
	 *
	 * @param material - Material to be transformed.
	 */
	public static prepareMaterial(material: Material): Material
	{
		material.userData = {heightMap: {value: MapHeightNodeShader.emptyTexture}};

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

	public async loadData(): Promise<void> 
	{
		try 
		{
			const image = await this.mapView.provider.fetchTile(this.level, this.x, this.y);

			const texture = new Texture(image as any);
			texture.generateMipmaps = false;
			texture.format = RGBAFormat;
			texture.magFilter = LinearFilter;
			texture.minFilter = LinearFilter;
			texture.needsUpdate = true;
			
			// @ts-ignore
			this.material.map = texture;
		}
		catch (e) 
		{
			console.error('Geo-Three: Failed to load node tile data.', this);

			// @ts-ignore
			this.material.map = TextureUtils.createFillTexture();
		}

		// @ts-ignore
		this.material.needsUpdate = true;

		this.textureLoaded = true;
	}

	public async loadHeightGeometry(): Promise<void> 
	{
		if (this.mapView.heightProvider === null) 
		{
			throw new Error('GeoThree: MapView.heightProvider provider is null.');
		}

		try 
		{
			const texture = new Texture();
			texture.image = await this.mapView.heightProvider.fetchTile(this.level, this.x, this.y);
			texture.generateMipmaps = false;
			texture.format = RGBAFormat;
			texture.magFilter = NearestFilter;
			texture.minFilter = NearestFilter;
			texture.needsUpdate = true;
			
			// @ts-ignore
			this.material.userData.heightMap.value = texture;
		}
		catch (e) 
		{
			console.error('Geo-Three: Failed to load node tile height data.', this);

			// @ts-ignore
			this.material.map = TextureUtils.createFillTexture('#000000');
		}

		// @ts-ignore
		this.material.needsUpdate = true;

		this.heightLoaded = true;
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
			this.geometry = MapPlaneNode.geometry;

			super.raycast(raycaster, intersects);

			this.geometry = MapHeightNodeShader.geometry;
		}
	}
}
