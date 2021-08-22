import { AppConfig } from '/#/config'
import app from '/@/configs/app'
import { ThemeMode } from '/@/enums/app'
import { APP_CONFIG_KEY } from '/@/enums/cache'
import { useAppStore } from '/@/store/modules/app'
import { deepMerge } from '/@/utils'
import { _localStorage } from '/@/utils/cache'
import { toggleClass } from '/@/utils/dom'

export function updateThemeMode(mode: ThemeMode = ThemeMode.LIGHT) {
  document.documentElement.dataset.theme = mode
}

export function updateGrayMode(flag: boolean) {
  toggleClass(document.documentElement, 'gray-mode', flag)
}

export function updateColorWeak(flag: boolean) {
  toggleClass(document.documentElement, 'color-weak', flag)
}

export function setupAppConfig() {
  const appStore = useAppStore()
  let appConfig: AppConfig = _localStorage.get(APP_CONFIG_KEY) as AppConfig

  appConfig = deepMerge(app, appConfig || {})
  appStore.setAppConfig(appConfig)

  const { grayMode, colorWeak, themeMode } = appConfig.theme
  grayMode && updateGrayMode(grayMode)
  colorWeak && updateColorWeak(colorWeak)

  updateThemeMode(themeMode)
}
