import { LODControl } from './LODControl';
import { Camera, Object3D, WebGLRenderer } from 'three';
import { MapView } from '../MapView';
export declare class LODRadial implements LODControl {
    subdivideDistance: number;
    simplifyDistance: number;
    updateLOD(view: MapView, camera: Camera, renderer: WebGLRenderer, scene: Object3D): void;
}
