import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import * as lil from "lil-gui"

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

//* light for the standard material

const highIntensityLight = new THREE.DirectionalLight(0xffffff, 2)
highIntensityLight.position.set(10, 20, 15)
scene.add(highIntensityLight)

const directionalLight = new THREE.DirectionalLight(0xffffff, 3)
directionalLight.position.set(1, 1, 1)
scene.add(directionalLight)

const ambientLight = new THREE.AmbientLight(0xffffff, 1)
scene.add(ambientLight)

const pointLight = new THREE.PointLight(0xffffff, 1, 10, 2)
pointLight.position.set(0, 5, 0)
scene.add(pointLight)

//* Helper Lights
// const highIntensityLightHelper = new THREE.DirectionalLightHelper(highIntensityLight, 5)
// scene.add(highIntensityLightHelper)

// const directionalLightHelper = new THREE.DirectionalLightHelper(directionalLight, 5)
// scene.add(directionalLightHelper)

// const pointLightHelper = new THREE.PointLightHelper(pointLight, 5)
// scene.add(pointLightHelper)

const geometry = new THREE.BoxGeometry(3, 1.8, 2);
// const geometry = new THREE.SphereGeometry(1, 10, 10)
// const geometry = new THREE.CylinderGeometry(1, 1, 0.5, 100, 1, true);

//* Basic Material
/* const material = new THREE.MeshBasicMaterial({
  color: 0x00ff00,
  // wireframe: true,
  side: THREE.DoubleSide
}); */

//* textures

let loader = new THREE.TextureLoader()
let color =  loader.load("./text/color.jpg")
let roughness = loader.load("./text/roughness.jpg")
let normal = loader.load("./text/normal.png")

//* Standerd Material
const material = new THREE.MeshStandardMaterial({
  // color: 0x00ff00,
  // roughness: .8,
  // metalness: .5,
  //* for textures
  map: color,
  roughnessMap: roughness,
  normalMap: normal
})

const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

camera.position.z = 8;

const canvas = document.querySelector("canvas");
const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);

window.addEventListener("resize", () => {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});

//* Lin GUI

// const gui = new lil.GUI()

// const materialFolder = gui.addFolder('Material')
// materialFolder.add(material, 'roughness', 0, 1).name('Roughness')
// materialFolder.add(material, 'metalness', 0, 1).name('Metalness')
// materialFolder.addColor(material, 'color').name('Color')

// const meshFolder = gui.addFolder('Mesh')
// meshFolder.add(cube.scale, 'x', .1, 5).name('Scale X')
// meshFolder.add(cube.scale, 'y', .1, 5).name('Scale Y')
// meshFolder.add(cube.scale, 'z', .1, 5).name('Scale Z')
// meshFolder.add(cube.position, 'x', -10, 10).name('Position X')
// meshFolder.add(cube.position, 'y', -10, 10).name('Position Y')
// meshFolder.add(cube.position, 'z', -10, 10).name('Position Z')

// const lightFolder = gui.addFolder('Lights')

// const ambientFolder = lightFolder.addFolder('Ambient Light')
// ambientFolder.add(ambientLight, 'intensity', 0, 2).name('Intensity')

// const directionalFolder = lightFolder.addFolder('Directional Light')
// directionalFolder.add(directionalLight, 'intensity', 0, 5).name('Intensity')
// directionalFolder.add(directionalLight.position, 'x', -10, 10).name('Position X')
// directionalFolder.add(directionalLight.position, 'y', -10, 10).name('Position Y')
// directionalFolder.add(directionalLight.position, 'z', -10, 10).name('Position Z')

// const pointFolder = lightFolder.addFolder('Point Light')
// pointFolder.add(pointLight, 'intensity', 0, 5).name('Intensity')
// pointFolder.add(pointLight.position, 'x', -10, 10).name('Position X')
// pointFolder.add(pointLight.position, 'y', -10, 10).name('Position Y')
// pointFolder.add(pointLight.position, 'z', -10, 10).name('Position Z')

//// let clock = new THREE.Clock();

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
// controls.autoRotate = true;
// controls.autoRotateSpeed = 2;
controls.enableZoom = false;

function animate() {
  window.requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();