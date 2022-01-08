import path from 'path';
import type { Plugin } from 'vite';
import viteSvgIcons from 'vite-plugin-svg-icons';

export function configSvgIconsPlugin(isBuild: boolean) {
  return viteSvgIcons({
    // 指定需要缓存的图标文件夹
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    // 指定symbolId格式
    symbolId: 'icon-[dir]-[name]',
    svgoOptions: isBuild,
  }) as Plugin;
}
