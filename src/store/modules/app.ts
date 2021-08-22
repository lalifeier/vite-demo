import { defineStore } from 'pinia'
import { AppConfig } from '/#/config'
import { ThemeMode } from '/@/enums/app'
import { APP_CONFIG_KEY } from '/@/enums/cache'
import { resetRouter } from '/@/router'
import { deepMerge } from '/@/utils'
import { clearWebStorage, _localStorage } from '/@/utils/cache'

interface AppState {
  loading: boolean
  appConfig: AppConfig
}

export const useAppStore = defineStore({
  id: 'app',
  state: (): AppState => ({
    loading: false,
    appConfig: _localStorage.get(APP_CONFIG_KEY)
  }),
  getters: {
    getLoading(): boolean {
      return this.loading
    },
    getAppConfig(): AppConfig {
      return this.appConfig
    },
    getThemeMode(): ThemeMode {
      return this.appConfig.theme.themeMode
    }
  },
  actions: {
    setLoading(loading: boolean): void {
      this.loading = loading
    },
    setAppConfig(config: AppConfig): void {
      this.appConfig = deepMerge(this.appConfig || {}, config)
      _localStorage.set(APP_CONFIG_KEY, this.appConfig)
    },
    setThemeMode(mode: ThemeMode): void {
      this.appConfig.theme.themeMode = mode
    },
    async resetState() {
      resetRouter()
      clearWebStorage()
    }
  }
})
