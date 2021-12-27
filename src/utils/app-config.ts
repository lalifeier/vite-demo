import { AppConfig, Theme } from '#/config'
import { ThemeMode } from '@/enums/app'
import { APP_CONFIG_KEY } from '@/enums/cache'
import app from '@/settings/app'
import { useAppStore } from '@/store/modules/app'
import { deepMerge } from '@/utils'
import { _localStorage } from '@/utils/cache'
import { toggleClass } from '@/utils/dom'
import { getCommonStoragePrefix, getStorageShortName } from '@/utils/env'

export function updateThemeMode(mode: Theme = ThemeMode.LIGHT) {
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

  const { grayMode, colorWeak, darkMode } = appConfig
  grayMode && updateGrayMode(grayMode)
  colorWeak && updateColorWeak(colorWeak)

  updateThemeMode(darkMode)

  setTimeout(() => {
    clearObsoleteStorage()
  }, 16)
}

export function clearObsoleteStorage() {
  const commonPrefix = getCommonStoragePrefix()
  const shortPrefix = getStorageShortName()

  ;[localStorage, sessionStorage].forEach((item: Storage) => {
    Object.keys(item).forEach((key) => {
      if (key && key.startsWith(commonPrefix) && !key.startsWith(shortPrefix)) {
        item.removeItem(key)
      }
    })
  })
}
