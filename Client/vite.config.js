import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    proxy: {
      '/user': 'https://chat-app-t6s4.onrender.com',
    },
  },
  plugins: [react()],
})
