import { usePermissionStore } from '@/store/modules/permission';
import { useUserStoreWithOut } from '@/store/modules/user';
import type { Router, RouteRecordRaw } from 'vue-router';

const whiteRouterList = ['/login'];

export function createPermissionGuard(router: Router) {
  const userStore = useUserStoreWithOut();
  const permissionStore = usePermissionStore();
  router.beforeEach(async (to, _from, next) => {
    if (whiteRouterList.includes(to.path)) {
      next();
      return;
    }

    const token = userStore.getAccessToken;

    // if (!token) {
    //   next({ name: 'login', query: { redirect: to.fullPath } })
    //   return
    // }
    if (permissionStore.getIsDynamicAddedRoute) {
      next();
      return;
    }

    const routes = await permissionStore.generateRoutes();
    routes.forEach((route) => {
      router.addRoute(route as unknown as RouteRecordRaw);
    });
    // router.addRoute(PAGE_NOT_FOUND as unknown as RouteRecordRaw)

    console.log(router.getRoutes());

    permissionStore.setDynamicAddedRoute(true);

    next({ ...to, replace: true });
  });
}
