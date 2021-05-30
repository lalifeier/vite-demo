import path from 'path';
import type { ConfigEnv, UserConfig } from 'vite';
import { loadEnv } from 'vite';
import { createPlugins } from './build';

const pathResolve = (dir: string) => path.resolve(__dirname, dir)

export default ({ mode }: ConfigEnv): UserConfig => {

  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) }

  return {
    plugins: createPlugins(),
    base: './',
    resolve: {
      alias: [
        {
          find: '/@',
          replacement: pathResolve('src'),
        },
        {
          find: '/#',
          replacement: pathResolve('types'),
        },
      ],
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/variables.scss";`,
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
    build: {},
    define: {},
    optimizeDeps: {
      include: [],
      exclude: [],
    },
  }
}
