import { BufferGeometry, Intersection, Material, Raycaster, Texture, Vector3 } from 'three';
import { MapHeightNode } from './MapHeightNode';
import { MapView } from '../MapView';
export declare class MapHeightNodeShader extends MapHeightNode {
    constructor(parentNode?: MapHeightNode, mapView?: MapView, location?: number, level?: number, x?: number, y?: number);
    static emptyTexture: Texture;
    static geometrySize: number;
    static geometry: BufferGeometry;
    static baseGeometry: BufferGeometry;
    static baseScale: Vector3;
    static prepareMaterial(material: Material): Material;
    loadData(): Promise<void>;
    loadHeightGeometry(): Promise<void>;
    raycast(raycaster: Raycaster, intersects: Intersection[]): void;
}
