import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import type { Router } from 'vue-router'

NProgress.configure({ showSpinner: false })

export function createProgressGuard(router: Router) {
  router.beforeEach(async () => {
    NProgress.start()
    return true
  })

  router.afterEach(async () => {
    NProgress.done()
    return true
  })
}
