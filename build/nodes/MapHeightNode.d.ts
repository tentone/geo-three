import { Material, BufferGeometry, Vector3, Raycaster, Intersection } from 'three';
import { MapNode } from './MapNode';
import { MapView } from '../MapView';
export declare class MapHeightNode extends MapNode {
    heightLoaded: boolean;
    textureLoaded: boolean;
    static tileSize: number;
    geometrySize: number;
    geometryNormals: boolean;
    static geometry: BufferGeometry;
    static baseGeometry: BufferGeometry;
    static baseScale: Vector3;
    constructor(parentNode?: MapHeightNode, mapView?: MapView, location?: number, level?: number, x?: number, y?: number, geometry?: BufferGeometry, material?: Material);
    initialize(): void;
    loadTexture(): Promise<void>;
    nodeReady(): void;
    createChildNodes(): void;
    loadHeightGeometry(): Promise<any>;
    raycast(raycaster: Raycaster, intersects: Intersection[]): void;
}
