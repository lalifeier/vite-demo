import IconsResolver from 'unplugin-icons/resolver';
import {
  AntDesignVueResolver,
  ElementPlusResolver,
  IduxResolver,
  VantResolver,
  VuetifyResolver,
} from 'unplugin-vue-components/resolvers';
import UnpluginVueComponents from 'unplugin-vue-components/vite';

export function configComponentsPlugin() {
  return UnpluginVueComponents({
    resolvers: [
      AntDesignVueResolver(),
      ElementPlusResolver(),
      VantResolver(),
      VuetifyResolver(),
      IduxResolver({
        importStyle: 'css',
      }),

      // auto import icons
      IconsResolver({
        componentPrefix: '',
        customCollections: ['icon'],
        // enabledCollections: ['carbon']
      }),
    ],

    // dirs: ['src/components'],

    // extensions: ['vue', 'tsx'],

    dts: 'types/components.d.ts',
  });
}
