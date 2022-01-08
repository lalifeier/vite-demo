import visualizer from 'rollup-plugin-visualizer';
import { isReport } from '../utils';

export function configVisualizerPlugin() {
  if (isReport()) {
    return visualizer({
      filename: './node_modules/.cache/visualizer/stats.html',
      open: true,
      // Collect gzip size from source code and display it at chart
      gzipSize: true,
      // Collect brotli size from source code and display it at chart
      brotliSize: true,
    });
  }
  return [];
}
