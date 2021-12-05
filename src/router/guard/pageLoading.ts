import type { Router } from 'vue-router'

export function createPageLoadingGuard(router: Router) {
  router.beforeEach(async (to) => {
    return true
  })
  router.afterEach(async () => {
    return true
  })
}
