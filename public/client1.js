import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'

var socket

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 1, 1000);
camera.position.set(3, 5, 8);
camera.lookAt(scene.position);
var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setSize(innerWidth, innerHeight);
document.body.appendChild(renderer.domElement);

var controls = new OrbitControls(camera, renderer.domElement);

scene.add(new THREE.GridHelper(10, 10));

var h = 1.3333333432674408;
// var pyramidGeom = new THREE.ConeBufferGeometry(Math.sqrt(2/3), h, 3);
// pyramidGeom.translate(0, h * 0.5, 0);

var boxGeom = new THREE.BoxGeometry(1, 1, 1);
boxGeom.translate(0, 0.5, 0);

var boxMat = new THREE.MeshBasicMaterial({color: "red"});

var box = new THREE.Mesh(boxGeom, boxMat);
scene.add(box);

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();
var plane = new THREE.Plane();
var pNormal = new THREE.Vector3(0, 1, 0); // plane's normal
var planeIntersect = new THREE.Vector3(); // point of intersection with the plane
var pIntersect = new THREE.Vector3(); // point of intersection with an object (plane's point)
var shift = new THREE.Vector3(); // distance between position of an object and points of intersection with the object
var isDragging = false;
var dragObject;

// events
document.addEventListener("pointermove", event => {

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);
        
    if (isDragging) {
        raycaster.ray.intersectPlane(plane, planeIntersect);
        dragObject.position.addVectors(planeIntersect, shift);
    }
});

document.addEventListener("pointerdown", () => {
        var intersects = raycaster.intersectObjects([box]);
    if (intersects.length > 0) {
        controls.enabled = false;
        pIntersect.copy(intersects[0].point);
    plane.setFromNormalAndCoplanarPoint(pNormal, pIntersect);
    shift.subVectors(intersects[0].object.position, intersects[0].point);
    isDragging = true;
    dragObject = intersects[0].object;
    
    }
} );

document.addEventListener("pointerup", () => {
    isDragging = false;
    dragObject = null;
    controls.enabled = true;
    var data = {
        x: box.position.x,
        y: box.position.y,
        z: box.position.z,
    }

    socket.emit('Get positions', data)
    
} );


window.addEventListener(
    'resize',
    () => {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer.render(scene, camera)
    },
    false
)


renderer.setAnimationLoop(() => {
    renderer.render(scene, camera);
    
    })



socket = io.connect('http://localhost:3000') // Connect client to server in socket
socket.on('Redraw figure', newDrawing)


function newDrawing(data){
    box.position.set(data.x, data.y, data.z)
    //console.log(data)
}