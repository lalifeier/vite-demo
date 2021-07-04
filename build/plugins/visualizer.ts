import visualizer from 'rollup-plugin-visualizer'
import type { Plugin } from 'vite'
import { isReport } from '../utils'

export function configVisualizerPlugin() {
  if (!isReport()) {
    return []
  }
  return visualizer({
    filename: './dist/stats.html',
    open: true,
    // Collect gzip size from source code and display it at chart
    gzipSize: true,
    // Collect brotli size from source code and display it at chart
    brotliSize: true,
  }) as Plugin
}
