import { defineStore } from 'pinia'
import { useAppStore } from './app'
import { useUserStore } from './user'
import { PermissionMode } from '/@/enums/setting'
import { asyncRoutes } from '/@/router/routes'
import { AppRouteRecordRaw, Menu } from '/@/router/types'
import { flatMultiLevelRoutes, transformRouteToMenu } from '/@/router/utils'
import { filter } from '/@/utils/helper/tree'
interface PermissionState {
  permissionCodeList: string[] | number[]
  isDynamicRoutes: boolean
  menuList: Menu[]
}

// function filterAsyncRoutes(routes, menuItems) {
//   const all = []
//   menuItems.forEach(menu => {
//     let matchIndex = routes.findIndex(item => item.path.toLowerCase() === menu.name.toLowerCase())
//     if (matchIndex > -1) {
//       all.push(routes[matchIndex])
//     }
//   })
//   return all
// }

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    permissionCodeList: [],
    isDynamicRoutes: false,
    menuList: []
  }),
  getters: {
    getMenuList(): Menu[] {
      return this.menuList
    },
    getIsDynamicRoutes(): boolean {
      return this.isDynamicRoutes
    }
  },
  actions: {
    setMenuList(list: Menu[]) {
      this.menuList = list
    },
    setIsDynamicRoutes(isDynamicRoutes): void {
      this.isDynamicRoutes = isDynamicRoutes
    },
    async generateRoutes() {
      let routes: AppRouteRecordRaw[] = []

      const appStore = useAppStore()
      const userStore = useUserStore()

      const { permissionMode } = appStore.appConfig
      const roleList = userStore.getRoleList

      const filterAsyncRoutes = (route: AppRouteRecordRaw) => {
        const { meta } = route
        const { roles } = meta || {}
        if (!roles) return true
        return roleList.some((role) => roles.includes(role))
      }

      switch (permissionMode) {
        case PermissionMode.FRONT:
          routes = filter(asyncRoutes, filterAsyncRoutes)

          routes = routes.filter(filterAsyncRoutes)
          routes = flatMultiLevelRoutes(routes)

          const menuList = transformRouteToMenu(routes)
          menuList.sort((a, b) => {
            return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0)
          })
          this.setMenuList(menuList)
        // console.log(menuList)

        case PermissionMode.BACK:
      }
      return routes
    },
    resetState(): void {
      this.permissionCodeList = []
      this.menuList = []
    }
  }
})
