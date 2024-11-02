import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import RenderPass1 from './scenes/pass1.js';
import RenderPass2 from './scenes/pass2.js';

// Initialize renderer and controls
const canvas = document.getElementById('webgl-canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// Initialize render passes
const scene1 = new RenderPass1();
const scene2 = new RenderPass2();

// Add OrbitControls
const controls = new OrbitControls(scene1.camera, renderer.domElement);
controls.enableDamping = true; // Smooth the controls
controls.dampingFactor = 0.05; // Control damping effect
controls.screenSpacePanning = false; // Toggle pan behavior

function render() {
    // Update controls on each frame
    controls.update();

    // First pass: Render to the offscreen render target
    renderer.setRenderTarget(scene1.renderTarget);
    renderer.render(scene1.scene, scene1.camera);

    // Second pass: Render to the screen using data from the first pass
    renderer.setRenderTarget(null);
    scene2.updateTexture(scene1.renderTarget.texture);
    renderer.render(scene2.scene, scene2.camera);

    // Request the next frame
    requestAnimationFrame(render);
}
render();
