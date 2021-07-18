import { APP_CONFIG_KEY } from '../../enums/cache'
import { AppConfig } from '../../settings/types'
import { useAppStore } from '../../store/modules/app'
import { deepMerge } from '../../utils'
import { _localStorage } from '../../utils/cache'
import { ThemeMode } from '/@/enums/setting'
import setting from '/@/settings'
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

  appConfig = deepMerge(setting, appConfig || {})
  appStore.setAppConfig(appConfig)

  const { grayMode, colorWeak, theme } = appConfig
  grayMode && updateGrayMode(grayMode)
  colorWeak && updateColorWeak(colorWeak)

  updateThemeMode(theme.mode)
}
