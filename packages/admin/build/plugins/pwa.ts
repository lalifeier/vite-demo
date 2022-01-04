import { VitePWA } from 'vite-plugin-pwa'

export function configPWAPlugin() {
  return VitePWA({ manifest: {}, workbox: {} })
}
