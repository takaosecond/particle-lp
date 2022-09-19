import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import * as dat from "lil-gui";

/**
 * デバッグ(色つけるときに追加)
 */
// const gui = new dat.GUI();

/**
 * 必須の3要素
 */
// Canvas
const canvas = document.querySelector("#webgl");

//Sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// Scene
const scene = new THREE.Scene();

// Camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 6;
scene.add(camera);

//Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * ここからパーティクルを記述
 */
const donutParticlesGeometry = new THREE.TorusGeometry(2.8, 0.7, 16, 100);

const donutParticlesMaterial = new THREE.PointsMaterial({
  size: 0.023,
  color: "#fff",
});

const donutParticles = new THREE.Points(donutParticlesGeometry, donutParticlesMaterial);

// パーティクルを追加
const count = 5000;
const particlesGeometry = new THREE.BufferGeometry();
const positionArray = new Float32Array(count * 3);

for (let i = 0; i < count * 3; i++) {
  positionArray[i] = (Math.random() - 0.5) * 15;
}

particlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positionArray, 3)
);

const particlesMaterial = new THREE.PointsMaterial({
  size: 0.01,
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);

scene.add(donutParticles, particles);

// gui.addColor(donutParticlesMaterial, "color");

//カメラ制御
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;

/**
 * アニメーション
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // カメラワークカメラワーク
  camera.position.x = Math.cos(elapsedTime * 0.5) * 6;
  camera.position.z = Math.sin(elapsedTime * 0.5) * 6;

  controls.update();
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick);
};

tick();

//ブラウザのリサイズ操作
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});
