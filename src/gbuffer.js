import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import Pass1 from "./gbuffer/gbufferPass1.js"
import Pass2 from "./gbuffer/gbufferPass2.js"
import {loadTexture} from "./utils/utils.js"
import Renderer from "./gbuffer/renderer.js"
import GUIService from "./gbuffer/GUIService.js"
import texturePath from './assets/hardwood2_diffuse.jpg';
import './styles/main.css';


document.addEventListener("DOMContentLoaded", async (event) => {
    await init();
});

async function init() {

    const renderer = new Renderer(window)

    const diffuse = await loadTexture(texturePath)
    diffuse.wrapS = THREE.RepeatWrapping;
    diffuse.wrapT = THREE.RepeatWrapping;
    diffuse.colorSpace = THREE.SRGBColorSpace;

    const pass1 = new Pass1(window, diffuse)
    const pass2 = new Pass2(pass1)

    const controls = new OrbitControls( pass1.camera, renderer.domElement );
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.screenSpacePanning = false;

    const guiService = new GUIService({ wireframe: false })

    const render = () => {

        // update orbit control
        controls.update();

        // update material properties set via GUI widget
        pass1.scene.traverse(child => {
            if ( child.material !== undefined ) {
                child.material.wireframe = guiService.getValue('wireframe');
            }
        } );

        // pass 1
        renderer.setRenderTarget(pass1.renderTarget);
        renderer.render(pass1.scene, pass1.camera);

        // pass 2
        renderer.setRenderTarget(null);
        renderer.render(pass2.scene, pass2.camera);

        requestAnimationFrame(render);
    }

    const onWindowResize = () => {

        pass1.camera.aspect = window.innerWidth / window.innerHeight;
        pass1.camera.updateProjectionMatrix();

        renderer.setSize( window.innerWidth, window.innerHeight );

        const dpr = renderer.getPixelRatio();
        pass1.renderTarget.setSize( window.innerWidth * dpr, window.innerHeight * dpr );

        render();
    }

    window.addEventListener( 'resize', onWindowResize );

    guiService.setOnRender(render)

    render();
}
