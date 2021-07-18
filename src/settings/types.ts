import { PermissionMode, ThemeMode } from '../enums/setting'

export interface ThemeConfig {
  mode: ThemeMode
  color: string
}

export interface AppConfig {
  permissionMode: PermissionMode
  grayMode: boolean
  colorWeak: boolean
  theme: ThemeConfig
}
