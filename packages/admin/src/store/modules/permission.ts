import { PermissionMode } from '@/enums/app';
import { asyncRoutes } from '@/router/routes';
import { AppRouteRecordRaw, Menu } from '@/router/types';
import { filterRoutes, flatMultiLevelRoutes, sortMenu, transformRouteToMenu } from '@/router/utils';
import { store } from '@/store';
import { defineStore } from 'pinia';
import { toRaw } from 'vue';
import { useAppStoreWithOut } from './app';
import { useUserStoreWithOut } from './user';
interface PermissionState {
  permissionCodeList: string[] | number[];
  isDynamicRoutes: boolean;
  menuList: Menu[];
}

export const usePermissionStore = defineStore({
  id: 'permission',
  state: (): PermissionState => ({
    permissionCodeList: [],
    isDynamicRoutes: false,
    menuList: [],
  }),
  getters: {
    getPermCodeList(): string[] | number[] {
      return this.permissionCodeList;
    },
    getMenuList(): Menu[] {
      return this.menuList;
    },
    getIsDynamicRoutes(): boolean {
      return this.isDynamicRoutes;
    },
  },
  actions: {
    setPermissionCodeList(permissionCodeList: string[]) {
      this.permissionCodeList = permissionCodeList;
    },
    setMenuList(list: Menu[]) {
      this.menuList = list;
    },
    setIsDynamicRoutes(isDynamicRoutes): void {
      this.isDynamicRoutes = isDynamicRoutes;
    },
    async generateRoutes() {
      const appStore = useAppStoreWithOut();
      const userStore = useUserStoreWithOut();

      let routes: AppRouteRecordRaw[] = [];
      const { permissionMode } = appStore.appConfig;
      const roleList = toRaw(userStore.getRoleList);

      switch (permissionMode) {
        case PermissionMode.ROUTE_MAPPING:
          routes = filterRoutes(asyncRoutes, roleList);

          const menuList = transformRouteToMenu(routes);
          sortMenu(menuList);
          this.setMenuList(menuList);
          console.log(menuList);

          flatMultiLevelRoutes(routes);
        case PermissionMode.BACK:
      }
      return routes;
    },
    resetState(): void {
      this.permissionCodeList = [];
      this.menuList = [];
      this.isDynamicRoutes = false;
    },
  },
});

export function usePermissionStoreWithOut() {
  return usePermissionStore(store);
}
