import { ContentMode, PermissionMode } from '../enums/app'
import { themeColor, themeMode } from './design'
import { AppConfig } from '/#/config'

const app: AppConfig = {
  contentMode: ContentMode.FLUID,

  permissionMode: PermissionMode.FRONT,

  theme: {
    themeMode,

    primaryColor: themeColor,

    grayMode: false,

    colorWeak: false
  },

  header: {
    fixed: true,

    themeMode,

    primaryColor: ''
  },

  sidebar: {
    fixed: true,

    collapsed: false,

    themeMode,

    primaryColor: ''
  },

  transition: {
    enable: true,

    animate: '',

    loading: true,

    progressBar: true
  }
}

export default app
