import { LODControl } from './LODControl';
import { Camera, Object3D, Raycaster, Vector2, WebGLRenderer } from 'three';
import { MapView } from '../MapView';
export declare class LODRaycast implements LODControl {
    subdivisionRays: number;
    thresholdUp: number;
    thresholdDown: number;
    raycaster: Raycaster;
    mouse: Vector2;
    powerDistance: boolean;
    scaleDistance: boolean;
    updateLOD(view: MapView, camera: Camera, renderer: WebGLRenderer, scene: Object3D): void;
}
