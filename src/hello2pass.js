import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import RenderPass1 from './hello2pass/pass1.js';
import RenderPass2 from './hello2pass/pass2.js';

// Initialize renderer and controls
const canvas = document.getElementById('webgl-canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Initialize render passes
const pass1 = new RenderPass1();
const pass2 = new RenderPass2(pass1);

// Add OrbitControls
const controls = new OrbitControls(pass1.camera, renderer.domElement);
controls.enableDamping = true; // Smooth the controls
controls.dampingFactor = 0.05; // Control damping effect
controls.screenSpacePanning = false; // Toggle pan behavior

function render() {

    controls.update();

    // pass 1
    renderer.setRenderTarget(pass1.renderTarget);
    renderer.render(pass1.scene, pass1.camera);

    // pass 2
    renderer.setRenderTarget(null);
    renderer.render(pass2.scene, pass2.camera);

    requestAnimationFrame(render);
}
render();
