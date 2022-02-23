import { createHtmlPlugin } from 'vite-plugin-html'
import { GLOB_CONFIG_FILE_NAME, PKG_VERSION } from '../constants'

export function configHtmlPlugin(env: ViteEnv, isBuild: boolean) {
  const { VITE_GLOB_APP_TITLE, VITE_PUBLIC_PATH } = env

  const path = VITE_PUBLIC_PATH.endsWith('/') ? VITE_PUBLIC_PATH : `${VITE_PUBLIC_PATH}/`

  const getAppConfigSrc = () => {
    return `${path || '/'}${GLOB_CONFIG_FILE_NAME}?v=${PKG_VERSION}-${new Date().getTime()}`
  }

  return createHtmlPlugin({
    minify: isBuild,
    inject: {
      data: {
        title: VITE_GLOB_APP_TITLE,
        injectScript: isBuild ? `<script src="${getAppConfigSrc()}"></script>` : '',
      },
    },
  })
}
