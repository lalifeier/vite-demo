import AutoImport from 'unplugin-auto-import/vite';

export function configAutoImportPlugin() {
  return AutoImport({
    imports: ['vue', 'vue-router', 'vue-i18n', '@vueuse/head', '@vueuse/core'],
    dts: 'src/auto-imports.d.ts',
  });
}
