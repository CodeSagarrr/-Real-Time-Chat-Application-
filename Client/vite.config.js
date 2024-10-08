import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import dotenv from 'dotenv'

dotenv.config()
// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/user': 'http://localhost:8080',
    },
  },
  build: {
    minify: false,
  },
  plugins: [react()],
})
