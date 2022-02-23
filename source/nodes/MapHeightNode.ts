import {LinearFilter, Material, MeshPhongMaterial, BufferGeometry, RGBAFormat, Texture, Vector3, Raycaster, Intersection} from 'three';
import {MapNodeGeometry} from '../geometries/MapNodeGeometry';
import {MapNode} from './MapNode';
import {MapPlaneNode} from './MapPlaneNode';
import {UnitsUtils} from '../utils/UnitsUtils';
import {MapView} from '../MapView';
import {MapNodeHeightGeometry} from '../geometries/MapNodeHeightGeometry';
import {CanvasUtils} from '../utils/CanvasUtils';

/**
 * Represents a height map tile node that can be subdivided into other height nodes.
 *
 * Its important to update match the height of the tile with the neighbors nodes edge heights to ensure proper continuity of the surface.
 *
 * The height node is designed to use MapBox elevation tile encoded data as described in https://www.mapbox.com/help/access-elevation-data/
 */
export class MapHeightNode extends MapNode 
{
	/**
	 * Flag indicating if the tile height data was loaded.
	 */
	public heightLoaded: boolean = false;

	/**
	 * Flag indicating if the tile texture was loaded.
	 */
	public textureLoaded: boolean = false;

	/**
	 * Original tile size of the images retrieved from the height provider.
	 */
	public static tileSize: number = 256;

	/**
	 * Size of the grid of the geometry displayed on the scene for each tile.
	 */
	public geometrySize: number = 16;

	/**
	 * If true the tiles will compute their normals.
	 */
	public geometryNormals: boolean = false;

	/**
	 * Map node plane geometry.
	 */
	public static geometry: BufferGeometry = new MapNodeGeometry(1, 1, 1, 1);

	public static baseGeometry: BufferGeometry = MapPlaneNode.geometry;

	public static baseScale: Vector3 = new Vector3(UnitsUtils.EARTH_PERIMETER, 1, UnitsUtils.EARTH_PERIMETER);

	/**
	 * Map height node constructor.
	 *
	 * @param parentNode - The parent node of this node.
	 * @param mapView - Map view object where this node is placed.
	 * @param location - Position in the node tree relative to the parent.
	 * @param level - Zoom level in the tile tree of the node.
	 * @param x - X position of the node in the tile tree.
	 * @param y - Y position of the node in the tile tree.
	 * @param material - Material used to render this height node.
	 * @param geometry - Geometry used to render this height node.
	 */
	public constructor(parentNode: MapHeightNode = null, mapView: MapView = null, location: number = MapNode.root, level: number = 0, x: number = 0, y: number = 0, geometry: BufferGeometry = MapHeightNode.geometry, material: Material = new MeshPhongMaterial({wireframe: false, color: 0xffffff})) 
	{
		super(parentNode, mapView, location, level, x, y, geometry, material);

		this.isMesh = true;
		this.visible = false;
		this.matrixAutoUpdate = false;
	}

	public initialize(): void 
	{
		super.initialize();

		this.loadTexture();
		this.loadHeightGeometry();
	}

	/**
	 * Load tile texture from the server.
	 *
	 * Aditionally in this height node it loads elevation data from the height provider and generate the appropiate maps.
	 */
	public loadTexture(): void 
	{
		this.mapView.provider.fetchTile(this.level, this.x, this.y).then((image) => 
		{
			const texture = new Texture(image as any);
			texture.generateMipmaps = false;
			texture.format = RGBAFormat;
			texture.magFilter = LinearFilter;
			texture.minFilter = LinearFilter;
			texture.needsUpdate = true;

			// @ts-ignore
			this.material.map = texture;
		}).finally(() =>
		{
			this.textureLoaded = true;
			this.nodeReady();
		});
	}

	public nodeReady(): void 
	{
		if (!this.heightLoaded || !this.textureLoaded) 
		{
			return;
		}

		this.visible = true;

		super.nodeReady();
	}

	public createChildNodes(): void 
	{
		const level = this.level + 1;
		const Constructor = Object.getPrototypeOf(this).constructor;

		const x = this.x * 2;
		const y = this.y * 2;
		let node = new Constructor(this, this.mapView, MapNode.topLeft, level, x, y);
		node.scale.set(0.5, 1.0, 0.5);
		node.position.set(-0.25, 0, -0.25);
		this.add(node);
		node.updateMatrix();
		node.updateMatrixWorld(true);

		node = new Constructor(this, this.mapView, MapNode.topRight, level, x + 1, y);
		node.scale.set(0.5, 1.0, 0.5);
		node.position.set(0.25, 0, -0.25);
		this.add(node);
		node.updateMatrix();
		node.updateMatrixWorld(true);

		node = new Constructor(this, this.mapView, MapNode.bottomLeft, level, x, y + 1);
		node.scale.set(0.5, 1.0, 0.5);
		node.position.set(-0.25, 0, 0.25);
		this.add(node);
		node.updateMatrix();
		node.updateMatrixWorld(true);

		node = new Constructor(this, this.mapView, MapNode.bottomRight, level, x + 1, y + 1);
		node.scale.set(0.5, 1.0, 0.5);
		node.position.set(0.25, 0, 0.25);
		this.add(node);
		node.updateMatrix();
		node.updateMatrixWorld(true);
	}

	/**
	 * Load height texture from the server and create a geometry to match it.
	 *
	 * @returns Returns a promise indicating when the geometry generation has finished.
	 */
	public loadHeightGeometry(): Promise<any> 
	{
		if (this.mapView.heightProvider === null) 
		{
			throw new Error('GeoThree: MapView.heightProvider provider is null.');
		}

		return this.mapView.heightProvider.fetchTile(this.level, this.x, this.y).then((image) => 
		{
			const canvas = CanvasUtils.createOffscreenCanvas(this.geometrySize + 1, this.geometrySize + 1);

			const context = canvas.getContext('2d');
			context.imageSmoothingEnabled = false;
			context.drawImage(image, 0, 0, MapHeightNode.tileSize, MapHeightNode.tileSize, 0, 0, canvas.width, canvas.height);

			const imageData = context.getImageData(0, 0, canvas.width, canvas.height);

			const geometry = new MapNodeHeightGeometry(1, 1, this.geometrySize, this.geometrySize, true, 10.0, imageData, true);

			this.geometry = geometry;
		}).catch(() =>
		{
			console.error('GeoThree: Failed to load height node data.', this);
		}).finally(() =>
		{
			this.heightLoaded = true;
			this.nodeReady();
		});
	}

	/**
	 * Overrides normal raycasting, to avoid raycasting when isMesh is set to false.
	 */
	public raycast(raycaster: Raycaster, intersects: Intersection[]): void
	{
		if (this.isMesh === true) 
		{
			return super.raycast(raycaster, intersects);
		}

		// @ts-ignore
		return false;
	}
}
