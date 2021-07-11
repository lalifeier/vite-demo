import type { Router, RouteRecordRaw } from 'vue-router'
import { asyncRoutes } from '../routes'
import { useUserStore } from '/@/store/modules/user'

const whiteRouterList = ['/dashboard', '/login']

export function createPermissionGuard(router: Router) {
  const userStore = useUserStore()
  router.beforeEach(async (to, _from, next) => {
    if (whiteRouterList.includes(to.path)) {
      next()
      return
    }

    const token = userStore.getToken
    if (!token) {
      next({ name: 'login', query: { redirect: to.fullPath } })
      return
    }

    const routes = asyncRoutes
    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw)
    })

    next({ ...to, replace: true })
  })
}
