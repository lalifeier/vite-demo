import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import type { Plugin } from 'vite'
import PurgeIcons from 'vite-plugin-purge-icons'
import { configBannerPlugin } from './plugins/banner'
import { configCompressPlugin } from './plugins/compress'
import { configImageminPlugin } from './plugins/imagemin'
import { configPWAPlugin } from './plugins/pwa'
import { configSentryPlugin } from './plugins/sentry'
import { configStyleImportPlugin } from './plugins/styleImport'
import { configSvgIconsPlugin } from './plugins/svgIcons'
import { configThemePlugin } from './plugins/theme'
import { configVisualizerPlugin } from './plugins/visualizer'

export function createPlugins(viteEnv: ViteEnv, mode: string) {
  const isProd = mode === 'production'

  const {
    VITE_IMAGEMIN,
    VITE_LEGACY,
    VITE_COMPRESS,
    VITE_COMPRESS_DELETE_ORIGIN_FILE,
    VITE_PWA,
    VITE_SENTRY
  } = viteEnv

  const plugins: (Plugin | Plugin[])[] = [vue(), vueJsx()]

  VITE_LEGACY && plugins.push(legacy())

  plugins.push(configVisualizerPlugin())

  plugins.push(PurgeIcons())

  plugins.push(configStyleImportPlugin())

  plugins.push(configBannerPlugin())

  plugins.push(configThemePlugin())

  // plugins.push(configWindiCSSPlugin())

  if (isProd) {
    VITE_IMAGEMIN && plugins.push(configImageminPlugin())

    plugins.push(configCompressPlugin(VITE_COMPRESS, VITE_COMPRESS_DELETE_ORIGIN_FILE))

    VITE_PWA && plugins.push(configPWAPlugin())

    VITE_SENTRY && plugins.push(configSentryPlugin(mode))
  }

  plugins.push(configSvgIconsPlugin())

  return plugins
}
