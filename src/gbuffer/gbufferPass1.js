import * as THREE from 'three';
import pass1Vert from '../shaders/gbuffer_pass1.vert.glsl';
import pass1Frag from '../shaders/gbuffer_pass1.frag.glsl';

class Pass1 {
    constructor(window, diffuse) {

        const { innerWidth, innerHeight, devicePixelRatio } = window

        const config =
            {
                count: 2,
                minFilter: THREE.NearestFilter,
                magFilter: THREE.NearestFilter
            };

        this.renderTarget = new THREE.WebGLRenderTarget(innerWidth * devicePixelRatio, innerHeight * devicePixelRatio, config);

        this.renderTarget.textures[ 0 ].name = 'diffuse';
        this.renderTarget.textures[ 1 ].name = 'normal';

        this.scene = new THREE.Scene();
        this.scene.background = new THREE.Color( 0x222222 );

        this.camera = new THREE.PerspectiveCamera( 70, innerWidth / innerHeight, 0.1, 50 );
        this.camera.position.z = 4;

        const geometry = new THREE.TorusKnotGeometry( 1, 0.3, 128, 32 )

        const materialConfig =
            {
                name: 'G-Buffer Shader',
                vertexShader: pass1Vert,
                fragmentShader: pass1Frag,
                uniforms:
                    {
                        tDiffuse:
                            {
                                value: diffuse
                            },
                        repeat:
                            {
                                value: new THREE.Vector2( 5, 0.5 )
                            }
                    },
                glslVersion: THREE.GLSL3
            };

        const material = new THREE.RawShaderMaterial(materialConfig)

        this.scene.add(new THREE.Mesh(geometry, material))
    }
}

export default Pass1
