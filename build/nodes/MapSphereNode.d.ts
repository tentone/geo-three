import { BufferGeometry, Vector3, Raycaster, Intersection } from 'three';
import { MapNode } from './MapNode';
import { MapSphereNodeGeometry } from '../geometries/MapSphereNodeGeometry';
export declare class MapSphereNode extends MapNode {
    static baseGeometry: BufferGeometry;
    static baseScale: Vector3;
    static segments: number;
    constructor(parentNode?: any, mapView?: any, location?: number, level?: number, x?: number, y?: number);
    initialize(): Promise<void>;
    static createGeometry(zoom: number, x: number, y: number): MapSphereNodeGeometry;
    applyTexture(image: HTMLImageElement): Promise<void>;
    applyScaleNode(): void;
    updateMatrix(): void;
    updateMatrixWorld(force?: boolean): void;
    createChildNodes(): void;
    raycast(raycaster: Raycaster, intersects: Intersection[]): void;
}
