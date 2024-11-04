import { defineConfig } from 'vite';
import glsl from 'vite-plugin-glsl';

export default defineConfig({
    plugins: [glsl()],
    build: {
        assetsDir: 'assets', // Organizes assets in a specific folder in the build output
    },
    base: '', // Use relative paths to ensure the app works in preview and deploys correctly
});
