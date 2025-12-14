import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          // MUI core libraries
          'mui-core': ['@mui/material', '@emotion/react', '@emotion/styled'],
          // Firebase
          'firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore', 'firebase/storage'],
          // Animation libraries
          'animation': ['gsap', 'lenis'],
          // Image processing
          'image-processing': ['browser-image-compression', 'heic2any'],
          // DnD
          'dnd': ['@dnd-kit/core', '@dnd-kit/sortable'],
          // React ecosystem
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        },
      },
    },
    chunkSizeWarningLimit: 1000,
  },
})
