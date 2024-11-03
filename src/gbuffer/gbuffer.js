import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GUI } from 'three/addons/libs/lil-gui.module.min.js';
import Pass1 from "./gbufferPass1.js"
import Pass2 from "./gbufferPass2.js"

init();

let postScene, postCamera;

async function init() {

    const renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    const diffuse = await loadTexture('src/gbuffer/hardwood2_diffuse.jpg')
    diffuse.wrapS = THREE.RepeatWrapping;
    diffuse.wrapT = THREE.RepeatWrapping;
    diffuse.colorSpace = THREE.SRGBColorSpace;

    const pass1 = new Pass1(window, diffuse)
    const pass2 = new Pass2(pass1)

    const render = () => {

        pass1.scene.traverse(child => {
            if ( child.material !== undefined ) {
                child.material.wireframe = parameters.wireframe;
            }
        } );

        // render scene into target
        renderer.setRenderTarget( pass1.renderTarget );
        renderer.render( pass1.scene, pass1.camera );

        // render post FX
        renderer.setRenderTarget(null);
        renderer.render(pass2.scene, pass2.camera);

    }

    const onWindowResize = () => {

        pass1.camera.aspect = window.innerWidth / window.innerHeight;
        pass1.camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

        const dpr = renderer.getPixelRatio();
        pass1.renderTarget.setSize( window.innerWidth * dpr, window.innerHeight * dpr );

        render();
    }

    const controls = new OrbitControls( pass1.camera, renderer.domElement );
    controls.addEventListener('change', render);

    const parameters =
        {
            wireframe: false
        };

    const gui = new GUI();
    gui.add(parameters, 'wireframe' );
    gui.onChange(render);

    window.addEventListener( 'resize', onWindowResize );

}

async function loadTexture(url) {
    return new Promise((resolve, reject) => {
        const textureLoader = new THREE.TextureLoader();
        textureLoader.load(
            url,
            (texture) => resolve(texture), // onLoad: Resolve the promise with the texture
            undefined,                     // onProgress: We can ignore this for simplicity
            (error) => reject(error)       // onError: Reject the promise with the error
        );
    });
}
