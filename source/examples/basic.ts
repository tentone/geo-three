// @ts-nocheck

import {WebGLRenderer, Scene, Color, AmbientLight, PerspectiveCamera} from 'three';
import {MapControls} from 'three/examples/jsm/controls/OrbitControls.js';
import {MapView, BingMapsProvider, UnitsUtils} from '../Main';

var canvas = document.getElementById('canvas');

var renderer = new WebGLRenderer({
	canvas: canvas,
	antialias: true
});

var scene = new Scene();
scene.background = new Color(0.4, 0.4, 0.4);

var provider = new BingMapsProvider('', BingMapsProvider.AERIAL);

var map = new MapView(MapView.PLANAR, provider);
scene.add(map);
map.updateMatrixWorld(true);

var camera = new PerspectiveCamera(80, 1, 0.1, 1e12);

var controls = new MapControls(camera, canvas);
controls.minDistance = 1e1;
controls.zoomSpeed = 2.0;

var coords = UnitsUtils.datumsToSpherical(40.940119, -8.535589);
controls.target.set(coords.x, 0, -coords.y);
camera.position.set(0, 1000, 0);

scene.add(new AmbientLight(0x777777));

document.body.onresize = function(): void
{
	var width = window.innerWidth;
	var height = window.innerHeight;
	renderer.setSize(width, height);
	camera.aspect = width / height;
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
