import { cloneDeep, omit } from 'lodash-es'
import type { Router, RouteRecordNormalized } from 'vue-router'
import { createRouter, createWebHashHistory } from 'vue-router'
import { treeMap } from '../utils/helper/tree'
import { isUrl } from '../utils/is'
import type { AppRouteModule, AppRouteRecordRaw, Menu } from '/@/router/types'

export function flatMultiLevelRoutes(routeModules: AppRouteModule[]) {
  const modules: AppRouteModule[] = cloneDeep(routeModules)
  for (let index = 0; index < modules.length; index++) {
    const routeModule = modules[index]
    if (!isMultipleRoute(routeModule)) {
      continue
    }
    promoteRouteLevel(routeModule)
  }
  return modules
}

function promoteRouteLevel(routeModule: AppRouteModule) {
  let router: Router | null = createRouter({
    routes: [routeModule as unknown as RouteRecordNormalized],
    history: createWebHashHistory()
  })

  const routes = router.getRoutes()
  addToChildren(routes, routeModule.children || [], routeModule)
  router = null

  routeModule.children = routeModule.children?.map((item) => omit(item, 'children'))
}

function addToChildren(
  routes: RouteRecordNormalized[],
  children: AppRouteRecordRaw[],
  routeModule: AppRouteModule
) {
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    const route = routes.find((item) => item.name === child.name)
    if (!route) {
      continue
    }
    routeModule.children = routeModule.children || []
    if (!routeModule.children.find((item) => item.name === route.name)) {
      routeModule.children?.push(route as unknown as AppRouteModule)
    }
    if (child.children?.length) {
      addToChildren(routes, child.children, routeModule)
    }
  }
}

function isMultipleRoute(routeModule: AppRouteModule) {
  if (!routeModule || !Reflect.has(routeModule, 'children') || !routeModule.children?.length) {
    return false
  }

  const children = routeModule.children

  let flag = false
  for (let index = 0; index < children.length; index++) {
    const child = children[index]
    if (child.children?.length) {
      flag = true
      break
    }
  }
  return flag
}

export function transformRouteToMenu(routeModList: AppRouteModule[]) {
  const cloneRouteModList = cloneDeep(routeModList)
  const routeList: AppRouteRecordRaw[] = []

  cloneRouteModList.forEach((item) => {
    if (item.meta?.single) {
      const realItem = item?.children?.[0]
      realItem && routeList.push(realItem)
    } else {
      routeList.push(item)
    }
  })
  const list = treeMap(routeList, {
    conversion: (node: AppRouteRecordRaw) => {
      const { meta: { title, hideMenu = false } = {} } = node

      return {
        ...(node.meta || {}),
        meta: node.meta,
        name: title,
        hideMenu,
        path: node.path,
        ...(node.redirect ? { redirect: node.redirect } : {})
      }
    }
  })
  joinParentPath(list)
  return cloneDeep(list)
}

function joinParentPath(menus: Menu[], parentPath = '') {
  for (let index = 0; index < menus.length; index++) {
    const menu = menus[index]
    // https://next.router.vuejs.org/guide/essentials/nested-routes.html
    // Note that nested paths that start with / will be treated as a root path.
    // This allows you to leverage the component nesting without having to use a nested URL.
    if (!(menu.path?.startsWith('/') || isUrl(menu.path))) {
      // path doesn't start with /, nor is it a url, join parent path
      menu.path = `${parentPath}/${menu.path}`
    }
    if (menu?.children?.length) {
      joinParentPath(menu.children, menu.meta?.hidePathForChildren ? parentPath : menu.path)
    }
  }
}
