import { Role } from '@/enums/role';
import { isUrl } from '@/utils/is';
import { cloneDeep } from 'lodash-es';
import { AppRouteModule, AppRouteRecordRaw, Menu } from './types';

export function hasPermission(route: AppRouteRecordRaw, roleList: Array<Role>): boolean {
  const { meta } = route;
  const { roles } = meta || {};
  if (!roles) return true;
  return roleList.some((role) => roles.includes(role));
}

export function filterRoutes(routes: Array<AppRouteRecordRaw>, roles: Array<Role>): Array<AppRouteRecordRaw> {
  const routeList: Array<AppRouteRecordRaw> = [];
  routes.forEach((route) => {
    const tmp: AppRouteRecordRaw = { ...route };
    if (hasPermission(tmp, roles)) {
      if (tmp.children) {
        tmp.children = filterRoutes(tmp.children, roles);
      }
      routeList.push(tmp);
    }
  });
  return routeList;
}

export function fixFullPath(menuList: Menu[], parentPath = '') {
  for (const menu of menuList) {
    menu.path = getFullPath(menu.path, parentPath);
    if (menu?.children?.length) {
      fixFullPath(menu.children, menu.path);
    }
  }
}

export function sortMenu(menuList: Menu[]) {
  menuList.sort((a, b) => {
    return (a.meta?.orderNo || 0) - (b.meta?.orderNo || 0);
  });
}

export function transformRouteToMenu(routes: AppRouteModule[]): Menu[] {
  const cloneRoutes = cloneDeep(routes);

  const getMenu = (route: AppRouteModule): Menu => {
    const { meta: { title = '', hideMenu = false } = {}, path, redirect } = route;
    return {
      ...(route.meta || {}),
      meta: route.meta,
      name: title,
      hideMenu,
      path,
      ...(redirect ? { redirect } : {}),
    };
  };

  const getChildren = (route: AppRouteModule): Menu => {
    const children: Menu[] = [];
    if (route.children) {
      route.children.forEach((item) => {
        children.push(getChildren(item));
      });
    }

    return {
      ...getMenu(route),
      children,
    };
  };

  const menu: Menu[] = [];
  for (const item of cloneRoutes) {
    menu.push(getChildren(item));
  }

  fixFullPath(menu);

  return menu;
}

function isMultipleRoute(routeModule: AppRouteModule): boolean {
  if (!routeModule || !Reflect.has(routeModule, 'children') || !routeModule.children?.length) {
    return false;
  }
  return routeModule.children.some((item) => item.children?.length);
}

function getFullPath(path, parentPath) {
  if (path?.startsWith('/') || isUrl(path)) {
    return path;
  }
  return `${parentPath}/${path}`;
}

const flatRouteModule = (routeModules: AppRouteModule[], parentPath?: string) => {
  let routes: AppRouteModule[] = [];
  for (const routeModule of routeModules) {
    const { path, children, ...item } = routeModule;
    const fullPath = getFullPath(path, parentPath);
    if (children && children.length) {
      routes = routes.concat(flatRouteModule(children, fullPath));
    }
    routes.push({ ...item, path: fullPath });
  }
  return routes;
};

export function flatMultiLevelRoutes(routes: AppRouteModule[]): AppRouteModule[] {
  const cloneRoutes = cloneDeep(routes);
  const routeModules: AppRouteModule[] = [];
  for (const routeModule of cloneRoutes) {
    if (!isMultipleRoute(routeModule)) {
      routeModules.push(routeModule);
      continue;
    }
    const { children = [], path } = routeModule;
    routeModules.push({ ...routeModule, children: flatRouteModule(children, path) });
  }
  console.log(routeModules);

  return routeModules;
}
