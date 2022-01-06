import { AppConfig, HeaderSetting, SidebarSetting, TransitionSetting } from '#/config';
import { ThemeMode } from '@/enums/app';
import { APP_CONFIG_KEY } from '@/enums/cache';
import { resetRouter } from '@/router';
import { store } from '@/store';
import { deepMerge } from '@/utils';
import { clearWebStorage, _localStorage } from '@/utils/cache';
import { defineStore } from 'pinia';

interface AppState {
  pageLoading: boolean;

  appConfig: AppConfig;
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    pageLoading: false,

    appConfig: _localStorage.get(APP_CONFIG_KEY),
  }),
  getters: {
    getPageLoading(): boolean {
      return this.pageLoading;
    },
    getAppConfig(): AppConfig {
      return this.appConfig;
    },
    getDarkMode(): ThemeMode {
      return this.appConfig.darkMode;
    },
    getHeaderSetting(): HeaderSetting {
      return this.appConfig.headerSetting;
    },
    getSidebarSetting(): SidebarSetting {
      return this.appConfig.sidebarSetting;
    },
    getTransitionSetting(): TransitionSetting {
      return this.appConfig.transitionSetting;
    },
  },
  actions: {
    setLoading(loading: boolean): void {
      this.pageLoading = loading;
    },
    setAppConfig(config: DeepPartial<AppConfig>): void {
      this.appConfig = deepMerge(this.appConfig || {}, config);
      _localStorage.set(APP_CONFIG_KEY, this.appConfig);
    },
    setDarkMode(mode: ThemeMode): void {
      this.appConfig.darkMode = mode;
    },
    async resetState() {
      resetRouter();

      clearWebStorage();
    },
  },
});

export function useAppStoreWithOut() {
  return useAppStore(store);
}
