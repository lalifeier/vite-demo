import IconsResolver from 'unplugin-icons/resolver';
import {
  AntDesignVueResolver,
  ElementPlusResolver,
  VantResolver,
  VuetifyResolver,
} from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';

export function configComponentsPlugin() {
  return Components({
    resolvers: [
      AntDesignVueResolver(),
      ElementPlusResolver(),
      VantResolver(),
      VuetifyResolver(),

      // auto import icons
      IconsResolver({
        componentPrefix: '',
        // enabledCollections: ['carbon']
      }),
    ],

    dirs: ['src/components'],

    extensions: ['vue'],

    dts: 'src/components.d.ts',
  });
}
