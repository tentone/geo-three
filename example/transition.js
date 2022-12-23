(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(require('Main'), require('three'), require('three/examples/jsm/controls/OrbitControls.js')) :
	typeof define === 'function' && define.amd ? define(['Main', 'three', 'three/examples/jsm/controls/OrbitControls.js'], factory) :
	(global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.Geo, global.THREE, global.OrbitControls_js));
})(this, (function (Geo, THREE, OrbitControls_js) { 'use strict';

	function _interopNamespace(e) {
		if (e && e.__esModule) return e;
		var n = Object.create(null);
		if (e) {
			Object.keys(e).forEach(function (k) {
				if (k !== 'default') {
					var d = Object.getOwnPropertyDescriptor(e, k);
					Object.defineProperty(n, k, d.get ? d : {
						enumerable: true,
						get: function () { return e[k]; }
					});
				}
			});
		}
		n["default"] = e;
		return Object.freeze(n);
	}

	var Geo__namespace = /*#__PURE__*/_interopNamespace(Geo);
	var THREE__namespace = /*#__PURE__*/_interopNamespace(THREE);

	var canvas = document.getElementById("canvas");

	// Spherical earth scene
	const SPHERE = 0;

	// Planar earth scene
	const PLANE = 1;

	// List of scenes
	const scenes = [createWorldScene(), createMapScene()];

	let active = SPHERE;

	let renderer = new THREE__namespace.WebGLRenderer({
	    canvas: canvas,
	    antialias: true
	});

	// Create scene for spherical earth
	function createWorldScene() {
	    var scene = new THREE__namespace.Scene();
	    scene.background = new THREE__namespace.Color(0x000000);
	    
	    // Globe
	    var loader = new THREE__namespace.TextureLoader();
	    loader.load('2k_earth_daymap.jpg', function(texture) {
	        var sphere = new THREE__namespace.Mesh(new THREE__namespace.SphereGeometry(Geo__namespace.UnitsUtils.EARTH_RADIUS, 256, 256), new THREE__namespace.MeshBasicMaterial({
	            map: texture
	        }));
	        scene.add(sphere);
	    });

	    var camera = new THREE__namespace.PerspectiveCamera(60, 1, 0.01, 1e8);
	    
	    var controls = new OrbitControls_js.MapControls(camera, canvas);
	    controls.minDistance = Geo__namespace.UnitsUtils.EARTH_RADIUS + 3e4;
	    controls.maxDistance = Geo__namespace.UnitsUtils.EARTH_RADIUS * 1e1;
	    controls.enablePan = false;
	    controls.zoomSpeed = 0.7;
	    controls.rotateSpeed = 0.3; 
	    controls.mouseButtons = {
	        LEFT: THREE__namespace.MOUSE.ROTATE,
	        MIDDLE: THREE__namespace.MOUSE.DOLLY,
	        RIGHT: THREE__namespace.MOUSE.PAN
	    };

	    // Set initial camera position 
	    camera.position.set(0, 0, Geo__namespace.UnitsUtils.EARTH_RADIUS + 1e7);

	    return {camera: camera, controls: controls, scene: scene};
	}

	// Create scene for planar map
	function createMapScene() {
	    var camera = new THREE__namespace.PerspectiveCamera(60, 1, 0.01, 1e12);

	    var controls = new OrbitControls_js.MapControls(camera, canvas);
	    controls.minDistance = 1.0;
	    controls.zoomSpeed = 2.0;

	    var scene = new THREE__namespace.Scene();
	    scene.background = new THREE__namespace.Color(0x444444);

	    var provider = new Geo__namespace.BingMapsProvider('', Geo__namespace.BingMapsProvider.AERIAL); // new Geo.OpenStreetMapsProvider()

	    var map = new Geo__namespace.MapView(Geo__namespace.MapView.PLANAR, provider);
	    scene.add(map);
	    map.updateMatrixWorld(true);

	    scene.add(new THREE__namespace.AmbientLight(0x777777));

	    return {camera: camera, controls: controls, scene: scene};
	}


	var raycaster = new THREE__namespace.Raycaster();

	document.body.onresize = function()
	{
	    var width = window.innerWidth;
	    var height = window.innerHeight;

	    renderer.setSize(width, height);
	    
	    for (let i = 0; i < scenes.length; i++) {
	        const s = scenes[i];
	        s.camera.aspect = width / height;
	        s.camera.updateProjectionMatrix();
	    }

	};
	document.body.onresize();

	function animate()
	{
	    requestAnimationFrame(animate);
	    
	    const s = scenes[active];

	    s.controls.update();
	    renderer.render(s.scene, s.camera);

	    const toggleDistance = 2e6;

	    if (active === SPHERE) {
	        // Get distance to the surface of earth
	        const distance = s.controls.getDistance() - Geo__namespace.UnitsUtils.EARTH_RADIUS;
	        if (distance < toggleDistance) {
	            // Set raycaster to the camera center.
	            const pointer = new THREE__namespace.Vector2(0.0, 0.0);
	            raycaster.setFromCamera(pointer, s.camera);
	            
	            // Raycast from center of the camera to the sphere surface
	            const intersects = raycaster.intersectObjects(s.scene.children);
	            if (intersects.length > 0) {
	                const point = intersects[0].point;

	                // Get coordinates from sphere surface
	                const pos = Geo__namespace.UnitsUtils.vectorToDatums(point);
	                
	                const planeScene = scenes[PLANE];

	                // Calculate plane coordinates
	                var coords = Geo__namespace.UnitsUtils.datumsToSpherical(pos.latitude, pos.longitude);
	                planeScene.controls.target.set(coords.x, 0, -coords.y);
	                planeScene.camera.position.set(coords.x, distance, -coords.y);

	                console.log('Geo-Three: Switched scene from sphere to plane.', point, pos, coords);

	                // Change scene to "plane" earth
	                active = PLANE;
	            }
	        }
	    } else if (active === PLANE) {
	        const distance = s.controls.getDistance();
	        if (distance > toggleDistance) {
	            // Datum coordinates
	            const target = s.controls.target;
	            const coords = Geo__namespace.UnitsUtils.sphericalToDatums(target.x, -target.z);

	            // Get sphere surface point from coordinates
	            const dir = Geo__namespace.UnitsUtils.datumsToVector(coords.latitude, coords.longitude);

	            const sphereScene = scenes[SPHERE];

	            // Set camera position 
	            dir.multiplyScalar(Geo__namespace.UnitsUtils.EARTH_RADIUS + distance);
	            sphereScene.camera.position.copy(dir);

	            console.log('Geo-Three: Switched scene from plane to sphere.', s.controls, coords, dir);

	            // Change to spherical earth model
	            active = SPHERE;
	        }
	    }
	}

	// Start animation loop
	animate();

}));
