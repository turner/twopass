import * as THREE from "three"

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

export { loadTexture }
