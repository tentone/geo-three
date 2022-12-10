import {BufferGeometry, DoubleSide, Float32BufferAttribute, Material, MeshPhongMaterial, NearestFilter, RGBAFormat, Texture, Uint32BufferAttribute} from 'three';
import {MapNodeGeometry} from '../geometries/MapNodeGeometry';
import {MapView} from '../MapView';
import {Martini} from './Martini';
import {MapHeightNode} from './MapHeightNode';
import {CanvasUtils} from '../utils/CanvasUtils';
import {QuadTreePosition} from './MapNode';

/** 
 * Represents a height map tile node using the RTIN method from the paper "Right Triangulated Irregular Networks".
 * 
 * Based off the library https://github.com/mapbox/martini (Mapbox's Awesome Right-Triangulated Irregular Networks, Improved)
 *
 * @param parentNode - The parent node of this node.
 * @param mapView - Map view object where this node is placed.
 * @param location - Position in the node tree relative to the parent.
 * @param level - Zoom level in the tile tree of the node.
 * @param x - X position of the node in the tile tree.
 * @param y - Y position of the node in the tile tree.
 * @param material   -Material used to render this height node.
 * @param geometry - Geometry used to render this height node.
 */
export class MapMartiniHeightNode extends MapHeightNode
{
	/**
	 * Geometry size to be used for each martini height node.
	 */
	public static geometrySize: number = 16;

	/**
	 * Empty texture used as a placeholder for missing textures.
	 */
	public static emptyTexture: Texture = new Texture();
	
	/**
	 * Base geometry appied before any custom geometru is used.
	 */
	public static geometry = new MapNodeGeometry(1, 1, 1, 1);

	/**
	 * Elevation decoder configuration.
	 * 
	 * Indicates how the pixels should be unpacked and transformed into height data.
	 */
	public elevationDecoder: any = {
		rScaler: 256,
		gScaler: 1,
		bScaler: 1 / 256,
		offset: -32768
	};

	/**
	 * Original tile size of the images retrieved from the height provider.
	 */
	public static tileSize: number = 256;

	/**
	 * Exageration (scale) of the terrain height.
	 */
	public exageration = 1.0;

	/**
	 * Max admissible error in the mesh generation.
	 */
	public meshMaxError: number | Function = 10;

	public material: MeshPhongMaterial;

	public constructor(parentNode: MapHeightNode = null, mapView: MapView = null, location: number = QuadTreePosition.root, level: number = 0, x: number = 0, y: number = 0, {elevationDecoder = null, meshMaxError = 10, exageration = 1} = {})
	{
		super(parentNode, mapView, location, level, x, y, MapMartiniHeightNode.geometry, MapMartiniHeightNode.prepareMaterial(new MeshPhongMaterial({
			map: MapMartiniHeightNode.emptyTexture,
			color: 0xFFFFFF,
			side: DoubleSide
		}), level, exageration));

		
		// Set elevation decoder method
		if (elevationDecoder) 
		{
			this.elevationDecoder = elevationDecoder;
		}

		this.meshMaxError = meshMaxError;
		this.exageration = exageration;
		this.frustumCulled = false;
	}

	/**
	 * Prepare materia for usage in the height node.
	 * 
	 * @param material - Material to be prepared for usage.
	 * @param level - Depth of the tree.
	 * @param exageration - Exageration to apply to the terrain.
	 * @returns The material trasnformed.
	 */
	public static prepareMaterial(material: Material, level: number, exageration: number = 1.0): Material 
	{
		material.userData = {
			heightMap: {value: MapMartiniHeightNode.emptyTexture},
			drawNormals: {value: 0},
			drawBlack: {value: 0},
			zoomlevel: {value: level},
			computeNormals: {value: 1},
			drawTexture: {value: 1}
		};

		material.onBeforeCompile = (shader) => 
		{
			// Pass uniforms from userData to the
			for (let i in material.userData) 
			{
				shader.uniforms[i] = material.userData[i];
			}

			// Vertex variables
			shader.vertexShader =
				`
				uniform bool computeNormals;
				uniform float zoomlevel;
				uniform sampler2D heightMap;
				` + shader.vertexShader;
			
			shader.fragmentShader =
				`
				uniform bool drawNormals;
				uniform bool drawTexture;
				uniform bool drawBlack;
				` + shader.fragmentShader;

			// Vertex depth logic
			shader.fragmentShader = shader.fragmentShader.replace('#include <dithering_fragment>',
				`
				if(drawBlack) {
					gl_FragColor = vec4( 0.0,0.0,0.0, 1.0 );
				} else if(drawNormals) {
					gl_FragColor = vec4( ( 0.5 * vNormal + 0.5 ), 1.0 );
				} else if (!drawTexture) {
					gl_FragColor = vec4( 0.0,0.0,0.0, 0.0 );
				}`
			);

			shader.vertexShader = shader.vertexShader.replace('#include <fog_vertex>',
				`
				#include <fog_vertex>

				// queried pixels:
				// +-----------+
				// |   |   |   |
				// | a | b | c |
				// |   |   |   |
				// +-----------+
				// |   |   |   |
				// | d | e | f |
				// |   |   |   |
				// +-----------+
				// |   |   |   |
				// | g | h | i |
				// |   |   |   |
				// +-----------+

				if (computeNormals) {
					float e = getElevation(vUv, 0.0);
					ivec2 size = textureSize(heightMap, 0);
					float offset = 1.0 / float(size.x);
					float a = getElevation(vUv + vec2(-offset, -offset), 0.0);
					float b = getElevation(vUv + vec2(0, -offset), 0.0);
					float c = getElevation(vUv + vec2(offset, -offset), 0.0);
					float d = getElevation(vUv + vec2(-offset, 0), 0.0);
					float f = getElevation(vUv + vec2(offset, 0), 0.0);
					float g = getElevation(vUv + vec2(-offset, offset), 0.0);
					float h = getElevation(vUv + vec2(0, offset), 0.0);
					float i = getElevation(vUv + vec2(offset,offset), 0.0);


					float normalLength = 500.0 / zoomlevel;

					vec3 v0 = vec3(0.0, 0.0, 0.0);
					vec3 v1 = vec3(0.0, normalLength, 0.0);
					vec3 v2 = vec3(normalLength, 0.0, 0.0);
					v0.z = (e + d + g + h) / 4.0;
					v1.z = (e+ b + a + d) / 4.0;
					v2.z = (e+ h + i + f) / 4.0;
					vNormal = (normalize(cross(v2 - v0, v1 - v0))).rbg;
				}
				`
			);
		};

		return material;
	}
	
	/**
	 * Get terrain points from image data.
	 * 
	 * @param imageData - Terrain data encoded as image.
	 * @param tileSize - Tile size.
	 * @param elevation - Elevation scale (r, g, b, offset) object.
	 * @returns The terrain elevation as a Float32 array.
	 */
	public static getTerrain(imageData: Uint8ClampedArray, tileSize: number, elevation: any): Float32Array
	{
		const {rScaler, bScaler, gScaler, offset} = elevation;
		const gridSize = tileSize + 1;

		// From Martini demo
		// https://observablehq.com/@mourner/martin-real-time-rtin-terrain-mesh
		const terrain = new Float32Array(gridSize * gridSize);

		// Decode terrain values
		for (let i = 0, y = 0; y < tileSize; y++) 
		{
			for (let x = 0; x < tileSize; x++, i++) 
			{
				const k = i * 4;
				const r = imageData[k + 0];
				const g = imageData[k + 1];
				const b = imageData[k + 2];
				terrain[i + y] = r * rScaler + g * gScaler + b * bScaler + offset;
			}
		}

		// Backfill bottom border
		for (let i = gridSize * (gridSize - 1), x = 0; x < gridSize - 1; x++, i++) 
		{
			terrain[i] = terrain[i - gridSize];
		}

		// Backfill right border
		for (let i = gridSize - 1, y = 0; y < gridSize; y++, i += gridSize) 
		{
			terrain[i] = terrain[i - 1];
		}

		return terrain;
	}
	
	/**
	 * Get the attributes that compose the mesh.
	 * 
	 * @param vertices - Vertices.
	 * @param terrain  - Terrain
	 * @param tileSize - Size of each tile.
	 * @param bounds - Array with the bound of the map.
	 * @param exageration - Vertical exageration of the map scale.
	 * @returns The position and UV coordinates of the mesh.
	 */
	public static getMeshAttributes(vertices: number[], terrain: Float32Array, tileSize: number, bounds: number[], exageration: number): {position: {value: Float32Array, size: number}, uv: {value: Float32Array, size: number}}
	{
		const gridSize = tileSize + 1;
		const numOfVerticies = vertices.length / 2;
	
		// vec3. x, y in pixels, z in meters
		const positions = new Float32Array(numOfVerticies * 3);
	
		// vec2. 1 to 1 relationship with position. represents the uv on the texture image. 0,0 to 1,1.
		const texCoords = new Float32Array(numOfVerticies * 2);

		const [minX, minY, maxX, maxY] = bounds || [0, 0, tileSize, tileSize];
		const xScale = (maxX - minX) / tileSize;
		const yScale = (maxY - minY) / tileSize;

		for (let i = 0; i < numOfVerticies; i++) 
		{
			const x = vertices[i * 2];
			const y = vertices[i * 2 + 1];
			const pixelIdx = y * gridSize + x;

			positions[3 * i + 0] = x * xScale + minX;
			positions[3 * i + 1] = -terrain[pixelIdx] * exageration;
			positions[3 * i + 2] = -y * yScale + maxY;
	
			texCoords[2 * i + 0] = x / tileSize;
			texCoords[2 * i + 1] = y / tileSize;
		}

		return {
			position: {value: positions, size: 3},
			uv: {value: texCoords, size: 2}
		};
	}	

	/**
	 * Process the height texture received from the tile data provider.
	 * 
	 * @param image - Image element received by the tile provider.
	 */
	public async processHeight(image: HTMLImageElement): Promise<void> 
	{
		const tileSize = image.width;
		const gridSize = tileSize + 1;
		var canvas = CanvasUtils.createOffscreenCanvas(tileSize, tileSize);

		var context = canvas.getContext('2d');
		context.imageSmoothingEnabled = false;
		context.drawImage(image, 0, 0, tileSize, tileSize, 0, 0, canvas.width, canvas.height);
		
		var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
		var data = imageData.data;

		const terrain = MapMartiniHeightNode.getTerrain(data, tileSize, this.elevationDecoder);
		const martini = new Martini(gridSize);
		const tile = martini.createTile(terrain);
		const {vertices, triangles} = tile.getMesh(typeof this.meshMaxError === 'function' ? this.meshMaxError(this.level) : this.meshMaxError);

		const attributes = MapMartiniHeightNode.getMeshAttributes(vertices, terrain, tileSize, [-0.5, -0.5, 0.5, 0.5], this.exageration);

		this.geometry = new BufferGeometry();
		this.geometry.setIndex(new Uint32BufferAttribute(triangles, 1));
		this.geometry.setAttribute('position', new Float32BufferAttribute( attributes.position.value, attributes.position.size));
		this.geometry.setAttribute('uv', new Float32BufferAttribute( attributes.uv.value, attributes.uv.size));
		this.geometry.rotateX(Math.PI);

		var texture = new Texture(image);
		texture.generateMipmaps = false;
		texture.format = RGBAFormat;
		texture.magFilter = NearestFilter;
		texture.minFilter = NearestFilter;
		texture.needsUpdate = true;

		this.material.userData.heightMap.value = texture;
		// @ts-ignore
		this.material.map = texture;
		// @ts-ignore
		this.material.needsUpdate = true;
	}
	
	/**
	 * Load height texture from the server and create a geometry to match it.
	 */
	public async loadHeightGeometry(): Promise<void> 
	{
		if (this.mapView.heightProvider === null) 
		{
			throw new Error('GeoThree: MapView.heightProvider provider is null.');
		}

		const image = await this.mapView.heightProvider.fetchTile(this.level, this.x, this.y);

		if (this.disposed) {
			return;
		}

		this.processHeight(image);

		this.heightLoaded = true;
		this.nodeReady();
	}
}
