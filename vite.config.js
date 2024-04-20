import { defineConfig } from 'vite';
import laravel from 'laravel-vite-plugin';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [
        laravel({
            input: 'resources/js/app.jsx',
            refresh: true,
        }),
        react(),
    ],
    build: {
        manifest: true,
        outDir: 'public/build',
    },
    server: {
        cors: true,
        host: '18.219.64.10',
        public: 'http://18.219.64.10',
        hmr: {
            host: '18.219.64.10',
        },
    },
});