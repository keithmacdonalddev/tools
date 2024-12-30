import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    // Define build output directory to match vercel.json
    build: {
        outDir: 'dist',
        // Ensure sourcemaps are generated for better debugging
        sourcemap: true,
    },
    // Configure server options
    server: {
        // Allow connections from network
        host: true,
        // Configure proxy for API requests in development
        proxy: {
            '/api': {
                target: 'https://tools-api-chi.vercel.app/',
                changeOrigin: true,
                secure: false,
            },
        },
    },
});
