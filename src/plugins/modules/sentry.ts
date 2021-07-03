import * as Sentry from '@sentry/browser'
import { Integrations } from '@sentry/tracing'
import type { App } from 'vue'
import pkg from '../../../package.json'

export default {
  install(app: App<Element>) {
    Sentry.init({
      // dsn: import.meta.env.SENTRY_DSN,
      dsn: 'https://0e45da38df1d440b9b5362fdee94736f@o910758.ingest.sentry.io/5845737',
      environment: process.env.NODE_ENV,
      release: `${pkg.name}@${pkg.version}`,
      integrations: [new Integrations.BrowserTracing()],
      tracesSampleRate: 1.0,
    })
    app.config.errorHandler = (err) => {
      console.log(event)
      Sentry.captureException(err)
    }

    window.addEventListener('error', (event) => {
      console.log(event)

      Sentry.captureException(event)
    })
    window.addEventListener('unhandledrejection', (event) => {
      console.log(event)
      Sentry.captureException(event)
    })
  },
}
