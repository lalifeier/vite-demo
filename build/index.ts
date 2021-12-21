import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import vuetify from '@vuetify/vite-plugin'
import type { Plugin, PluginOption } from 'vite'
import PurgeIcons from 'vite-plugin-purge-icons'
import vueSetupExtend from 'vite-plugin-vue-setup-extend'
import WindiCSS from 'vite-plugin-windicss'
import { configBannerPlugin } from './plugins/banner'
import { configCompressPlugin } from './plugins/compress'
import { configHtmlPlugin } from './plugins/html'
import { configImageminPlugin } from './plugins/imagemin'
import { configPWAPlugin } from './plugins/pwa'
import { configSentryPlugin } from './plugins/sentry'
import { configStyleImportPlugin } from './plugins/styleImport'
import { configSvgIconsPlugin } from './plugins/svgIcons'
import { configVisualizerPlugin } from './plugins/visualizer'

export function createPlugins(viteEnv: ViteEnv, isBuild: boolean, mode: string) {
  const {
    VITE_IMAGEMIN,
    VITE_LEGACY,
    VITE_COMPRESS,
    VITE_COMPRESS_DELETE_ORIGIN_FILE,
    VITE_PWA,
    VITE_SENTRY
  } = viteEnv

  const plugins: (Plugin | Plugin[] | PluginOption[])[] = [
    vue(),
    vueJsx(),
    vueSetupExtend(),
    vuetify()
  ]

  VITE_LEGACY && isBuild && plugins.push(legacy())

  plugins.push(configVisualizerPlugin())

  plugins.push(PurgeIcons())

  plugins.push(configStyleImportPlugin())

  plugins.push(configBannerPlugin())

  // plugins.push(configThemePlugin())

  plugins.push(configHtmlPlugin(viteEnv, isBuild))

  plugins.push(WindiCSS())

  plugins.push(configSvgIconsPlugin(isBuild))

  VITE_SENTRY && plugins.push(configSentryPlugin(mode))

  if (isBuild) {
    VITE_IMAGEMIN && plugins.push(configImageminPlugin())

    plugins.push(configCompressPlugin(VITE_COMPRESS, VITE_COMPRESS_DELETE_ORIGIN_FILE))

    VITE_PWA && plugins.push(configPWAPlugin())
  }

  return plugins
}
