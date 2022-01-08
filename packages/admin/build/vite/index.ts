import legacy from '@vitejs/plugin-legacy';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import vuetify from '@vuetify/vite-plugin';
import Icons from 'unplugin-icons/vite';
import type { Plugin, PluginOption } from 'vite';
import Inspect from 'vite-plugin-inspect';
import vueSetupExtend from 'vite-plugin-vue-setup-extend';
import WindiCSS from 'vite-plugin-windicss';
import { configAutoImportPlugin } from './autoImport';
import { configBannerPlugin } from './banner';
import { configComponentsPlugin } from './components';
import { configCompressPlugin } from './compress';
import { configHtmlPlugin } from './html';
import { configImageminPlugin } from './imagemin';
import { configProxy } from './proxy';
import { configPWAPlugin } from './pwa';
import { configSentryPlugin } from './sentry';
import { configSvgIconsPlugin } from './svgIcons';
import { configVisualizerPlugin } from './visualizer';

export function createPlugins(viteEnv: ViteEnv, isBuild: boolean, mode: string) {
  const { VITE_IMAGEMIN, VITE_LEGACY, VITE_COMPRESS, VITE_COMPRESS_DELETE_ORIGIN_FILE, VITE_PWA, VITE_SENTRY } =
    viteEnv;

  const plugins: (Plugin | Plugin[] | PluginOption[])[] = [vue(), vueJsx(), vueSetupExtend(), vuetify()];

  VITE_LEGACY && isBuild && plugins.push(legacy());

  plugins.push(configVisualizerPlugin());

  // plugins.push(PurgeIcons())
  Icons({
    autoInstall: true,

    // customCollections: {
    //   'icon': FileSystemIconLoader(
    //     'src/assets/icons',
    //     svg => svg.replace(/^<svg /, '<svg fill="currentColor" ')
    //   ),
    // }
  }),
    // plugins.push(configStyleImportPlugin())

    plugins.push(configBannerPlugin());

  // plugins.push(configThemePlugin())

  plugins.push(configHtmlPlugin(viteEnv, isBuild));

  plugins.push(WindiCSS());

  plugins.push(configSvgIconsPlugin(isBuild));

  VITE_SENTRY && plugins.push(configSentryPlugin(mode));

  configComponentsPlugin();

  configAutoImportPlugin();

  Inspect({
    // change this to enable inspect for debugging
    enabled: false,
  });

  if (isBuild) {
    VITE_IMAGEMIN && plugins.push(configImageminPlugin());

    plugins.push(configCompressPlugin(VITE_COMPRESS, VITE_COMPRESS_DELETE_ORIGIN_FILE));

    VITE_PWA && plugins.push(configPWAPlugin());
  }

  return plugins;
}

export { configProxy };
