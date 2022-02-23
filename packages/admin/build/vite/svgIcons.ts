import path from 'path'
import type { Plugin } from 'vite'
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'

export function configSvgIconsPlugin(isBuild: boolean) {
  return createSvgIconsPlugin({
    // 指定需要缓存的图标文件夹
    iconDirs: [path.resolve(process.cwd(), 'src/assets/icons')],
    // 指定symbolId格式
    symbolId: 'icon-[dir]-[name]',
    svgoOptions: isBuild,
  }) as Plugin
}
