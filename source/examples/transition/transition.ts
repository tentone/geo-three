
import {WebGLRenderer, Scene, Color, TextureLoader, Mesh, SphereGeometry, MeshBasicMaterial, PerspectiveCamera, MOUSE, AmbientLight, Raycaster, Vector2} from 'three';
import {MapControls} from "three/examples/jsm/controls/OrbitControls.js";
import {UnitsUtils, BingMapsProvider, MapView} from '../../Main';

var canvas = document.getElementById("canvas");

// Spherical earth scene
const SPHERE = 0;

// Planar earth scene
const PLANE = 1;

// List of scenes
const scenes = [createWorldScene(), createMapScene()];

let active = SPHERE;

let renderer = new WebGLRenderer({
    canvas: canvas,
    antialias: true
});

// Create scene for spherical earth
function createWorldScene() {
    var scene = new Scene();
    scene.background = new Color(0x000000);
    
    // Globe
    var loader = new TextureLoader();
    loader.load('2k_earth_daymap.jpg', function(texture) {
        var sphere = new Mesh(new SphereGeometry(UnitsUtils.EARTH_RADIUS, 256, 256), new MeshBasicMaterial({
            map: texture
        }));
        scene.add(sphere);
    });

    var camera = new PerspectiveCamera(60, 1, 0.01, 1e8);
    
    var controls = new MapControls(camera, canvas);
    controls.minDistance = UnitsUtils.EARTH_RADIUS + 3e4;
    controls.maxDistance = UnitsUtils.EARTH_RADIUS * 1e1;
    controls.enablePan = false;
    controls.zoomSpeed = 0.7;
    controls.rotateSpeed = 0.3; 
    controls.mouseButtons = {
        LEFT: MOUSE.ROTATE,
        MIDDLE: MOUSE.DOLLY,
        RIGHT: MOUSE.PAN
    };

    // Set initial camera position 
    camera.position.set(0, 0, UnitsUtils.EARTH_RADIUS + 1e7);

    return {camera: camera, controls: controls, scene: scene};
}

// Create scene for planar map
function createMapScene() {
    var camera = new PerspectiveCamera(60, 1, 0.01, 1e12);

    var controls = new MapControls(camera, canvas);
    controls.minDistance = 1.0;
    controls.zoomSpeed = 2.0;

    var scene = new Scene();
    scene.background = new Color(0x444444);

    var provider = new BingMapsProvider('', BingMapsProvider.AERIAL); // new OpenStreetMapsProvider()

    var map = new MapView(MapView.PLANAR, provider);
    scene.add(map);
    map.updateMatrixWorld(true);

    scene.add(new AmbientLight(0x777777));

    return {camera: camera, controls: controls, scene: scene};
}


var raycaster = new Raycaster();

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

}
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
        const distance = s.controls.getDistance() - UnitsUtils.EARTH_RADIUS;
        if (distance < toggleDistance) {
            // Set raycaster to the camera center.
            const pointer = new Vector2(0.0, 0.0);
            raycaster.setFromCamera(pointer, s.camera);
            
            // Raycast from center of the camera to the sphere surface
            const intersects = raycaster.intersectObjects(s.scene.children);
            if (intersects.length > 0) {
                const point = intersects[0].point;

                // Get coordinates from sphere surface
                const pos = UnitsUtils.vectorToDatums(point);
                
                const planeScene = scenes[PLANE];

                // Calculate plane coordinates
                var coords = UnitsUtils.datumsToSpherical(pos.latitude, pos.longitude);
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
            const coords = UnitsUtils.sphericalToDatums(target.x, -target.z);

            // Get sphere surface point from coordinates
            const dir = UnitsUtils.datumsToVector(coords.latitude, coords.longitude);

            const sphereScene = scenes[SPHERE];

            // Set camera position 
            dir.multiplyScalar(UnitsUtils.EARTH_RADIUS + distance);
            sphereScene.camera.position.copy(dir);

            console.log('Geo-Three: Switched scene from plane to sphere.', s.controls, coords, dir);

            // Change to spherical earth model
            active = SPHERE;
        }
    }
}

// Start animation loop
animate();
