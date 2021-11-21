import { AppConfig } from '#/config'
import { BarStyle, ContentMode, PermissionMode, TransitionMode } from '../enums/app'
import { themeColor, themeMode } from './design'

const app: AppConfig = {

  permissionMode: PermissionMode.ROLE,

  contentMode: ContentMode.FLUID,

  theme: {
    themeMode,

    primaryColor: themeColor,

    grayMode: false,

    colorWeak: false
  },

  header: {
    fixed: true,

    themeMode,

    primaryColor: '',
  },

  sidebar: {
    fixed: true,

    collapsed: false,

    themeMode,

    primaryColor: ''
  },

  multiTabs: {
    show: true,

    barStyle: BarStyle.CARD,
  },

  transition: {
    enable: true,

    transition: TransitionMode.FADE_SIDE,

    pageLoading: true,

    progressBar: true
  }
}

export default app
