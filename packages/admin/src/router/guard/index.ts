import { router } from '@/router'
import type { RouteLocationNormalized, Router } from 'vue-router'
import { createPermissionGuard } from './permissionGuard'
import { createProgressGuard } from './progressGuard'
import { createStateGuard } from './stateGuard'

export function setupRouterGuard() {
  // createPageLoadingGuard(router);
  createScrollGuard(router)
  createProgressGuard(router)
  createPermissionGuard(router)
  createStateGuard(router)
}

function createScrollGuard(router: Router) {
  const isHash = (href: string) => {
    return /^#/.test(href)
  }

  const body = document.body

  router.afterEach(async (to) => {
    isHash((to as RouteLocationNormalized & { href: string })?.href) && body.scrollTo(0, 0)
    return true
  })
}
