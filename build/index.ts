import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import type { Plugin } from 'vite'
import PurgeIcons from 'vite-plugin-purge-icons'
import { configBannerPlugin } from './plugins/banner'
import { configCompressPlugin } from './plugins/compress'
import { configImageminPlugin } from './plugins/imagemin'
import { configPWAPlugin } from './plugins/pwa'
import { configStyleImportPlugin } from './plugins/styleImport'
import { configSvgIconsPlugin } from './plugins/svgIcons'
import { configThemePlugin } from './plugins/theme'
import { configVisualizerPlugin } from './plugins/visualizer'
import { configWindiCSSPlugin } from './plugins/windicss'

const { NODE_ENV, VITE_LEGACY, VITE_IMAGEMIN } = process.env

export const IS_PROD = ['production', 'prod'].includes(NODE_ENV)

export function createPlugins() {
  const plugins: (Plugin | Plugin[])[] = [vue(), vueJsx()]

  VITE_LEGACY && plugins.push(legacy())

  plugins.push(configVisualizerPlugin())

  plugins.push(PurgeIcons())

  plugins.push(configStyleImportPlugin())

  plugins.push(configBannerPlugin())

  plugins.push(configThemePlugin())

  plugins.push(configWindiCSSPlugin());

  if (IS_PROD) {
    VITE_IMAGEMIN && plugins.push(configImageminPlugin())

    plugins.push(configCompressPlugin())

    plugins.push(configPWAPlugin())
  }

  plugins.push(configSvgIconsPlugin())

  return plugins
}
