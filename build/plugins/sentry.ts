import type { ViteSentryPluginOptions } from 'vite-plugin-sentry';
import viteSentry from 'vite-plugin-sentry';
import pkg from '../../package.json';

export function configSentryPlugin() {
  const sentryConfig: ViteSentryPluginOptions = {
    debug: true,
    url: 'https://sentry.io/',
    authToken: '8547cd21201249afac7fce883cb5e006e6cce7d81ad34db1b5398af092f10a86',
    org: 'lalifeier',
    project: pkg.name,
    release: `${pkg.name}@${pkg.version}`,
    deploy: {
      env: process.env.NODE_ENV || 'development'
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
