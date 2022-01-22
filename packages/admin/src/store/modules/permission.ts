import { PermissionMode } from '@/enums/app'
import { asyncRoutes } from '@/router/routes'
import { AppRouteRecordRaw, Menu } from '@/router/types'
import { filterRoutes, flatMultiLevelRoutes, sortMenu, transformRouteToMenu } from '@/router/utils'
import { store } from '@/store'
import { defineStore } from 'pinia'
import { useAppStoreWithOut } from './app'
import { useUserStoreWithOut } from './user'
interface PermissionState {
  permissionCodeList: string[] | number[]
  isDynamicAddedRoute: boolean
  menuList: Menu[]
}

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    permissionCodeList: [],
    isDynamicAddedRoute: false,
    menuList: [],
  }),
  getters: {
    getPermCodeList(): string[] | number[] {
      return this.permissionCodeList
    },
    getMenuList(): Menu[] {
      return this.menuList
    },
    getIsDynamicAddedRoute(): boolean {
      return this.isDynamicAddedRoute
    },
  },
  actions: {
    setPermissionCodeList(permissionCodeList: string[]) {
      this.permissionCodeList = permissionCodeList
    },
    setMenuList(list: Menu[]) {
      this.menuList = list
    },
    setDynamicAddedRoute(isDynamicAddedRoute): void {
      this.isDynamicAddedRoute = isDynamicAddedRoute
    },
    async generateRoutes() {
      const userStore = useUserStoreWithOut()
      const appStore = useAppStoreWithOut()

      let routes: AppRouteRecordRaw[] = []
      const { permissionMode } = appStore.appConfig
      const roleList = userStore.getRoleList || []

      switch (permissionMode) {
        case PermissionMode.ROUTE_MAPPING:
          routes = filterRoutes(asyncRoutes, roleList)

          const menuList = transformRouteToMenu(routes)
          sortMenu(menuList)
          this.setMenuList(menuList)
          console.log(menuList)

          flatMultiLevelRoutes(routes)
        case PermissionMode.BACK:
      }
      return routes
    },
    resetState(): void {
      this.permissionCodeList = []
      this.menuList = []
      this.isDynamicAddedRoute = false
    },
  },
})

export function usePermissionStoreWithOut() {
  return usePermissionStore(store)
}
