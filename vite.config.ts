import vue from '@vitejs/plugin-vue'
import path from 'path'
import { defineConfig } from 'vite'


const pathResolve = (dir: string) => path.join(__dirname, dir)

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: './',
  resolve: {
    alias: [{ find: '@', replacement: pathResolve('src') }],
  },
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "@/styles/variables.scss";`,
      },
    },
  },
  server: {
    port: 3000,
    open: false,
    proxy: {
      '/api': {
        target: 'http://127.0.0.1',
        changeOrigin: true,
        rewrite: (path) => path.replace('/api/', '/'),
      },
    },
    cors: true,
  },
})
