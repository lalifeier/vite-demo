import { PermissionMode } from '../enums/setting'
import { themeColor, themeMode } from './design'
import { AppConfig } from './types'

const setting: AppConfig = {
  permissionMode: PermissionMode.FRONT,
  grayMode: false,
  colorWeak: false,
  theme: {
    mode: themeMode,
    color: themeColor
  }
}

export default setting
