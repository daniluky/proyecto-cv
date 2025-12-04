import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    cors: true,
    host: true,
    proxy: {
      '/api': {
        target: 'http://backend:5050',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});