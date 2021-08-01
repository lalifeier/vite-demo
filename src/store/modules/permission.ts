import { defineStore } from 'pinia'
import { Role } from '../enum'
import { useAppStore } from './app'
import { useUserStore } from './user'
import { PermissionMode } from '/@/enums/setting'
import { asyncRoutes } from '/@/router/routes'
import { AppRouteRecordRaw, Menu } from '/@/router/types'
interface PermissionState {
  permissionCodeList: string[] | number[]
  isDynamicRoutes: boolean
  menuList: Menu[]
}

// function setMenu(menus) {
//   let all = []
//   const mapper = (route, parent) => {
//     let parents = parent ? parent.split(',') : []
//     parents.push(route.name)
//     let child = []
//     if (route.children) {
//       route.children.forEach(item => {
//         child.push(mapper(item, parents.join(',')))
//       })
//     }
//     if (child.length === 0) {
//       return {
//         ...route,
//         parents: parents
//       }
//     }
//     return {
//       ...route,
//       parents: parents,
//       children: child
//     }
//   }
//   menus.forEach(item => {
//     all.push(mapper(item))
//   })
//   return all
// }

// function getMenuItems(menus) {
//   let all = []
//   const mapper = (menu) => {
//     if (menu.name && !menu.children) {
//       all.push({ ...menu })
//     }
//     if (menu.children) {
//       menu.children.forEach(item => {
//         mapper(item)
//       })
//     }
//   }
//   menus.forEach(item => {
//     mapper(item)
//   })
//   return all
// }

function hasPermission(route: AppRouteRecordRaw, roleList: Array<Role>): boolean {
  const { meta } = route
  const { roles } = meta || {}
  if (!roles) return true
  return roleList.some((role) => roles.includes(role))
}

function filterAsyncRoutes(
  routes: Array<AppRouteRecordRaw>,
  roles: Array<Role>
): Array<AppRouteRecordRaw> {
  const routeList: Array<AppRouteRecordRaw> = []
  routes.forEach((route) => {
    const tmp: AppRouteRecordRaw = { ...route }
    if (hasPermission(tmp, roles)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      routeList.push(tmp)
    }
  })
  return routeList
}

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

      switch (permissionMode) {
        case PermissionMode.FRONT:
          routes = filterAsyncRoutes(asyncRoutes, roleList)

          console.log(routes)
        // menuList.sort((a, b) => {
        //   return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0)
        // })
        // this.setMenuList(menuList)
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
