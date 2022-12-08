import { BufferGeometry, Camera, Group, Material, Mesh, Raycaster, Scene, WebGLRenderer } from 'three';
import { MapNode } from './nodes/MapNode';
import { MapProvider } from './providers/MapProvider';
import { LODControl } from './lod/LODControl';
export declare class MapView extends Mesh {
    static PLANAR: number;
    static SPHERICAL: number;
    static HEIGHT: number;
    static HEIGHT_SHADER: number;
    static MARTINI: number;
    static mapModes: Map<number, any>;
    lod: LODControl;
    provider: MapProvider;
    heightProvider: MapProvider;
    root: MapNode;
    cacheTiles: boolean;
    constructor(root?: (number | MapNode), provider?: MapProvider, heightProvider?: MapProvider);
    onBeforeRender: (renderer: WebGLRenderer, scene: Scene, camera: Camera, geometry: BufferGeometry, material: Material, group: Group) => void;
    setRoot(root: (MapNode | number)): void;
    setProvider(provider: MapProvider): void;
    setHeightProvider(heightProvider: MapProvider): void;
    clear(): any;
    getMetaData(): void;
    raycast(raycaster: Raycaster, intersects: any[]): boolean;
}
