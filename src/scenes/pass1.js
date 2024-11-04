import * as THREE from 'three';
import pass1Vert from '../shaders/pass1.vert.glsl';
import pass1Frag from '../shaders/pass1.frag.glsl';

export default class RenderPass1 {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10);
        this.camera.position.z = 2;

        const materialConfig =
            {
                vertexShader: pass1Vert,
                fragmentShader: pass1Frag
            };

        this.scene.add( new THREE.Mesh(new THREE.BoxGeometry(), new THREE.ShaderMaterial(materialConfig)) );

        // Create a render target for offscreen rendering
        this.renderTarget = new THREE.WebGLRenderTarget(window.innerWidth, window.innerHeight);
    }
}
