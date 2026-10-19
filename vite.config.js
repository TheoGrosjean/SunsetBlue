import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// En production, le site est servi depuis https://<utilisateur>.github.io/SunsetBlue/
// (npm run dev reste à la racine : http://localhost:5173/)
export default defineConfig(({ command, isPreview }) => ({
  base: command === 'build' || isPreview ? '/SunsetBlue/' : '/',
  plugins: [vue(), tailwindcss()],
}))
