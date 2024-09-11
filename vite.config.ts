import path from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import babel from 'vite-plugin-babel'

export default defineConfig({
    plugins: [react(), babel()],
    define: {
        VITE_API_KEY: JSON.stringify(process.env.VITE_API_KEY),
        VITE_AUTH_DOMAIN: JSON.stringify(process.env.VITE_AUTH_DOMAIN),
        VITE_PROJECT_ID: JSON.stringify(process.env.VITE_PROJECT_ID),
        VITE_STORAGE_BUCKET: JSON.stringify(process.env.VITE_STORAGE_BUCKET),
        VITE_MESSAGING_SENDER_ID: JSON.stringify(process.env.VITE_MESSAGING_SENDER_ID),
        VITE_APP_ID: JSON.stringify(process.env.VITE_APP_ID),
        VITE_MEASUREMENT_ID: JSON.stringify(process.env.VITE_MEASUREMENT_ID),
    },
    server: {
        open: true,
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
    optimizeDeps: {
        include: ['file-type'],
    },
})
