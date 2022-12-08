import { Material, MeshPhongMaterial, Texture } from 'three';
import { MapNodeGeometry } from '../geometries/MapNodeGeometry';
import { MapView } from '../MapView';
import { MapHeightNode } from './MapHeightNode';
export declare class MapMartiniHeightNode extends MapHeightNode {
    static geometrySize: number;
    static emptyTexture: Texture;
    static geometry: MapNodeGeometry;
    elevationDecoder: any;
    static tileSize: number;
    exageration: number;
    meshMaxError: number | Function;
    material: MeshPhongMaterial;
    constructor(parentNode?: MapHeightNode, mapView?: MapView, location?: number, level?: number, x?: number, y?: number, { elevationDecoder, meshMaxError, exageration }?: {
        elevationDecoder?: any;
        meshMaxError?: number;
        exageration?: number;
    });
    static prepareMaterial(material: Material, level: number, exageration?: number): Material;
    static getTerrain(imageData: Uint8ClampedArray, tileSize: number, elevation: any): Float32Array;
    static getMeshAttributes(vertices: number[], terrain: Float32Array, tileSize: number, bounds: number[], exageration: number): {
        position: {
            value: Float32Array;
            size: number;
        };
        uv: {
            value: Float32Array;
            size: number;
        };
    };
    processHeight(image: HTMLImageElement): Promise<void>;
    loadHeightGeometry(): Promise<void>;
}
