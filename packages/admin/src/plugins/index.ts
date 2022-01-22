import { formatDate, formatDateTime } from '@/utils/date'
import type { App } from 'vue'

export function setupPlugin(app: App<Element>) {
  const modules = import.meta.globEager('./modules/**/*.ts')
  Object.keys(modules).forEach((key) => {
    app.use(modules[key].default)
  })

  app.config.globalProperties.$formatDate = formatDate
  app.config.globalProperties.$formatDateTime = formatDateTime
}
