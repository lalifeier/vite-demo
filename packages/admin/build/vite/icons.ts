import { FileSystemIconLoader } from 'unplugin-icons/loaders';
import Icons from 'unplugin-icons/vite';

export function configIconsPlugin() {
  return Icons({
    compiler: 'vue3',

    autoInstall: true,

    customCollections: {
      icon: FileSystemIconLoader('src/assets/icons'),
    },
  });
}
