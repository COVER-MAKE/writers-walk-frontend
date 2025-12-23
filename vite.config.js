import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    server: {
        proxy: {
            '/openai': {
                target: 'https://api.openai.com',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/openai/, ''),
                secure: false,
                ws: true
            },

            '/images': {
                target: 'https://jinybook.site',
                changeOrigin: true,
                secure: false
            }
        }
    }
})
