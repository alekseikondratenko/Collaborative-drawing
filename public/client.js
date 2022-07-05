import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import Stats from 'three/examples/jsm/libs/stats.module'

var socket

function setup(){
    const scene = new THREE.Scene()

    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100)
    camera.position.z = 2

    const renderer = new THREE.WebGLRenderer()
    renderer.setSize(window.innerWidth, window.innerHeight)
    document.body.appendChild(renderer.domElement)

    const controls = new OrbitControls(camera, renderer.domElement)

    const geometry = new THREE.BoxGeometry()
    const material = new THREE.MeshBasicMaterial({
        color: 0x00ff00,
        wireframe: true,
    })
    const cube = new THREE.Mesh(geometry, material)
    scene.add(cube)

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

    const stats = Stats()
    document.body.appendChild(stats.dom)

    // function animate() {
    //     requestAnimationFrame(animate)
    //     cube.rotation.x += 0.01
    //     cube.rotation.y += 0.01
    //     controls.update()
    //     render()
    //     stats.update()
    // }

    // function render() {
    //     renderer.render(scene, camera)
    // }

    // Animate
    const clock = new THREE.Clock()

    const tick = () =>
    {
        const elapsedTime = clock.getElapsedTime()

        // Update controls
        controls.update()

        // Render
        renderer.render(scene, camera)

        // Call tick again on the next frame
        window.requestAnimationFrame(tick)

        stats.update()
    }

    tick()

    socket = io.connect('http://localhost:3000') // Connect client to server in socket
}

setup()
//animate()