import {LinearFilter, Material, Mesh, MeshPhongMaterial, BufferGeometry, RGBFormat, Texture, Vector3} from 'three';
import {MapNodeGeometry} from '../geometries/MapNodeGeometry';
import {MapNode} from './MapNode';
import {MapPlaneNode} from './MapPlaneNode';
import {UnitsUtils} from '../utils/UnitsUtils';

/**
 * Represents a height map tile node that can be subdivided into other height nodes.
 *
 * Its important to update match the height of the tile with the neighbors nodes edge heights to ensure proper continuity of the surface.
 *
 * The height node is designed to use MapBox elevation tile encoded data as described in https://www.mapbox.com/help/access-elevation-data/
 */
export class MapHeightNode extends MapNode 
{
	public static USE_DISPLACEMENT: boolean = false;

	public static MAX_HEIGHT: number = 0;

	/**
	 * Flag indicating if the tile height data was loaded.
	 */
	public heightLoaded: boolean = false;

	/**
	 * Flag indicating if the tile texture was loaded.
	 */
	public textureLoaded: boolean = false;

	/**
	 * Map height node constructor.
	 *
	 * @param parentNode {MapHeightNode} The parent node of this node.
	 * @param mapView {MapView} Map view object where this node is placed.
	 * @param location {number} Position in the node tree relative to the parent.
	 * @param level {number} Zoom level in the tile tree of the node.
	 * @param x {number} X position of the node in the tile tree.
	 * @param y {number} Y position of the node in the tile tree.
	 * @param material {Material} Material used to render this height node.
	 * @param geometry {Geometry} Geometry used to render this height node.
	 */
	public constructor(parentNode = null, mapView = null, location = MapNode.ROOT, level = 0, x = 0, y = 0, material?: Material, geometry?) 
	{
		super(
			geometry === undefined ? MapHeightNode.GEOMETRY : geometry,
			material ||
				new MeshPhongMaterial({
					color: 0x000000,
					specular: 0x000000,
					shininess: 0,
					wireframe: false,
					emissive: 0xffffff
				}),
			parentNode,
			mapView,
			location,
			level,
			x,
			y
		);

		this.matrixAutoUpdate = false;
		this.isMesh = true;
		this.visible = false;


		this.textureLoaded = false;
		this.heightLoaded = false;
	}

	/**
	 * Original tile size of the images retrieved from the height provider.
	 */
	public static TILE_SIZE: number = 256;

	/**
	 * Size of the grid of the geometry displayed on the scene for each tile.}
	 */
	public static GEOMETRY_SIZE: number = 16;

	/**
	 * Map node plane geometry.
	 */
	public static GEOMETRY: BufferGeometry = new MapNodeGeometry(1, 1, MapHeightNode.GEOMETRY_SIZE, MapHeightNode.GEOMETRY_SIZE);

	public static BASE_GEOMETRY: BufferGeometry = MapPlaneNode.GEOMETRY;

	public static BASE_SCALE: Vector3 = new Vector3(UnitsUtils.EARTH_PERIMETER, 1, UnitsUtils.EARTH_PERIMETER);

	public initialize(): void 
	{
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
		const self = this;

		this.mapView.provider.fetchTile(this.level, this.x, this.y).then(function(image) 
		{
			const texture = new Texture(image as any);
			texture.generateMipmaps = false;
			texture.format = RGBFormat;
			texture.magFilter = LinearFilter;
			texture.minFilter = LinearFilter;
			texture.needsUpdate = true;

			// @ts-ignore
			self.material.emissiveMap = texture;

			self.textureLoaded = true;
			self.nodeReady();
		});
	}

	public nodeReady(): void 
	{
		if (!this.heightLoaded || !this.textureLoaded) 
		{
			return;
		}

		this.visible = true;

		MapNode.prototype.nodeReady.call(this);
	}

	public createChildNodes(): void 
	{
		const level = this.level + 1;

		const x = this.x * 2;
		const y = this.y * 2;

		let node = new MapHeightNode(this, this.mapView, MapNode.TOP_LEFT, level, x, y);
		node.scale.set(0.5, 1, 0.5);
		node.position.set(-0.25, 0, -0.25);
		this.add(node);
		node.updateMatrix();
		node.updateMatrixWorld(true);

		node = new MapHeightNode(this, this.mapView, MapNode.TOP_RIGHT, level, x + 1, y);
		node.scale.set(0.5, 1, 0.5);
		node.position.set(0.25, 0, -0.25);
		this.add(node);
		node.updateMatrix();
		node.updateMatrixWorld(true);

		node = new MapHeightNode(this, this.mapView, MapNode.BOTTOM_LEFT, level, x, y + 1);
		node.scale.set(0.5, 1, 0.5);
		node.position.set(-0.25, 0, 0.25);
		this.add(node);
		node.updateMatrix();
		node.updateMatrixWorld(true);

		node = new MapHeightNode(this, this.mapView, MapNode.BOTTOM_RIGHT, level, x + 1, y + 1);
		node.scale.set(0.5, 1, 0.5);
		node.position.set(0.25, 0, 0.25);
		this.add(node);
		node.updateMatrix();
		node.updateMatrixWorld(true);
	}

	/**
	 * Load height texture from the server and create a geometry to match it.
	 *
	 * @returns {Promise<void>} Returns a promise indicating when the geometry generation has finished.
	 */
	public loadHeightGeometry(): void 
	{
		if (this.mapView.heightProvider === null) 
		{
			throw new Error('GeoThree: MapView.heightProvider provider is null.');
		}

		const self = this;

		this.mapView.heightProvider
			.fetchTile(this.level, this.x, this.y)
			.then(function(image) 
			{
				const geometry = new MapNodeGeometry(1, 1, MapHeightNode.GEOMETRY_SIZE, MapHeightNode.GEOMETRY_SIZE);
				const vertices = geometry.attributes.position.array as number[];

				const canvas = new OffscreenCanvas(MapHeightNode.GEOMETRY_SIZE + 1, MapHeightNode.GEOMETRY_SIZE + 1);

				const context = canvas.getContext('2d');
				context.imageSmoothingEnabled = false;
				context.drawImage(image, 0, 0, MapHeightNode.TILE_SIZE, MapHeightNode.TILE_SIZE, 0, 0, canvas.width, canvas.height);

				const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
				const data = imageData.data;
				for (let i = 0, j = 0; i < data.length && j < vertices.length; i += 4, j += 3) 
				{
					const r = data[i];
					const g = data[i + 1];
					const b = data[i + 2];

					// The value will be composed of the bits RGB
					const value = (r * 65536 + g * 256 + b) * 0.1 - 1e4;

					vertices[j + 1] = value;
				}

				self.geometry = geometry;
				self.heightLoaded = true;
				self.nodeReady();
			})
			.catch(function() 
			{
				console.error('GeoThree: Failed to load height node data.', this);
				self.heightLoaded = true;
				self.nodeReady();
			});
	}

	/**
	 * Overrides normal raycasting, to avoid raycasting when isMesh is set to false.
	 */
	public raycast(raycaster: Raycaster, intersects: Object3D[]): boolean
	{
		if (this.isMesh === true) 
		{
			return Mesh.prototype.raycast.call(this, raycaster, intersects);
		}

		return false;
	}
}
