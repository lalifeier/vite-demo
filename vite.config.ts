import dayjs from 'dayjs'
import path from 'path'
import type { ConfigEnv, UserConfig } from 'vite'
import { loadEnv } from 'vite'
import { createPlugins } from './build/index'
import { createProxy, wrapperEnv } from './build/utils'
import pkg from './package.json'
const pathResolve = (dir: string) => path.resolve(__dirname, dir)

const { dependencies, devDependencies, name, version } = pkg;
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
}

export default ({ command, mode }: ConfigEnv): UserConfig => {
  const env = loadEnv(mode, process.cwd())
  const viteEnv = wrapperEnv(env)
  const { VITE_PORT, VITE_PUBLIC_PATH, VITE_DROP_CONSOLE, VITE_PROXY } = viteEnv

  const isBuild = command === 'build'

  return {
    plugins: createPlugins(viteEnv, isBuild, mode),
    base: VITE_PUBLIC_PATH,
    resolve: {
      alias: {
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
        '@': pathResolve('src'),
        '#': pathResolve('types')
      }
    },
    server: {
      host: true,
      port: VITE_PORT,
      open: false,
      proxy: createProxy(VITE_PROXY),
      cors: true
    },
    build: {
      sourcemap: true,
      target: 'es2015',
      outDir: 'dist',
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE
        }
      },
      brotliSize: false,
      chunkSizeWarningLimit: 2000,
      rollupOptions: {
        // external: ['vue'],
        // plugins: [
        //   externalGlobals({
        //     vue: 'Vue',
        //   }),
        // ],
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@import "./src/styles/variables.scss";`
        }
      }
    },
    define: {
      __APP_VERSION__: JSON.stringify(pkg.version),
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    optimizeDeps: {
      include: [],
      exclude: []
    }
  }
}
