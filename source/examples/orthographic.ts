// @ts-nocheck

import {WebGLRenderer, Scene, Color, AmbientLight, PerspectiveCamera, LinearSRGBColorSpace, OrthographicCamera} from 'three';
import {MapControls} from 'three/examples/jsm/controls/MapControls.js';
import {MapView, BingMapsProvider, UnitsUtils, LODFrustumOrthographic} from '../Main';

var canvas = document.getElementById('canvas');

var renderer = new WebGLRenderer({
	canvas: canvas,
	antialias: true
});

var scene = new Scene();
scene.background = new Color(0.4, 0.4, 0.4, LinearSRGBColorSpace);

var provider = new BingMapsProvider('', BingMapsProvider.AERIAL);

var map = new MapView(MapView.PLANAR, provider, undefined, new LODFrustumOrthographic());
scene.add(map);
map.updateMatrixWorld(true);

var camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 2e12);
camera.rotation.set(0, -Math.PI/2, 0);
camera.position.set(0, 0, 0);

var controls = new MapControls(camera, canvas);
controls.enableRotate = false;
controls.minDistance = 2e3;
controls.zoomSpeed = 2.0;

scene.add(new AmbientLight(0x777777));

document.body.onresize = function(): void
{
	var width = window.innerWidth;
	var height = window.innerHeight;
	renderer.setSize(width, height);
	
	camera.left = -width / 2;
	camera.right = width / 2;
	camera.top = height / 2;
	camera.bottom = -height / 2;

	camera.updateProjectionMatrix();
};
// @ts-ignore
document.body.onresize();

function animate(): void
{
	requestAnimationFrame(animate);
	controls.update();
	renderer.render(scene, camera);
}
animate();
