import * as THREE from 'three';

class Renderer {
    constructor(window) {
        const renderer = new THREE.WebGLRenderer();
        renderer.setPixelRatio(window.devicePixelRatio);
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Use a proxy to dynamically forward method calls and property accesses
        return new Proxy(this, {
            get: (target, prop) => {
                // Forward the property if it exists on the underlying renderer
                if (prop in renderer) {
                    return typeof renderer[prop] === 'function'
                        ? renderer[prop].bind(renderer)
                        : renderer[prop];
                }
                // Otherwise, return from this object (for any custom properties or methods)
                return target[prop];
            }
        });
    }
}

export default Renderer
