import { BufferGeometry, Float32BufferAttribute, Mesh, Texture, RGBFormat, LinearFilter, Vector2, MeshBasicMaterial, Vector3, MeshPhongMaterial, Matrix4, Quaternion, NearestFilter, Raycaster, DoubleSide, Uint32BufferAttribute, Frustum, Color } from 'three';

class MapProvider {
    constructor() {
        this.name = '';
        this.minZoom = 0;
        this.maxZoom = 20;
        this.bounds = [];
        this.center = [];
    }
    fetchTile(zoom, x, y) {
        return null;
    }
    getMetaData() { }
}

class OpenStreetMapsProvider extends MapProvider {
    constructor(address = 'https://a.tile.openstreetmap.org/') {
        super();
        this.address = address;
        this.format = 'png';
    }
    fetchTile(zoom, x, y) {
        return new Promise((resolve, reject) => {
            const image = document.createElement('img');
            image.onload = function () {
                resolve(image);
            };
            image.onerror = function () {
                reject();
            };
            image.crossOrigin = 'Anonymous';
            image.src = this.address + '/' + zoom + '/' + x + '/' + y + '.' + this.format;
        });
    }
}

class MapNodeGeometry extends BufferGeometry {
    constructor(width = 1.0, height = 1.0, widthSegments = 1.0, heightSegments = 1.0, skirt = false, skirtDepth = 10.0) {
        super();
        const indices = [];
        const vertices = [];
        const normals = [];
        const uvs = [];
        MapNodeGeometry.buildPlane(width, height, widthSegments, heightSegments, indices, vertices, normals, uvs);
        if (skirt) {
            MapNodeGeometry.buildSkirt(width, height, widthSegments, heightSegments, skirtDepth, indices, vertices, normals, uvs);
        }
        this.setIndex(indices);
        this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
        this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
    }
    static buildPlane(width = 1.0, height = 1.0, widthSegments = 1.0, heightSegments = 1.0, indices, vertices, normals, uvs) {
        const widthHalf = width / 2;
        const heightHalf = height / 2;
        const gridX = widthSegments + 1;
        const gridZ = heightSegments + 1;
        const segmentWidth = width / widthSegments;
        const segmentHeight = height / heightSegments;
        for (let iz = 0; iz < gridZ; iz++) {
            const z = iz * segmentHeight - heightHalf;
            for (let ix = 0; ix < gridX; ix++) {
                const x = ix * segmentWidth - widthHalf;
                vertices.push(x, 0, z);
                normals.push(0, 1, 0);
                uvs.push(ix / widthSegments, 1 - iz / heightSegments);
            }
        }
        for (let iz = 0; iz < heightSegments; iz++) {
            for (let ix = 0; ix < widthSegments; ix++) {
                const a = ix + gridX * iz;
                const b = ix + gridX * (iz + 1);
                const c = ix + 1 + gridX * (iz + 1);
                const d = ix + 1 + gridX * iz;
                indices.push(a, b, d, b, c, d);
            }
        }
    }
    static buildSkirt(width = 1.0, height = 1.0, widthSegments = 1.0, heightSegments = 1.0, skirtDepth, indices, vertices, normals, uvs) {
        const widthHalf = width / 2;
        const heightHalf = height / 2;
        const gridX = widthSegments + 1;
        const gridZ = heightSegments + 1;
        const segmentWidth = width / widthSegments;
        const segmentHeight = height / heightSegments;
        let start = vertices.length / 3;
        for (let ix = 0; ix < gridX; ix++) {
            const x = ix * segmentWidth - widthHalf;
            const z = -heightHalf;
            vertices.push(x, -skirtDepth, z);
            normals.push(0, 1, 0);
            uvs.push(ix / widthSegments, 1);
        }
        for (let ix = 0; ix < widthSegments; ix++) {
            const a = ix;
            const d = ix + 1;
            const b = ix + start;
            const c = ix + start + 1;
            indices.push(d, b, a, d, c, b);
        }
        start = vertices.length / 3;
        for (let ix = 0; ix < gridX; ix++) {
            const x = ix * segmentWidth - widthHalf;
            const z = heightSegments * segmentHeight - heightHalf;
            vertices.push(x, -skirtDepth, z);
            normals.push(0, 1, 0);
            uvs.push(ix / widthSegments, 0);
        }
        let offset = gridX * gridZ - widthSegments - 1;
        for (let ix = 0; ix < widthSegments; ix++) {
            const a = offset + ix;
            const d = offset + ix + 1;
            const b = ix + start;
            const c = ix + start + 1;
            indices.push(a, b, d, b, c, d);
        }
        start = vertices.length / 3;
        for (let iz = 0; iz < gridZ; iz++) {
            const z = iz * segmentHeight - heightHalf;
            const x = -widthHalf;
            vertices.push(x, -skirtDepth, z);
            normals.push(0, 1, 0);
            uvs.push(0, 1 - iz / heightSegments);
        }
        for (let iz = 0; iz < heightSegments; iz++) {
            const a = iz * gridZ;
            const d = (iz + 1) * gridZ;
            const b = iz + start;
            const c = iz + start + 1;
            indices.push(a, b, d, b, c, d);
        }
        start = vertices.length / 3;
        for (let iz = 0; iz < gridZ; iz++) {
            const z = iz * segmentHeight - heightHalf;
            const x = widthSegments * segmentWidth - widthHalf;
            vertices.push(x, -skirtDepth, z);
            normals.push(0, 1, 0);
            uvs.push(1.0, 1 - iz / heightSegments);
        }
        for (let iz = 0; iz < heightSegments; iz++) {
            const a = iz * gridZ + heightSegments;
            const d = (iz + 1) * gridZ + heightSegments;
            const b = iz + start;
            const c = iz + start + 1;
            indices.push(d, b, a, d, c, b);
        }
    }
}

class MapNode extends Mesh {
    constructor(parentNode = null, mapView = null, location = MapNode.root, level = 0, x = 0, y = 0, geometry = null, material = null) {
        super(geometry, material);
        this.mapView = null;
        this.parentNode = null;
        this.nodesLoaded = 0;
        this.subdivided = false;
        this.childrenCache = null;
        this.cacheChild = false;
        this.isMesh = true;
        this.mapView = mapView;
        this.parentNode = parentNode;
        this.location = location;
        this.level = level;
        this.x = x;
        this.y = y;
        this.initialize();
    }
    initialize() { }
    createChildNodes() { }
    subdivide() {
        const maxZoom = Math.min(this.mapView.provider.maxZoom, this.mapView.heightProvider.maxZoom);
        if (this.children.length > 0 || this.level + 1 > maxZoom || this.parentNode !== null && this.parentNode.nodesLoaded < MapNode.childrens) {
            return;
        }
        this.subdivided = true;
        if (this.cacheChild && this.childrenCache !== null) {
            this.isMesh = false;
            this.children = this.childrenCache;
        }
        else {
            this.createChildNodes();
        }
    }
    simplify() {
        if (this.cacheChild && this.children.length > 0) {
            this.childrenCache = this.children;
        }
        this.subdivided = false;
        this.isMesh = true;
        this.children = [];
    }
    loadTexture() {
        this.mapView.provider.fetchTile(this.level, this.x, this.y).then((image) => {
            const texture = new Texture(image);
            texture.generateMipmaps = false;
            texture.format = RGBFormat;
            texture.magFilter = LinearFilter;
            texture.minFilter = LinearFilter;
            texture.needsUpdate = true;
            this.material.map = texture;
            this.nodeReady();
        }).catch(() => {
            const canvas = new OffscreenCanvas(1, 1);
            const context = canvas.getContext('2d');
            context.fillStyle = '#FF0000';
            context.fillRect(0, 0, 1, 1);
            const texture = new Texture(canvas);
            texture.generateMipmaps = false;
            texture.needsUpdate = true;
            this.material.map = texture;
            this.nodeReady();
        });
    }
    nodeReady() {
        if (this.parentNode !== null) {
            this.parentNode.nodesLoaded++;
            if (this.parentNode.nodesLoaded >= MapNode.childrens) {
                if (this.parentNode.subdivided === true) {
                    this.parentNode.isMesh = false;
                }
                for (let i = 0; i < this.parentNode.children.length; i++) {
                    this.parentNode.children[i].visible = true;
                }
            }
        }
        else {
            this.visible = true;
        }
    }
    getNeighborsDirection(direction) {
        return null;
    }
    getNeighbors() {
        const neighbors = [];
        return neighbors;
    }
}
MapNode.baseGeometry = null;
MapNode.baseScale = null;
MapNode.childrens = 4;
MapNode.root = -1;
MapNode.topLeft = 0;
MapNode.topRight = 1;
MapNode.bottomLeft = 2;
MapNode.bottomRight = 3;

class UnitsUtils {
    static get(onResult, onError) {
        navigator.geolocation.getCurrentPosition(function (result) {
            onResult(result.coords, result.timestamp);
        }, onError);
    }
    static datumsToSpherical(latitude, longitude) {
        const x = longitude * UnitsUtils.EARTH_ORIGIN / 180.0;
        let y = Math.log(Math.tan((90 + latitude) * Math.PI / 360.0)) / (Math.PI / 180.0);
        y = y * UnitsUtils.EARTH_ORIGIN / 180.0;
        return new Vector2(x, y);
    }
    static sphericalToDatums(x, y) {
        const longitude = x / UnitsUtils.EARTH_ORIGIN * 180.0;
        let latitude = y / UnitsUtils.EARTH_ORIGIN * 180.0;
        latitude = 180.0 / Math.PI * (2 * Math.atan(Math.exp(latitude * Math.PI / 180.0)) - Math.PI / 2.0);
        return { latitude: latitude, longitude: longitude };
    }
    static quadtreeToDatums(zoom, x, y) {
        const n = Math.pow(2.0, zoom);
        const longitude = x / n * 360.0 - 180.0;
        const latitudeRad = Math.atan(Math.sinh(Math.PI * (1.0 - 2.0 * y / n)));
        const latitude = 180.0 * (latitudeRad / Math.PI);
        return { latitude: latitude, longitude: longitude };
    }
}
UnitsUtils.EARTH_RADIUS = 6378137;
UnitsUtils.EARTH_PERIMETER = 2 * Math.PI * UnitsUtils.EARTH_RADIUS;
UnitsUtils.EARTH_ORIGIN = UnitsUtils.EARTH_PERIMETER / 2.0;

class MapPlaneNode extends MapNode {
    constructor(parentNode = null, mapView = null, location = MapNode.root, level = 0, x = 0, y = 0) {
        super(parentNode, mapView, location, level, x, y, MapPlaneNode.geometry, new MeshBasicMaterial({ wireframe: false }));
        this.matrixAutoUpdate = false;
        this.isMesh = true;
        this.visible = false;
    }
    initialize() {
        super.initialize();
        this.loadTexture();
    }
    createChildNodes() {
        const level = this.level + 1;
        const x = this.x * 2;
        const y = this.y * 2;
        const Constructor = Object.getPrototypeOf(this).constructor;
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
    raycast(raycaster, intersects) {
        if (this.isMesh === true) {
            return super.raycast(raycaster, intersects);
        }
        return false;
    }
}
MapPlaneNode.geometry = new MapNodeGeometry(1, 1, 1, 1, false);
MapPlaneNode.baseGeometry = MapPlaneNode.geometry;
MapPlaneNode.baseScale = new Vector3(UnitsUtils.EARTH_PERIMETER, 1.0, UnitsUtils.EARTH_PERIMETER);

class MapNodeHeightGeometry extends BufferGeometry {
    constructor(width = 1.0, height = 1.0, widthSegments = 1.0, heightSegments = 1.0, skirt = false, skirtDepth = 10.0, imageData = null, calculateNormals = true) {
        super();
        const indices = [];
        const vertices = [];
        const normals = [];
        const uvs = [];
        MapNodeGeometry.buildPlane(width, height, widthSegments, heightSegments, indices, vertices, normals, uvs);
        const data = imageData.data;
        for (let i = 0, j = 0; i < data.length && j < vertices.length; i += 4, j += 3) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const value = (r * 65536 + g * 256 + b) * 0.1 - 1e4;
            vertices[j + 1] = value;
        }
        if (skirt) {
            MapNodeGeometry.buildSkirt(width, height, widthSegments, heightSegments, skirtDepth, indices, vertices, normals, uvs);
        }
        this.setIndex(indices);
        this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
        this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
        if (calculateNormals) {
            this.computeNormals(widthSegments, heightSegments);
        }
    }
    computeNormals(widthSegments, heightSegments) {
        const positionAttribute = this.getAttribute('position');
        if (positionAttribute !== undefined) {
            let normalAttribute = this.getAttribute('normal');
            const normalLength = heightSegments * widthSegments;
            for (let i = 0; i < normalLength; i++) {
                normalAttribute.setXYZ(i, 0, 0, 0);
            }
            const pA = new Vector3(), pB = new Vector3(), pC = new Vector3();
            const nA = new Vector3(), nB = new Vector3(), nC = new Vector3();
            const cb = new Vector3(), ab = new Vector3();
            const indexLength = heightSegments * widthSegments * 6;
            for (let i = 0; i < indexLength; i += 3) {
                const vA = this.index.getX(i + 0);
                const vB = this.index.getX(i + 1);
                const vC = this.index.getX(i + 2);
                pA.fromBufferAttribute(positionAttribute, vA);
                pB.fromBufferAttribute(positionAttribute, vB);
                pC.fromBufferAttribute(positionAttribute, vC);
                cb.subVectors(pC, pB);
                ab.subVectors(pA, pB);
                cb.cross(ab);
                nA.fromBufferAttribute(normalAttribute, vA);
                nB.fromBufferAttribute(normalAttribute, vB);
                nC.fromBufferAttribute(normalAttribute, vC);
                nA.add(cb);
                nB.add(cb);
                nC.add(cb);
                normalAttribute.setXYZ(vA, nA.x, nA.y, nA.z);
                normalAttribute.setXYZ(vB, nB.x, nB.y, nB.z);
                normalAttribute.setXYZ(vC, nC.x, nC.y, nC.z);
            }
            this.normalizeNormals();
            normalAttribute.needsUpdate = true;
        }
    }
}

class MapHeightNode extends MapNode {
    constructor(parentNode = null, mapView = null, location = MapNode.root, level = 0, x = 0, y = 0, geometry = MapHeightNode.geometry, material = new MeshPhongMaterial({ wireframe: false, color: 0xffffff })) {
        super(parentNode, mapView, location, level, x, y, geometry, material);
        this.heightLoaded = false;
        this.textureLoaded = false;
        this.geometrySize = 16;
        this.geometryNormals = false;
        this.isMesh = true;
        this.visible = false;
        this.matrixAutoUpdate = false;
    }
    initialize() {
        super.initialize();
        this.loadTexture();
        this.loadHeightGeometry();
    }
    loadTexture() {
        this.mapView.provider.fetchTile(this.level, this.x, this.y).then((image) => {
            const texture = new Texture(image);
            texture.generateMipmaps = false;
            texture.format = RGBFormat;
            texture.magFilter = LinearFilter;
            texture.minFilter = LinearFilter;
            texture.needsUpdate = true;
            this.material.map = texture;
        }).finally(() => {
            this.textureLoaded = true;
            this.nodeReady();
        });
    }
    nodeReady() {
        if (!this.heightLoaded || !this.textureLoaded) {
            return;
        }
        this.visible = true;
        super.nodeReady();
    }
    createChildNodes() {
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
    loadHeightGeometry() {
        if (this.mapView.heightProvider === null) {
            throw new Error('GeoThree: MapView.heightProvider provider is null.');
        }
        return this.mapView.heightProvider.fetchTile(this.level, this.x, this.y).then((image) => {
            const canvas = new OffscreenCanvas(this.geometrySize + 1, this.geometrySize + 1);
            const context = canvas.getContext('2d');
            context.imageSmoothingEnabled = false;
            context.drawImage(image, 0, 0, MapHeightNode.tileSize, MapHeightNode.tileSize, 0, 0, canvas.width, canvas.height);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const geometry = new MapNodeHeightGeometry(1, 1, this.geometrySize, this.geometrySize, true, 10.0, imageData, true);
            this.geometry = geometry;
        }).catch(() => {
            console.error('GeoThree: Failed to load height node data.', this);
        }).finally(() => {
            this.heightLoaded = true;
            this.nodeReady();
        });
    }
    raycast(raycaster, intersects) {
        if (this.isMesh === true) {
            return super.raycast(raycaster, intersects);
        }
        return false;
    }
}
MapHeightNode.tileSize = 256;
MapHeightNode.geometry = new MapNodeGeometry(1, 1, 1, 1);
MapHeightNode.baseGeometry = MapPlaneNode.geometry;
MapHeightNode.baseScale = new Vector3(UnitsUtils.EARTH_PERIMETER, 1, UnitsUtils.EARTH_PERIMETER);

class MapSphereNodeGeometry extends BufferGeometry {
    constructor(radius, widthSegments, heightSegments, phiStart, phiLength, thetaStart, thetaLength) {
        super();
        const thetaEnd = thetaStart + thetaLength;
        let index = 0;
        const grid = [];
        const vertex = new Vector3();
        const normal = new Vector3();
        const indices = [];
        const vertices = [];
        const normals = [];
        const uvs = [];
        for (let iy = 0; iy <= heightSegments; iy++) {
            const verticesRow = [];
            const v = iy / heightSegments;
            for (let ix = 0; ix <= widthSegments; ix++) {
                const u = ix / widthSegments;
                vertex.x = -radius * Math.cos(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
                vertex.y = radius * Math.cos(thetaStart + v * thetaLength);
                vertex.z = radius * Math.sin(phiStart + u * phiLength) * Math.sin(thetaStart + v * thetaLength);
                vertices.push(vertex.x, vertex.y, vertex.z);
                normal.set(vertex.x, vertex.y, vertex.z).normalize();
                normals.push(normal.x, normal.y, normal.z);
                uvs.push(u, 1 - v);
                verticesRow.push(index++);
            }
            grid.push(verticesRow);
        }
        for (let iy = 0; iy < heightSegments; iy++) {
            for (let ix = 0; ix < widthSegments; ix++) {
                const a = grid[iy][ix + 1];
                const b = grid[iy][ix];
                const c = grid[iy + 1][ix];
                const d = grid[iy + 1][ix + 1];
                if (iy !== 0 || thetaStart > 0) {
                    indices.push(a, b, d);
                }
                if (iy !== heightSegments - 1 || thetaEnd < Math.PI) {
                    indices.push(b, c, d);
                }
            }
        }
        this.setIndex(indices);
        this.setAttribute('position', new Float32BufferAttribute(vertices, 3));
        this.setAttribute('normal', new Float32BufferAttribute(normals, 3));
        this.setAttribute('uv', new Float32BufferAttribute(uvs, 2));
    }
}

class MapSphereNode extends MapNode {
    constructor(parentNode = null, mapView = null, location = MapNode.root, level = 0, x = 0, y = 0) {
        super(parentNode, mapView, location, level, x, y, MapSphereNode.createGeometry(level, x, y), new MeshBasicMaterial({ wireframe: false }));
        this.applyScaleNode();
        this.matrixAutoUpdate = false;
        this.isMesh = true;
        this.visible = false;
    }
    initialize() {
        super.initialize();
        this.loadTexture();
    }
    static createGeometry(zoom, x, y) {
        const range = Math.pow(2, zoom);
        const max = 40;
        const segments = Math.floor(MapSphereNode.segments * (max / (zoom + 1)) / max);
        const phiLength = 1 / range * 2 * Math.PI;
        const phiStart = x * phiLength;
        const thetaLength = 1 / range * Math.PI;
        const thetaStart = y * thetaLength;
        return new MapSphereNodeGeometry(1, segments, segments, phiStart, phiLength, thetaStart, thetaLength);
    }
    applyScaleNode() {
        this.geometry.computeBoundingBox();
        const box = this.geometry.boundingBox.clone();
        const center = box.getCenter(new Vector3());
        const matrix = new Matrix4();
        matrix.compose(new Vector3(-center.x, -center.y, -center.z), new Quaternion(), new Vector3(UnitsUtils.EARTH_RADIUS, UnitsUtils.EARTH_RADIUS, UnitsUtils.EARTH_RADIUS));
        this.geometry.applyMatrix4(matrix);
        this.position.copy(center);
        this.updateMatrix();
        this.updateMatrixWorld();
    }
    updateMatrix() {
        this.matrix.setPosition(this.position);
        this.matrixWorldNeedsUpdate = true;
    }
    updateMatrixWorld(force = false) {
        if (this.matrixWorldNeedsUpdate || force) {
            this.matrixWorld.copy(this.matrix);
            this.matrixWorldNeedsUpdate = false;
        }
    }
    createChildNodes() {
        const level = this.level + 1;
        const x = this.x * 2;
        const y = this.y * 2;
        const Constructor = Object.getPrototypeOf(this).constructor;
        let node = new Constructor(this, this.mapView, MapNode.topLeft, level, x, y);
        this.add(node);
        node.updateMatrix();
        node.updateMatrixWorld(true);
        node = new Constructor(this, this.mapView, MapNode.topRight, level, x + 1, y);
        this.add(node);
        node.updateMatrix();
        node.updateMatrixWorld(true);
        node = new Constructor(this, this.mapView, MapNode.bottomLeft, level, x, y + 1);
        this.add(node);
        node.updateMatrix();
        node.updateMatrixWorld(true);
        node = new Constructor(this, this.mapView, MapNode.bottomRight, level, x + 1, y + 1);
        this.add(node);
        node.updateMatrix();
        node.updateMatrixWorld(true);
    }
    raycast(raycaster, intersects) {
        if (this.isMesh === true) {
            return super.raycast(raycaster, intersects);
        }
        return false;
    }
}
MapSphereNode.baseGeometry = new MapSphereNodeGeometry(UnitsUtils.EARTH_RADIUS, 64, 64, 0, 2 * Math.PI, 0, Math.PI);
MapSphereNode.baseScale = new Vector3(1, 1, 1);
MapSphereNode.segments = 80;

class MapHeightNodeShader extends MapHeightNode {
    constructor(parentNode = null, mapView = null, location = MapNode.root, level = 0, x = 0, y = 0) {
        const material = MapHeightNodeShader.prepareMaterial(new MeshPhongMaterial({ map: MapHeightNodeShader.emptyTexture, color: 0xFFFFFF }));
        super(parentNode, mapView, location, level, x, y, MapHeightNodeShader.geometry, material);
        this.frustumCulled = false;
    }
    static prepareMaterial(material) {
        material.userData = { heightMap: { value: MapHeightNodeShader.emptyTexture } };
        material.onBeforeCompile = (shader) => {
            for (const i in material.userData) {
                shader.uniforms[i] = material.userData[i];
            }
            shader.vertexShader =
                `
			uniform sampler2D heightMap;
			` + shader.vertexShader;
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
    loadTexture() {
        this.mapView.provider.fetchTile(this.level, this.x, this.y).then((image) => {
            const texture = new Texture(image);
            texture.generateMipmaps = false;
            texture.format = RGBFormat;
            texture.magFilter = LinearFilter;
            texture.minFilter = LinearFilter;
            texture.needsUpdate = true;
            this.material.map = texture;
            this.textureLoaded = true;
            this.nodeReady();
        }).catch((err) => {
            console.error('GeoThree: Failed to load color node data.', err);
        }).finally(() => {
            this.textureLoaded = true;
            this.nodeReady();
        });
        this.loadHeightGeometry();
    }
    loadHeightGeometry() {
        if (this.mapView.heightProvider === null) {
            throw new Error('GeoThree: MapView.heightProvider provider is null.');
        }
        return this.mapView.heightProvider.fetchTile(this.level, this.x, this.y).then((image) => {
            const texture = new Texture(image);
            texture.generateMipmaps = false;
            texture.format = RGBFormat;
            texture.magFilter = NearestFilter;
            texture.minFilter = NearestFilter;
            texture.needsUpdate = true;
            this.material.userData.heightMap.value = texture;
        }).catch((err) => {
            console.error('GeoThree: Failed to load height node data.', err);
        }).finally(() => {
            this.heightLoaded = true;
            this.nodeReady();
        });
    }
    raycast(raycaster, intersects) {
        if (this.isMesh === true) {
            this.geometry = MapPlaneNode.geometry;
            const result = super.raycast(raycaster, intersects);
            this.geometry = MapHeightNodeShader.geometry;
            return result;
        }
        return false;
    }
}
MapHeightNodeShader.emptyTexture = new Texture();
MapHeightNodeShader.geometrySize = 256;
MapHeightNodeShader.geometry = new MapNodeGeometry(1.0, 1.0, MapHeightNodeShader.geometrySize, MapHeightNodeShader.geometrySize, true);
MapHeightNodeShader.baseGeometry = MapPlaneNode.geometry;
MapHeightNodeShader.baseScale = new Vector3(UnitsUtils.EARTH_PERIMETER, 1, UnitsUtils.EARTH_PERIMETER);

class LODRaycast {
    constructor() {
        this.subdivisionRays = 1;
        this.thresholdUp = 0.6;
        this.thresholdDown = 0.15;
        this.raycaster = new Raycaster();
        this.mouse = new Vector2();
        this.powerDistance = false;
        this.scaleDistance = true;
    }
    updateLOD(view, camera, renderer, scene) {
        const intersects = [];
        for (let t = 0; t < this.subdivisionRays; t++) {
            this.mouse.set(Math.random() * 2 - 1, Math.random() * 2 - 1);
            this.raycaster.setFromCamera(this.mouse, camera);
            this.raycaster.intersectObjects(view.children, true, intersects);
        }
        for (let i = 0; i < intersects.length; i++) {
            const node = intersects[i].object;
            let distance = intersects[i].distance;
            if (this.powerDistance) {
                distance = Math.pow(distance * 2, node.level);
            }
            if (this.scaleDistance) {
                const matrix = node.matrixWorld.elements;
                const vector = new Vector3(matrix[0], matrix[1], matrix[2]);
                distance = vector.length() / distance;
            }
            if (distance > this.thresholdUp) {
                node.subdivide();
                return;
            }
            else if (distance < this.thresholdDown) {
                if (node.parentNode !== null) {
                    node.parentNode.simplify();
                    return;
                }
            }
        }
    }
}

/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */

function __awaiter(thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
}

class Martini {
    constructor(gridSize = 257) {
        this.gridSize = gridSize;
        const tileSize = gridSize - 1;
        if (tileSize & tileSize - 1) {
            throw new Error(`Expected grid size to be 2^n+1, got ${gridSize}.`);
        }
        this.numTriangles = tileSize * tileSize * 2 - 2;
        this.numParentTriangles = this.numTriangles - tileSize * tileSize;
        this.indices = new Uint32Array(this.gridSize * this.gridSize);
        this.coords = new Uint16Array(this.numTriangles * 4);
        for (let i = 0; i < this.numTriangles; i++) {
            let id = i + 2;
            let ax = 0, ay = 0, bx = 0, by = 0, cx = 0, cy = 0;
            if (id & 1) {
                bx = by = cx = tileSize;
            }
            else {
                ax = ay = cy = tileSize;
            }
            while ((id >>= 1) > 1) {
                const mx = ax + bx >> 1;
                const my = ay + by >> 1;
                if (id & 1) {
                    bx = ax;
                    by = ay;
                    ax = cx;
                    ay = cy;
                }
                else {
                    ax = bx;
                    ay = by;
                    bx = cx;
                    by = cy;
                }
                cx = mx;
                cy = my;
            }
            const k = i * 4;
            this.coords[k + 0] = ax;
            this.coords[k + 1] = ay;
            this.coords[k + 2] = bx;
            this.coords[k + 3] = by;
        }
    }
    createTile(terrain) {
        return new Tile(terrain, this);
    }
}
class Tile {
    constructor(terrain, martini) {
        const size = martini.gridSize;
        if (terrain.length !== size * size) {
            throw new Error(`Expected terrain data of length ${size * size} (${size} x ${size}), got ${terrain.length}.`);
        }
        this.terrain = terrain;
        this.martini = martini;
        this.errors = new Float32Array(terrain.length);
        this.update();
    }
    update() {
        const { numTriangles, numParentTriangles, coords, gridSize: size } = this.martini;
        const { terrain, errors } = this;
        for (let i = numTriangles - 1; i >= 0; i--) {
            const k = i * 4;
            const ax = coords[k + 0];
            const ay = coords[k + 1];
            const bx = coords[k + 2];
            const by = coords[k + 3];
            const mx = ax + bx >> 1;
            const my = ay + by >> 1;
            const cx = mx + my - ay;
            const cy = my + ax - mx;
            const interpolatedHeight = (terrain[ay * size + ax] + terrain[by * size + bx]) / 2;
            const middleIndex = my * size + mx;
            const middleError = Math.abs(interpolatedHeight - terrain[middleIndex]);
            errors[middleIndex] = Math.max(errors[middleIndex], middleError);
            if (i < numParentTriangles) {
                const leftChildIndex = (ay + cy >> 1) * size + (ax + cx >> 1);
                const rightChildIndex = (by + cy >> 1) * size + (bx + cx >> 1);
                errors[middleIndex] = Math.max(errors[middleIndex], errors[leftChildIndex], errors[rightChildIndex]);
            }
        }
    }
    getMesh(maxError = 0, withSkirts = false) {
        const { gridSize: size, indices } = this.martini;
        const { errors } = this;
        let numVertices = 0;
        let numTriangles = 0;
        const max = size - 1;
        let aIndex, bIndex, cIndex = 0;
        const leftSkirtIndices = [];
        const rightSkirtIndices = [];
        const bottomSkirtIndices = [];
        const topSkirtIndices = [];
        indices.fill(0);
        function countElements(ax, ay, bx, by, cx, cy) {
            const mx = ax + bx >> 1;
            const my = ay + by >> 1;
            if (Math.abs(ax - cx) + Math.abs(ay - cy) > 1 && errors[my * size + mx] > maxError) {
                countElements(cx, cy, ax, ay, mx, my);
                countElements(bx, by, cx, cy, mx, my);
            }
            else {
                aIndex = ay * size + ax;
                bIndex = by * size + bx;
                cIndex = cy * size + cx;
                if (indices[aIndex] === 0) {
                    if (withSkirts) {
                        if (ax === 0) {
                            leftSkirtIndices.push(numVertices);
                        }
                        else if (ax === max) {
                            rightSkirtIndices.push(numVertices);
                        }
                        if (ay === 0) {
                            bottomSkirtIndices.push(numVertices);
                        }
                        else if (ay === max) {
                            topSkirtIndices.push(numVertices);
                        }
                    }
                    indices[aIndex] = ++numVertices;
                }
                if (indices[bIndex] === 0) {
                    if (withSkirts) {
                        if (bx === 0) {
                            leftSkirtIndices.push(numVertices);
                        }
                        else if (bx === max) {
                            rightSkirtIndices.push(numVertices);
                        }
                        if (by === 0) {
                            bottomSkirtIndices.push(numVertices);
                        }
                        else if (by === max) {
                            topSkirtIndices.push(numVertices);
                        }
                    }
                    indices[bIndex] = ++numVertices;
                }
                if (indices[cIndex] === 0) {
                    if (withSkirts) {
                        if (cx === 0) {
                            leftSkirtIndices.push(numVertices);
                        }
                        else if (cx === max) {
                            rightSkirtIndices.push(numVertices);
                        }
                        if (cy === 0) {
                            bottomSkirtIndices.push(numVertices);
                        }
                        else if (cy === max) {
                            topSkirtIndices.push(numVertices);
                        }
                    }
                    indices[cIndex] = ++numVertices;
                }
                numTriangles++;
            }
        }
        countElements(0, 0, max, max, max, 0);
        countElements(max, max, 0, 0, 0, max);
        let numTotalVertices = numVertices * 2;
        let numTotalTriangles = numTriangles * 3;
        if (withSkirts) {
            numTotalVertices += (leftSkirtIndices.length + rightSkirtIndices.length + bottomSkirtIndices.length + topSkirtIndices.length) * 2;
            numTotalTriangles += ((leftSkirtIndices.length - 1) * 2 + (rightSkirtIndices.length - 1) * 2 + (bottomSkirtIndices.length - 1) * 2 + (topSkirtIndices.length - 1) * 2) * 3;
        }
        const vertices = new Uint16Array(numTotalVertices);
        const triangles = new Uint32Array(numTotalTriangles);
        let triIndex = 0;
        function processTriangle(ax, ay, bx, by, cx, cy) {
            const mx = ax + bx >> 1;
            const my = ay + by >> 1;
            if (Math.abs(ax - cx) + Math.abs(ay - cy) > 1 && errors[my * size + mx] > maxError) {
                processTriangle(cx, cy, ax, ay, mx, my);
                processTriangle(bx, by, cx, cy, mx, my);
            }
            else {
                const a = indices[ay * size + ax] - 1;
                const b = indices[by * size + bx] - 1;
                const c = indices[cy * size + cx] - 1;
                vertices[2 * a] = ax;
                vertices[2 * a + 1] = ay;
                vertices[2 * b] = bx;
                vertices[2 * b + 1] = by;
                vertices[2 * c] = cx;
                vertices[2 * c + 1] = cy;
                triangles[triIndex++] = a;
                triangles[triIndex++] = b;
                triangles[triIndex++] = c;
            }
        }
        processTriangle(0, 0, max, max, max, 0);
        processTriangle(max, max, 0, 0, 0, max);
        if (withSkirts) {
            leftSkirtIndices.sort((a, b) => { return vertices[2 * a + 1] - vertices[2 * b + 1]; });
            rightSkirtIndices.sort((a, b) => { return vertices[2 * b + 1] - vertices[2 * a + 1]; });
            bottomSkirtIndices.sort((a, b) => { return vertices[2 * b] - vertices[2 * a]; });
            topSkirtIndices.sort((a, b) => { return vertices[2 * a] - vertices[2 * b]; });
            let skirtIndex = numVertices * 2;
            function constructSkirt(skirt) {
                const skirtLength = skirt.length;
                for (let i = 0; i < skirtLength - 1; i++) {
                    const currIndex = skirt[i];
                    const nextIndex = skirt[i + 1];
                    const currentSkirt = skirtIndex / 2;
                    const nextSkirt = (skirtIndex + 2) / 2;
                    vertices[skirtIndex++] = vertices[2 * currIndex];
                    vertices[skirtIndex++] = vertices[2 * currIndex + 1];
                    triangles[triIndex++] = currIndex;
                    triangles[triIndex++] = currentSkirt;
                    triangles[triIndex++] = nextIndex;
                    triangles[triIndex++] = currentSkirt;
                    triangles[triIndex++] = nextSkirt;
                    triangles[triIndex++] = nextIndex;
                }
                vertices[skirtIndex++] = vertices[2 * skirt[skirtLength - 1]];
                vertices[skirtIndex++] = vertices[2 * skirt[skirtLength - 1] + 1];
            }
            constructSkirt(leftSkirtIndices);
            constructSkirt(rightSkirtIndices);
            constructSkirt(bottomSkirtIndices);
            constructSkirt(topSkirtIndices);
        }
        return { vertices: vertices, triangles: triangles, numVerticesWithoutSkirts: numVertices };
    }
}

class MapMartiniHeightNode extends MapHeightNode {
    constructor(parentNode = null, mapView = null, location = MapNode.root, level = 0, x = 0, y = 0, { elevationDecoder = null, meshMaxError = 10, exageration = 1 } = {}) {
        super(parentNode, mapView, location, level, x, y, MapMartiniHeightNode.geometry, MapMartiniHeightNode.prepareMaterial(new MeshPhongMaterial({
            map: MapMartiniHeightNode.emptyTexture,
            color: 0xFFFFFF,
            side: DoubleSide
        }), level, exageration));
        this.elevationDecoder = {
            rScaler: 256,
            gScaler: 1,
            bScaler: 1 / 256,
            offset: -32768
        };
        this.exageration = 1.0;
        this.meshMaxError = 10;
        if (elevationDecoder) {
            this.elevationDecoder = elevationDecoder;
        }
        this.meshMaxError = meshMaxError;
        this.exageration = exageration;
        this.frustumCulled = false;
    }
    static prepareMaterial(material, level, exageration = 1.0) {
        material.userData = {
            heightMap: { value: MapMartiniHeightNode.emptyTexture },
            drawNormals: { value: 0 },
            drawBlack: { value: 0 },
            zoomlevel: { value: level },
            computeNormals: { value: 1 },
            drawTexture: { value: 1 }
        };
        material.onBeforeCompile = (shader) => {
            for (let i in material.userData) {
                shader.uniforms[i] = material.userData[i];
            }
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
            shader.fragmentShader = shader.fragmentShader.replace('#include <dithering_fragment>', `
				if(drawBlack) {
					gl_FragColor = vec4( 0.0,0.0,0.0, 1.0 );
				} else if(drawNormals) {
					gl_FragColor = vec4( ( 0.5 * vNormal + 0.5 ), 1.0 );
				} else if (!drawTexture) {
					gl_FragColor = vec4( 0.0,0.0,0.0, 0.0 );
				}`);
            shader.vertexShader = shader.vertexShader.replace('#include <fog_vertex>', `
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
				`);
        };
        return material;
    }
    static getTerrain(imageData, tileSize, elevation) {
        const { rScaler, bScaler, gScaler, offset } = elevation;
        const gridSize = tileSize + 1;
        const terrain = new Float32Array(gridSize * gridSize);
        for (let i = 0, y = 0; y < tileSize; y++) {
            for (let x = 0; x < tileSize; x++, i++) {
                const k = i * 4;
                const r = imageData[k + 0];
                const g = imageData[k + 1];
                const b = imageData[k + 2];
                terrain[i + y] = r * rScaler + g * gScaler + b * bScaler + offset;
            }
        }
        for (let i = gridSize * (gridSize - 1), x = 0; x < gridSize - 1; x++, i++) {
            terrain[i] = terrain[i - gridSize];
        }
        for (let i = gridSize - 1, y = 0; y < gridSize; y++, i += gridSize) {
            terrain[i] = terrain[i - 1];
        }
        return terrain;
    }
    static getMeshAttributes(vertices, terrain, tileSize, bounds, exageration) {
        const gridSize = tileSize + 1;
        const numOfVerticies = vertices.length / 2;
        const positions = new Float32Array(numOfVerticies * 3);
        const texCoords = new Float32Array(numOfVerticies * 2);
        const [minX, minY, maxX, maxY] = bounds || [0, 0, tileSize, tileSize];
        const xScale = (maxX - minX) / tileSize;
        const yScale = (maxY - minY) / tileSize;
        for (let i = 0; i < numOfVerticies; i++) {
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
            position: { value: positions, size: 3 },
            uv: { value: texCoords, size: 2 }
        };
    }
    onHeightImage(image) {
        return __awaiter(this, void 0, void 0, function* () {
            const tileSize = image.width;
            const gridSize = tileSize + 1;
            var canvas = new OffscreenCanvas(tileSize, tileSize);
            var context = canvas.getContext('2d');
            context.imageSmoothingEnabled = false;
            context.drawImage(image, 0, 0, tileSize, tileSize, 0, 0, canvas.width, canvas.height);
            var imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            var data = imageData.data;
            const terrain = MapMartiniHeightNode.getTerrain(data, tileSize, this.elevationDecoder);
            const martini = new Martini(gridSize);
            const tile = martini.createTile(terrain);
            const { vertices, triangles } = tile.getMesh(typeof this.meshMaxError === 'function' ? this.meshMaxError(this.level) : this.meshMaxError);
            const attributes = MapMartiniHeightNode.getMeshAttributes(vertices, terrain, tileSize, [-0.5, -0.5, 0.5, 0.5], this.exageration);
            this.geometry = new BufferGeometry();
            this.geometry.setIndex(new Uint32BufferAttribute(triangles, 1));
            this.geometry.setAttribute('position', new Float32BufferAttribute(attributes.position.value, attributes.position.size));
            this.geometry.setAttribute('uv', new Float32BufferAttribute(attributes.uv.value, attributes.uv.size));
            this.geometry.rotateX(Math.PI);
            var texture = new Texture(image);
            texture.generateMipmaps = false;
            texture.format = RGBFormat;
            texture.magFilter = NearestFilter;
            texture.minFilter = NearestFilter;
            texture.needsUpdate = true;
            this.material.userData.heightMap.value = texture;
        });
    }
    loadHeightGeometry() {
        if (this.mapView.heightProvider === null) {
            throw new Error('GeoThree: MapView.heightProvider provider is null.');
        }
        return this.mapView.heightProvider.fetchTile(this.level, this.x, this.y).then((image) => __awaiter(this, void 0, void 0, function* () {
            this.onHeightImage(image);
        })).finally(() => {
            this.heightLoaded = true;
            this.nodeReady();
        });
    }
}
MapMartiniHeightNode.geometrySize = 16;
MapMartiniHeightNode.emptyTexture = new Texture();
MapMartiniHeightNode.geometry = new MapNodeGeometry(1, 1, 1, 1);
MapMartiniHeightNode.tileSize = 256;

class MapView extends Mesh {
    constructor(root = MapView.PLANAR, provider = new OpenStreetMapsProvider(), heightProvider = null) {
        super(undefined, new MeshBasicMaterial({ transparent: true, opacity: 0.0 }));
        this.lod = null;
        this.provider = null;
        this.heightProvider = null;
        this.root = null;
        this.onBeforeRender = (renderer, scene, camera, geometry, material, group) => {
            this.lod.updateLOD(this, camera, renderer, scene);
        };
        this.lod = new LODRaycast();
        this.provider = provider;
        this.heightProvider = heightProvider;
        this.setRoot(root);
    }
    setRoot(root) {
        if (typeof root === 'number') {
            if (!MapView.mapModes.has(root)) {
                throw new Error('Map mode ' + root + ' does is not registered.');
            }
            const rootConstructor = MapView.mapModes.get(root);
            root = new rootConstructor(null, this);
        }
        if (this.root !== null) {
            this.remove(this.root);
            this.root = null;
        }
        this.root = root;
        if (this.root !== null) {
            this.geometry = this.root.constructor.baseGeometry;
            this.scale.copy(this.root.constructor.baseScale);
            this.root.mapView = this;
            this.add(this.root);
        }
    }
    setProvider(provider) {
        if (provider !== this.provider) {
            this.provider = provider;
            this.clear();
        }
    }
    setHeightProvider(heightProvider) {
        if (heightProvider !== this.heightProvider) {
            this.heightProvider = heightProvider;
            this.clear();
        }
    }
    clear() {
        this.traverse(function (children) {
            if (children.childrenCache) {
                children.childrenCache = null;
            }
            if (children.initialize) {
                children.initialize();
            }
        });
        return this;
    }
    getMetaData() {
        this.provider.getMetaData();
    }
    raycast(raycaster, intersects) {
        return false;
    }
}
MapView.PLANAR = 200;
MapView.SPHERICAL = 201;
MapView.HEIGHT = 202;
MapView.HEIGHT_SHADER = 203;
MapView.MARTINI = 204;
MapView.mapModes = new Map([
    [MapView.PLANAR, MapPlaneNode],
    [MapView.SPHERICAL, MapSphereNode],
    [MapView.HEIGHT, MapHeightNode],
    [MapView.HEIGHT_SHADER, MapHeightNodeShader],
    [MapView.MARTINI, MapMartiniHeightNode]
]);

const pov$1 = new Vector3();
const position$1 = new Vector3();
class LODRadial {
    constructor() {
        this.subdivideDistance = 50;
        this.simplifyDistance = 300;
    }
    updateLOD(view, camera, renderer, scene) {
        camera.getWorldPosition(pov$1);
        view.children[0].traverse((node) => {
            node.getWorldPosition(position$1);
            let distance = pov$1.distanceTo(position$1);
            distance /= Math.pow(2, view.provider.maxZoom - node.level);
            if (distance < this.subdivideDistance) {
                node.subdivide();
            }
            else if (distance > this.simplifyDistance && node.parentNode) {
                node.parentNode.simplify();
            }
        });
    }
}

const projection = new Matrix4();
const pov = new Vector3();
const frustum = new Frustum();
const position = new Vector3();
class LODFrustum extends LODRadial {
    constructor() {
        super(...arguments);
        this.subdivideDistance = 120;
        this.simplifyDistance = 400;
        this.testCenter = true;
        this.pointOnly = false;
    }
    updateLOD(view, camera, renderer, scene) {
        projection.multiplyMatrices(camera.projectionMatrix, camera.matrixWorldInverse);
        frustum.setFromProjectionMatrix(projection);
        camera.getWorldPosition(pov);
        view.children[0].traverse((node) => {
            node.getWorldPosition(position);
            let distance = pov.distanceTo(position);
            distance /= Math.pow(2, view.provider.maxZoom - node.level);
            const inFrustum = this.pointOnly ? frustum.containsPoint(position) : frustum.intersectsObject(node);
            if (distance < this.subdivideDistance && inFrustum) {
                node.subdivide();
            }
            else if (distance > this.simplifyDistance && node.parentNode) {
                node.parentNode.simplify();
            }
        });
    }
}

class XHRUtils {
    static get(url, onLoad, onError) {
        const xhr = new XMLHttpRequest();
        xhr.overrideMimeType('text/plain');
        xhr.open('GET', url, true);
        if (onLoad !== undefined) {
            xhr.onload = function () {
                onLoad(xhr.response);
            };
        }
        if (onError !== undefined) {
            xhr.onerror = onError;
        }
        xhr.send(null);
        return xhr;
    }
    static getRaw(url, onLoad, onError) {
        var xhr = new XMLHttpRequest();
        xhr.responseType = 'arraybuffer';
        xhr.open('GET', url, true);
        if (onLoad !== undefined) {
            xhr.onload = function () {
                onLoad(xhr.response);
            };
        }
        if (onError !== undefined) {
            xhr.onerror = onError;
        }
        xhr.send(null);
        return xhr;
    }
    static request(url, type, header, body, onLoad, onError, onProgress) {
        function parseResponse(response) {
            try {
                return JSON.parse(response);
            }
            catch (e) {
                return response;
            }
        }
        const xhr = new XMLHttpRequest();
        xhr.overrideMimeType('text/plain');
        xhr.open(type, url, true);
        if (header !== null && header !== undefined) {
            for (const i in header) {
                xhr.setRequestHeader(i, header[i]);
            }
        }
        if (onLoad !== undefined) {
            xhr.onload = function (event) {
                onLoad(parseResponse(xhr.response), xhr);
            };
        }
        if (onError !== undefined) {
            xhr.onerror = onError;
        }
        if (onProgress !== undefined) {
            xhr.onprogress = onProgress;
        }
        if (body !== undefined) {
            xhr.send(body);
        }
        else {
            xhr.send(null);
        }
        return xhr;
    }
}

class BingMapsProvider extends MapProvider {
    constructor(apiKey = '', type = BingMapsProvider.AERIAL) {
        super();
        this.maxZoom = 19;
        this.format = 'jpeg';
        this.mapSize = 512;
        this.subdomain = 't1';
        this.apiKey = apiKey;
        this.type = type;
    }
    getMetaData() {
        const address = 'http://dev.virtualearth.net/REST/V1/Imagery/Metadata/RoadOnDemand?output=json&include=ImageryProviders&key=' + this.apiKey;
        XHRUtils.get(address, function (data) {
            JSON.parse(data);
        });
    }
    static quadKey(zoom, x, y) {
        let quad = '';
        for (let i = zoom; i > 0; i--) {
            const mask = 1 << i - 1;
            let cell = 0;
            if ((x & mask) !== 0) {
                cell++;
            }
            if ((y & mask) !== 0) {
                cell += 2;
            }
            quad += cell;
        }
        return quad;
    }
    fetchTile(zoom, x, y) {
        return new Promise((resolve, reject) => {
            const image = document.createElement('img');
            image.onload = function () {
                resolve(image);
            };
            image.onerror = function () {
                reject();
            };
            image.crossOrigin = 'Anonymous';
            image.src = 'http://ecn.' + this.subdomain + '.tiles.virtualearth.net/tiles/' + this.type + BingMapsProvider.quadKey(zoom, x, y) + '.jpeg?g=1173';
        });
    }
}
BingMapsProvider.AERIAL = 'a';
BingMapsProvider.ROAD = 'r';
BingMapsProvider.AERIAL_LABELS = 'h';
BingMapsProvider.OBLIQUE = 'o';
BingMapsProvider.OBLIQUE_LABELS = 'b';

class GoogleMapsProvider extends MapProvider {
    constructor(apiToken) {
        super();
        this.sessionToken = null;
        this.orientation = 0;
        this.format = 'png';
        this.mapType = 'roadmap';
        this.overlay = false;
        this.apiToken = apiToken !== undefined ? apiToken : '';
        this.createSession();
    }
    createSession() {
        const address = 'https://www.googleapis.com/tile/v1/createSession?key=' + this.apiToken;
        const data = JSON.stringify({
            mapType: this.mapType,
            language: 'en-EN',
            region: 'en',
            layerTypes: ['layerRoadmap', 'layerStreetview'],
            overlay: this.overlay,
            scale: 'scaleFactor1x'
        });
        XHRUtils.request(address, 'GET', { 'Content-Type': 'text/json' }, data, (response, xhr) => {
            console.log('Created google maps session.', response, xhr);
            this.sessionToken = response.session;
        }, function (xhr) {
            console.warn('Unable to create a google maps session.', xhr);
        });
    }
    fetchTile(zoom, x, y) {
        return new Promise((resolve, reject) => {
            const image = document.createElement('img');
            image.onload = function () {
                resolve(image);
            };
            image.onerror = function () {
                reject();
            };
            image.crossOrigin = 'Anonymous';
            image.src = 'https://www.googleapis.com/tile/v1/tiles/' + zoom + '/' + x + '/' + y + '?session=' + this.sessionToken + '&orientation=' + this.orientation + '&key=' + this.apiToken;
        });
    }
}

class HereMapsProvider extends MapProvider {
    constructor(appId, appCode, style, scheme, format, size) {
        super();
        this.appId = appId !== undefined ? appId : '';
        this.appCode = appCode !== undefined ? appCode : '';
        this.style = style !== undefined ? style : 'base';
        this.scheme = scheme !== undefined ? scheme : 'normal.day';
        this.format = format !== undefined ? format : 'png';
        this.size = size !== undefined ? size : 512;
        this.version = 'newest';
        this.server = 1;
    }
    nextServer() {
        this.server = this.server % 4 === 0 ? 1 : this.server + 1;
    }
    getMetaData() { }
    fetchTile(zoom, x, y) {
        this.nextServer();
        return new Promise((resolve, reject) => {
            const image = document.createElement('img');
            image.onload = function () {
                resolve(image);
            };
            image.onerror = function () {
                reject();
            };
            image.crossOrigin = 'Anonymous';
            image.src = 'https://' + this.server + '.' + this.style + '.maps.api.here.com/maptile/2.1/maptile/' +
                this.version + '/' + this.scheme + '/' + zoom + '/' + x + '/' + y + '/' +
                this.size + '/' + this.format + '?app_id=' + this.appId + '&app_code=' + this.appCode;
        });
    }
}
HereMapsProvider.PATH = '/maptile/2.1/';

class MapBoxProvider extends MapProvider {
    constructor(apiToken = '', id = '', mode = MapBoxProvider.STYLE, format = 'png', useHDPI = false, version = 'v4') {
        super();
        this.apiToken = apiToken;
        this.format = format;
        this.useHDPI = useHDPI;
        this.mode = mode;
        this.mapId = id;
        this.style = id;
        this.version = version;
    }
    getMetaData() {
        const address = MapBoxProvider.ADDRESS + this.version + '/' + this.mapId + '.json?access_token=' + this.apiToken;
        XHRUtils.get(address, (data) => {
            const meta = JSON.parse(data);
            this.name = meta.name;
            this.minZoom = meta.minZoom;
            this.maxZoom = meta.maxZoom;
            this.bounds = meta.bounds;
            this.center = meta.center;
        });
    }
    fetchTile(zoom, x, y) {
        return new Promise((resolve, reject) => {
            const image = document.createElement('img');
            image.onload = function () {
                resolve(image);
            };
            image.onerror = function () {
                reject();
            };
            image.crossOrigin = 'Anonymous';
            if (this.mode === MapBoxProvider.STYLE) {
                image.src = MapBoxProvider.ADDRESS + 'styles/v1/' + this.style + '/tiles/' + zoom + '/' + x + '/' + y + (this.useHDPI ? '@2x?access_token=' : '?access_token=') + this.apiToken;
            }
            else {
                image.src = MapBoxProvider.ADDRESS + 'v4/' + this.mapId + '/' + zoom + '/' + x + '/' + y + (this.useHDPI ? '@2x.' : '.') + this.format + '?access_token=' + this.apiToken;
            }
        });
    }
}
MapBoxProvider.ADDRESS = 'https://api.mapbox.com/';
MapBoxProvider.STYLE = 100;
MapBoxProvider.MAP_ID = 101;

class MapTilerProvider extends MapProvider {
    constructor(apiKey, category, style, format) {
        super();
        this.apiKey = apiKey !== undefined ? apiKey : '';
        this.format = format !== undefined ? format : 'png';
        this.category = category !== undefined ? category : 'maps';
        this.style = style !== undefined ? style : 'satellite';
        this.resolution = 512;
    }
    fetchTile(zoom, x, y) {
        return new Promise((resolve, reject) => {
            const image = document.createElement('img');
            image.onload = function () {
                resolve(image);
            };
            image.onerror = function () {
                reject();
            };
            image.crossOrigin = 'Anonymous';
            image.src = 'https://api.maptiler.com/' + this.category + '/' + this.style + '/' + zoom + '/' + x + '/' + y + '.' + this.format + '?key=' + this.apiKey;
        });
    }
}

class OpenMapTilesProvider extends MapProvider {
    constructor(address, format = 'png', theme = 'klokantech-basic') {
        super();
        this.address = address;
        this.format = format;
        this.theme = theme;
    }
    getMetaData() {
        const address = this.address + 'styles/' + this.theme + '.json';
        XHRUtils.get(address, (data) => {
            const meta = JSON.parse(data);
            this.name = meta.name;
            this.format = meta.format;
            this.minZoom = meta.minZoom;
            this.maxZoom = meta.maxZoom;
            this.bounds = meta.bounds;
            this.center = meta.center;
        });
    }
    fetchTile(zoom, x, y) {
        return new Promise((resolve, reject) => {
            const image = document.createElement('img');
            image.onload = function () {
                resolve(image);
            };
            image.onerror = function () {
                reject();
            };
            image.crossOrigin = 'Anonymous';
            image.src = this.address + 'styles/' + this.theme + '/' + zoom + '/' + x + '/' + y + '.' + this.format;
        });
    }
}

class DebugProvider extends MapProvider {
    constructor() {
        super(...arguments);
        this.resolution = 256;
    }
    fetchTile(zoom, x, y) {
        const canvas = new OffscreenCanvas(this.resolution, this.resolution);
        const context = canvas.getContext('2d');
        const green = new Color(0x00ff00);
        const red = new Color(0xff0000);
        const color = green.lerpHSL(red, (zoom - this.minZoom) / (this.maxZoom - this.minZoom));
        context.fillStyle = color.getStyle();
        context.fillRect(0, 0, this.resolution, this.resolution);
        context.fillStyle = '#000000';
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.font = 'bold ' + this.resolution * 0.1 + 'px arial';
        context.fillText('(' + zoom + ')', this.resolution / 2, this.resolution * 0.4);
        context.fillText('(' + x + ', ' + y + ')', this.resolution / 2, this.resolution * 0.6);
        return Promise.resolve(canvas);
    }
}

class HeightDebugProvider extends MapProvider {
    constructor(provider) {
        super();
        this.fromColor = new Color(0xff0000);
        this.toColor = new Color(0x00ff00);
        this.provider = provider;
    }
    fetchTile(zoom, x, y) {
        return new Promise((resolve, reject) => {
            this.provider
                .fetchTile(zoom, x, y)
                .then((image) => {
                const resolution = 256;
                const canvas = new OffscreenCanvas(resolution, resolution);
                const context = canvas.getContext('2d');
                context.drawImage(image, 0, 0, resolution, resolution, 0, 0, resolution, resolution);
                const imageData = context.getImageData(0, 0, resolution, resolution);
                const data = imageData.data;
                for (let i = 0; i < data.length; i += 4) {
                    const r = data[i];
                    const g = data[i + 1];
                    const b = data[i + 2];
                    const value = (r * 65536 + g * 256 + b) * 0.1 - 1e4;
                    const max = 1667721.6;
                    const color = this.fromColor.clone().lerpHSL(this.toColor, value / max);
                    data[i] = color.r * 255;
                    data[i + 1] = color.g * 255;
                    data[i + 2] = color.b * 255;
                }
                context.putImageData(imageData, 0, 0);
                resolve(canvas);
            })
                .catch(reject);
        });
    }
}

class CancelablePromise {
    constructor(executor) {
        this.fulfilled = false;
        this.rejected = false;
        this.called = false;
        const resolve = (v) => {
            this.fulfilled = true;
            this.value = v;
            if (typeof this.onResolve === 'function') {
                this.onResolve(this.value);
                this.called = true;
            }
        };
        const reject = (reason) => {
            this.rejected = true;
            this.value = reason;
            if (typeof this.onReject === 'function') {
                this.onReject(this.value);
                this.called = true;
            }
        };
        try {
            executor(resolve, reject);
        }
        catch (error) {
            reject(error);
        }
    }
    cancel() {
        return false;
    }
    then(callback) {
        this.onResolve = callback;
        if (this.fulfilled && !this.called) {
            this.called = true;
            this.onResolve(this.value);
        }
        return this;
    }
    catch(callback) {
        this.onReject = callback;
        if (this.rejected && !this.called) {
            this.called = true;
            this.onReject(this.value);
        }
        return this;
    }
    finally(callback) {
        return this;
    }
    static resolve(val) {
        return new CancelablePromise(function executor(resolve, _reject) {
            resolve(val);
        });
    }
    static reject(reason) {
        return new CancelablePromise(function executor(resolve, reject) {
            reject(reason);
        });
    }
    static all(promises) {
        const fulfilledPromises = [];
        const result = [];
        function executor(resolve, reject) {
            promises.forEach((promise, index) => {
                return promise
                    .then((val) => {
                    fulfilledPromises.push(true);
                    result[index] = val;
                    if (fulfilledPromises.length === promises.length) {
                        return resolve(result);
                    }
                })
                    .catch((error) => { return reject(error); });
            });
        }
        return new CancelablePromise(executor);
    }
}

export { BingMapsProvider, CancelablePromise, DebugProvider, GoogleMapsProvider, HeightDebugProvider, HereMapsProvider, LODFrustum, LODRadial, LODRaycast, MapBoxProvider, MapHeightNode, MapHeightNodeShader, MapNode, MapNodeGeometry, MapNodeHeightGeometry, MapPlaneNode, MapProvider, MapSphereNode, MapSphereNodeGeometry, MapTilerProvider, MapView, OpenMapTilesProvider, OpenStreetMapsProvider, UnitsUtils, XHRUtils };
//# sourceMappingURL=geo-three.module.js.map
