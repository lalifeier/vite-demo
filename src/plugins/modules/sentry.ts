import * as Sentry from '@sentry/browser'
import { Integrations } from '@sentry/tracing'
import type { App } from 'vue'
import { release } from '../../../build/utils'
import { getMode } from '/@/utils/env'

export default {
  install(app: App<Element>) {
    if (import.meta.env.VITE_SENTRY === 'false') {
      return
    }
    Sentry.init({
      dsn: import.meta.env.VITE_SENTRY_DSN,
      environment: getMode(),
      release,
      integrations: [new Integrations.BrowserTracing()],
      tracesSampleRate: 1.0
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
  }
}
