import { AppConfig } from '#/config'
import { BarStyle, ContentMode, PermissionMode, TransitionMode } from '../enums/app'
import { themeColor, themeMode } from './design'

const app: AppConfig = {

  permissionMode: PermissionMode.ROUTE_MAPPING,

  contentMode: ContentMode.FLUID,

  themeSetting: {
    theme: themeMode,

    primaryColor: themeColor,

    grayMode: false,

    colorWeak: false
  },

  headerSetting: {
    fixed: true,
  },

  sidebarSetting: {
    fixed: true,

    collapsed: false,

    theme: themeMode,
  },

  multiTabsSetting: {
    show: true,

    barStyle: BarStyle.CARD,
  },

  transitionSetting: {
    enable: true,

    transition: TransitionMode.FADE_SIDE,

    pageLoading: true,

    progressBar: true
  }
}

export default app
