import { type Camera, type Object3D, type WebGLRenderer } from 'three';
import { LODFrustum } from './LODFrustum';
import { MapView } from '../MapView';
export declare class LODFrustumOrthographic extends LODFrustum {
    updateLOD(view: MapView, camera: Camera, renderer: WebGLRenderer, scene: Object3D): void;
}
