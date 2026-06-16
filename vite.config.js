import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: './',
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules/react-dom') || id.includes('node_modules/react/')) return 'vendor'
          if (id.includes('node_modules/framer-motion') || id.includes('node_modules/gsap')) return 'animations'
          if (id.includes('node_modules/three') || id.includes('node_modules/@react-three')) return 'three'
        },
      },
    },
  },
})
