import { vitePluginFaker } from 'vite-plugin-faker';

 export function configMockPlugin() {
   return vitePluginFaker({
    basePath: 'src/apis',
    mockDir: '/mock',
    includes: [/^.Service/],
    watchFile: true
  })
 }
