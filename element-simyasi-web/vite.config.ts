import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Relative base so the build works from any subpath (GitHub Pages
  // project site, a CDN folder, opening dist/index.html directly, etc.)
  // without needing to know the final deploy path in advance.
  base: './',
})
