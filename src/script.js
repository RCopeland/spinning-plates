import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Textures
 */

const textureLoader = new THREE.TextureLoader();

const doorAlphaTexture = textureLoader.load('/textures/door/alpha.jpg');
const doorAmbientOcclusionTexture = textureLoader.load('/textures/door/ambientOcclusion.jpg');
const doorColorTexture = textureLoader.load('/textures/door/color.jpg');
const doorHeightTexture = textureLoader.load('/textures/door/height.jpg');
const doorMetalnessTexture = textureLoader.load('/textures/door/metalness.jpg');
const doorNormalTexture = textureLoader.load('/textures/door/normal.jpg');
const doorRoughnessTexture = textureLoader.load('/textures/door/roughness.jpg');

const matcapTexture = textureLoader.load('/textures/matcaps/3.png');
const gradientTexture = textureLoader.load('/textures/gradients/3.jpg');


/**
 * Objects
 */

const material = new THREE.MeshNormalMaterial();
material.side = THREE.DoubleSide;

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material);
sphere.position.x = -1.5;
sphere.position.z = 1000;

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1,1), material);

const plane2 = new THREE.Mesh(new THREE.PlaneGeometry(1,1), material);
plane2.position.x = -1.1;
plane2.position.y = -1.1;

const plane3 = new THREE.Mesh(new THREE.PlaneGeometry(1,1), material);
plane3.position.x = -1.1;
plane3.position.y = 0;

const plane4 = new THREE.Mesh(new THREE.PlaneGeometry(1,1), material);
plane4.position.x = -1.1;
plane4.position.y = 1.1;

const plane5 = new THREE.Mesh(new THREE.PlaneGeometry(1,1), material);
plane5.position.y = -1.1;

const plane6 = new THREE.Mesh(new THREE.PlaneGeometry(1,1), material);
plane6.position.y = 1.1;

const plane7 = new THREE.Mesh(new THREE.PlaneGeometry(1,1), material);
plane7.position.x = 1.1;
plane7.position.y = 1.1;

const plane8 = new THREE.Mesh(new THREE.PlaneGeometry(1,1), material);
plane8.position.x = 1.1;
plane8.position.y = 0;

const plane9 = new THREE.Mesh(new THREE.PlaneGeometry(1,1), material);
plane9.position.x = 1.1;
plane9.position.y = -1.1;


const torus = new THREE.Mesh(new THREE.TorusGeometry(0.5, 0.2, 16, 32), material);
torus.position.x = 1.5;
torus.position.z = 1000;

scene.add(plane, plane2, plane3);
scene.add(plane4, plane5, plane6);
scene.add(plane7, plane8, plane9);

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}



window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 4;
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()
const planes = [plane, plane2,plane3, plane4, plane5, plane6, plane7, plane8, plane9];
const group = new THREE.Group();
group.add(plane2, plane3, plane4, plane5, plane6, plane7, plane8, plane9);
scene.add(group);

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects

    sphere.rotation.y = elapsedTime * 0.1;
    plane.rotation.y = elapsedTime * 0.1;
    planes.forEach((plane, index) => {
       plane.rotation.y += elapsedTime * 0.1 + index / 100;
       plane.position.z = elapsedTime * Math.sin(0);
    });

    group.rotation.z = elapsedTime * 0.5;

    camera.position.z -= 0.003;

    if(Math.abs(camera.position.z) > 4) {
        camera.position.z = 4
    }

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()
