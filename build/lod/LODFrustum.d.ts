import { LODRadial } from './LODRadial';
import { Camera, Object3D, WebGLRenderer } from 'three';
import { MapView } from '../MapView';
export declare class LODFrustum extends LODRadial {
    subdivideDistance: number;
    simplifyDistance: number;
    testCenter: boolean;
    pointOnly: boolean;
    constructor(subdivideDistance?: number, simplifyDistance?: number);
    updateLOD(view: MapView, camera: Camera, renderer: WebGLRenderer, scene: Object3D): void;
}
