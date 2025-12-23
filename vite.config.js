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

            '/api': { // 내 백엔드 API를 위한 설정 추가
                target: 'http://localhost:5173',
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, '')
            },

            '/images': {
                target: 'https://jinybook.site',
                changeOrigin: true,
                secure: false
            }
        }
    }
})
