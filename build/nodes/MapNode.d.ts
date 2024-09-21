import { Material, Mesh, Texture, Vector3, BufferGeometry, Object3D } from 'three';
import { MapView } from '../MapView';
export declare class QuadTreePosition {
    static root: number;
    static topLeft: number;
    static topRight: number;
    static bottomLeft: number;
    static bottomRight: number;
}
export declare abstract class MapNode extends Mesh {
    static defaultTexture: Texture;
    mapView: MapView;
    parentNode: MapNode;
    location: number;
    level: number;
    x: number;
    y: number;
    subdivided: boolean;
    disposed: boolean;
    nodesLoaded: number;
    childrenCache: Object3D[];
    static baseGeometry: BufferGeometry;
    static baseScale: Vector3;
    static childrens: number;
    isMesh: true;
    constructor(parentNode?: MapNode, mapView?: MapView, location?: number, level?: number, x?: number, y?: number, geometry?: BufferGeometry, material?: Material);
    initialize(): Promise<void>;
    createChildNodes(): void;
    subdivide(): void;
    simplify(): void;
    loadData(): Promise<void>;
    applyTexture(image: HTMLImageElement): Promise<void>;
    nodeReady(): void;
    dispose(): void;
}
