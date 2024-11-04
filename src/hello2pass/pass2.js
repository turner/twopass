import * as THREE from 'three';
import pass2Vert from '../shaders/pass2.vert.glsl';
import pass2Frag from '../shaders/pass2.frag.glsl';

export default class RenderPass2 {
    constructor(pass1) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

        const materialConfig =
            {
                vertexShader: pass2Vert,
                fragmentShader: pass2Frag,
                uniforms:
                    {
                        tDiffuse:
                            {
                                value: pass1.renderTarget.texture
                            }
                    }
            };

        const mesh = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), new THREE.ShaderMaterial(materialConfig));
        this.scene.add(mesh);
    }
}
