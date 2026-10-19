import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'

// En production, le site est servi depuis https://<utilisateur>.github.io/SunsetBlue/
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/SunsetBlue/' : '/',
  plugins: [vue(), tailwindcss()],
}))
