import { AppConfig } from '#/config'
import { BarStyle, PermissionMode, TransitionMode } from '../enums/app'
import { themeColor } from './design'

const app: AppConfig = {
  darkMode: 'light',

  layout: 'side',

  contentWidth: 'Fixed',

  permissionMode: PermissionMode.ROUTE_MAPPING,

  themeColor,

  grayMode: false,

  colorWeak: false,

  showFooter: true,

  openKeepAlive: true,

  headerSetting: {
    bgColor: '#fff',

    fixed: true,

    show: true,

    theme: 'light'
  },

  sidebarSetting: {
    bgColor: '#fff',

    fixed: true,

    collapsed: false,

    show: true,

    theme: 'light',

    split: false
  },

  multiTabsSetting: {
    show: true,

    barStyle: BarStyle.CARD
  },

  breadCrumbSetting: {
    show: true,

    showIcon: false
  },

  transitionSetting: {
    enable: true,

    transition: TransitionMode.FADE_SIDE,

    pageLoading: true,

    progressBar: true
  }
}

export default app
