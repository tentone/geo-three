var canvas = document.getElementById("canvas");

const SPACE = 0;
const EARTH = 1;

var scenes = [createWorldScene(), createMapScene()];

var active = SPACE;


var renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});

function createWorldScene() {
    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);
    
    // Globe
    var loader = new THREE.TextureLoader();
    loader.load('assets/texture_16k.jpg', function(texture) {
        var sphere = new THREE.Mesh(new THREE.SphereGeometry(Geo.UnitsUtils.EARTH_RADIUS, 256, 256), new THREE.MeshBasicMaterial({
            map: texture
        }));
        scene.add(sphere);
    });
    
    // Clouds
    // loader.load('assets/clouds_8k.jpg', function(cloudsTexture) {
    //     var clouds = new THREE.Mesh(new THREE.SphereGeometry(Geo.UnitsUtils.EARTH_RADIUS + 3e5, 128, 128), new THREE.MeshBasicMaterial({
    //         map: cloudsTexture,
    //         transparent: true,
    //         blending: THREE.AdditiveBlending
    //     }));
    //     clouds.onBeforeRender = function() {
    //         clouds.rotation.y += 1e-5;
    //     };
    //     scene.add(clouds);
    // });

    var camera = new THREE.PerspectiveCamera(60, 1, 0.01, 1e8);
    
    var controls = new THREE.MapControls(camera, canvas);
    controls.minDistance = Geo.UnitsUtils.EARTH_RADIUS + 3e4;
    controls.maxDistance = Geo.UnitsUtils.EARTH_RADIUS * 1e1;
    controls.enablePan = false;
    controls.zoomSpeed = 1.0;
    controls.rotateSpeed = 0.3; 
    camera.position.set(0, 0, Geo.UnitsUtils.EARTH_RADIUS + 1e7);

    return {camera: camera, controls: controls, scene: scene};
}

function createMapScene() {
    var camera = new THREE.PerspectiveCamera(60, 1, 0.01, 1e12);

    var controls = new THREE.OrbitControls(camera, canvas);
    controls.minDistance = 1.0;
    controls.maxDistance = 1.0;
    controls.zoomSpeed = 2.0;
    camera.position.set(0, 0, 100);

    var scene = new THREE.Scene();
    scene.background = new THREE.Color(0x444444);

    var map = new Geo.MapView(Geo.MapView.PLANAR, new Geo.OpenStreetMapsProvider());
    scene.add(map);
    map.updateMatrixWorld(true);

    var coords = Geo.UnitsUtils.datumsToSpherical(40.940119, -8.535589);
    controls.target.set(coords.x, 0, -coords.y);
    camera.position.set(0, 1000, 0);

    scene.add(new THREE.AmbientLight(0x777777));

    return {camera: camera, controls: controls, scene: scene};
}


var raycaster = new THREE.Raycaster();

document.body.onresize = function()
{
    const s = scenes[active];
    
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    
    s.camera.aspect = width / height;
    s.camera.updateProjectionMatrix();
}
document.body.onresize();

function animate()
{
    requestAnimationFrame(animate);
    
    const s = scenes[active];

    s.controls.update();
    renderer.render(s.scene, s.camera);

    if (active === SPACE) {
        const distance = s.controls.getDistance() - Geo.UnitsUtils.EARTH_RADIUS;
        if (distance < 1100000) {
            console.log('Distance to earth', distance);

            const pointer = new THREE.Vector2(0.5, 0.5);
            raycaster.setFromCamera(pointer, s.camera);

            const intersects = raycaster.intersectObjects(s.scene.children);
            console.log('Raycasting intersections', intersects);
            if (intersects.length > 0) {
                const pos = Geo.UnitsUtils.vectorToDatums(intersects[0].point);
                console.log('Calculated coordinates', pos);
            }

            


        }
    }


    
}
animate();