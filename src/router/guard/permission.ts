import { usePermissionStore } from '@/store/modules/permission'
import type { Router, RouteRecordRaw } from 'vue-router'

const whiteRouterList = ['/login']

export function createPermissionGuard(router: Router) {
  // const userStore = useUserStore()
  const permissionStore = usePermissionStore()
  router.beforeEach(async (to, _from, next) => {
    if (whiteRouterList.includes(to.path)) {
      next()
      return
    }

    // const token = userStore.getAccessToken

    // if (!token) {
    //   next({ name: 'login', query: { redirect: to.fullPath } })
    //   return
    // }
    if (permissionStore.getIsDynamicRoutes) {
      next()
      return
    }
    const routes = await permissionStore.generateRoutes()
    permissionStore.setIsDynamicRoutes(true)

    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw)
    })

    next({ ...to, replace: true })
  })
}
