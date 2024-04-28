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
        host: process.env.APP_PUBLIC_IP,
        public: `http://${process.env.APP_PUBLIC_IP}`,
        hmr: {
            host: process.env.APP_PUBLIC_IP,
        },
    },
});