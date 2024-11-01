import * as THREE from 'three';
import RenderPass1 from './scenes/pass1.js';
import RenderPass2 from './scenes/pass2.js';

const canvas = document.getElementById('webgl-canvas');
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

const pass1 = new RenderPass1();
const pass2 = new RenderPass2();

function render() {
    // First pass: Render to a custom framebuffer
    renderer.setRenderTarget(pass1.renderTarget);
    renderer.render(pass1.scene, pass1.camera);

    // Second pass: Render to the screen using data from first pass
    renderer.setRenderTarget(null);
    pass2.updateTexture(pass1.renderTarget.texture);
    renderer.render(pass2.scene, pass2.camera);

    requestAnimationFrame(render);
}
render();
