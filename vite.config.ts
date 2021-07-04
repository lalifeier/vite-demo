import path from 'path'
import type { ConfigEnv, UserConfig } from 'vite'
import { loadEnv } from 'vite'
import { createPlugins } from './build'
import { createProxy, wrapperEnv } from './build/utils'

const pathResolve = (dir: string) => path.resolve(__dirname, dir)

export default ({ mode }: ConfigEnv): UserConfig => {

  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_DROP_CONSOLE, VITE_PROXY } = viteEnv

  return {
    plugins: createPlugins(viteEnv, mode),
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: [
        {
          find: /\/@\//,
          replacement: pathResolve('src') + '/',
        },
        {
          find: /\/#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    server: {
      host: true,
      port: VITE_PORT,
      open: false,
      proxy: createProxy(VITE_PROXY),
      cors: true,
    },
    build: {
      sourcemap: true,
      target: 'es2015',
      outDir: 'dist',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/variables.scss";`,
        },
      },
    },
    define: {},
    optimizeDeps: {
      include: [],
      exclude: [],
    },
  }
}
