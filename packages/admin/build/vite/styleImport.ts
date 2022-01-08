import styleImport, { AndDesignVueResolve, ElementPlusResolve, VantResolve } from 'vite-plugin-style-import';

export function configStyleImportPlugin() {
  return styleImport({
    resolves: [AndDesignVueResolve(), VantResolve(), ElementPlusResolve()],
    libs: [
      {
        libraryName: 'ant-design-vue',
        esModule: true,
        resolveStyle: (name) => {
          return `ant-design-vue/es/${name}/style/index`;
        },
      },
      {
        libraryName: 'vant',
        esModule: true,
        resolveStyle: (name) => {
          return `vant/es/${name}/style`;
        },
      },
      {
        libraryName: 'element-plus',
        resolveStyle: (name) => {
          return `element-plus/lib/theme-chalk/${name}.css`;
        },
        resolveComponent: (name) => {
          return `element-plus/lib/${name}`;
        },
      },
    ],
  });
}
