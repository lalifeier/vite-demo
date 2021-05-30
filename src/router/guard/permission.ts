import type { Router } from 'vue-router'
import { useUserStore } from '/@/store/modules/user'

const routerWhiteList = ['/login']

export function createPermissionGuard(router: Router) {
  const userStore = useUserStore()
  router.beforeEach(async (to, from, next) => {
    if (routerWhiteList.includes(to.path)) {
    }

    const token = userStore.getToken
    if (!token) {
      next({ name: 'login', query: { redirect: to.fullPath } })
    }

    const routes = []

    routes.forEach((route) => {
      router.addRoute(route)
    })

    router.addRoute({ path: '*', redirect: '/404' })

    next({ ...to, replace: true })
  })
}
