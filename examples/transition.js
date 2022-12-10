var canvas = document.getElementById("canvas");

var renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    antialias: true
});

var scene = new THREE.Scene();
scene.background = new THREE.Color(0.4, 0.4, 0.4);

var map = new Geo.MapView(Geo.MapView.PLANAR, new Geo.OpenStreetMapsProvider());
scene.add(map);
map.updateMatrixWorld(true);

var camera = new THREE.PerspectiveCamera(80, 1, 1e2, 1e12);

var controls = new THREE.MapControls(camera, canvas);
controls.minDistance = 1e1;
controls.zoomSpeed = 2.0;

var coords = Geo.UnitsUtils.datumsToSpherical(40.940119, -8.535589);
controls.target.set(coords.x, 0, -coords.y);
camera.position.set(0, 1000, 0);

scene.add(new THREE.AmbientLight(0x777777));

var raycaster = new THREE.Raycaster();

document.body.onresize = function()
{
    var width = window.innerWidth;
    var height = window.innerHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
}
document.body.onresize();

const pointer = new THREE.Vector2();
window.addEventListener('pointermove', function (event) {
    pointer.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    pointer.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
});

window.addEventListener('dblclick', function (event) {
    const intersects = raycaster.intersectObjects(scene.children);
    console.log('Raycasting intersections', intersects);
});

function animate()
{
    requestAnimationFrame(animate);
    
    raycaster.setFromCamera(pointer, camera);

    controls.update();
    renderer.render(scene, camera);
}
animate();