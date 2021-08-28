import { MapView } from '../MapView';
import { Camera, WebGLRenderer, Object3D } from 'three';
export interface LODControl {
    updateLOD(view: MapView, camera: Camera, renderer: WebGLRenderer, scene: Object3D): void;
}
