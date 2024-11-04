import * as THREE from "three"
import pass2Vert from "./shaders/gbuffer_pass2.vert.glsl"
import pass2Frag from "./shaders/gbuffer_pass2.frag.glsl"

class Pass2 {
    constructor(pass1) {

        this.scene = new THREE.Scene();
        this.camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );

        const geometry = new THREE.PlaneGeometry( 2, 2 )

        const materialConfig =
            {
                name: 'Final Render Shader',
                vertexShader: pass2Vert,
                fragmentShader: pass2Frag,
                uniforms:
                    {
                        tDiffuse:
                            {
                                value: pass1.renderTarget.textures[ 0 ]
                            },
                        tNormal:
                            {
                                value: pass1.renderTarget.textures[ 1 ]
                            },
                    },
                glslVersion: THREE.GLSL3
            };

        const material = new THREE.RawShaderMaterial(materialConfig)

        this.scene.add( new THREE.Mesh(geometry, material) );

    }
}

export default Pass2
