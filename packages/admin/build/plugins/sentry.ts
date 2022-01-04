import type { ViteSentryPluginOptions } from 'vite-plugin-sentry'
import viteSentry from 'vite-plugin-sentry'
import { project, release } from '../utils'

export function configSentryPlugin(env: string) {

  const sentryConfig: ViteSentryPluginOptions = {
    debug: true,
    url: 'https://sentry.io/',
    authToken: '8547cd21201249afac7fce883cb5e006e6cce7d81ad34db1b5398af092f10a86',
    org: 'lalifeier',
    project,
    release,
    deploy: {
      env,
    },
    setCommits: {
      auto: false,
    },
    sourceMaps: {
      include: ['./dist/assets'],
      ignore: ['node_modules'],
      urlPrefix: '~/assets',
    },
  }

  return viteSentry(sentryConfig)
}
