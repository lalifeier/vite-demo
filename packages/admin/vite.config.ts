import dayjs from 'dayjs'
import path from 'path'
import type { ConfigEnv, UserConfig } from 'vite'
import { loadEnv } from 'vite'
import { OUTPUT_DIR } from './build/constants'
import { wrapperEnv } from './build/utils'
import { configProxy, createPlugins } from './build/vite'
import pkg from './package.json'
const pathResolve = (dir: string) => path.resolve(__dirname, dir)

const { dependencies, devDependencies, name, version } = pkg
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
        '@': pathResolve('src'),
        '#': pathResolve('types'),
        'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
        vue: 'vue/dist/vue.esm-bundler.js',
      },
    },
    server: {
      https: true,
      host: true,
      fs: {
        strict: true,
      },
      port: VITE_PORT,
      proxy: configProxy(VITE_PROXY),
    },
    build: {
      sourcemap: true,
      target: 'es2015',
      outDir: OUTPUT_DIR,
      terserOptions: {
        compress: {
          keep_infinity: true,
          drop_console: VITE_DROP_CONSOLE,
        },
      },
      brotliSize: false,
      chunkSizeWarningLimit: 2048,
      rollupOptions: {
        // external: ['vue'],
        // plugins: [
        //   externalGlobals({
        //     vue: 'Vue',
        //   }),
        // ],
      },
    },
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
        },
        scss: {
          additionalData: `@use "@/styles/var.scss" as *;`,
        },
      },
    },
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
    optimizeDeps: {
      include: [
        'vue',
        'vue-router',
        '@vueuse/core',
        // '@vueuse/head',
      ],
      exclude: ['vue-demi'],
    },
  }
}
