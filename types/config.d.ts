import { ContentMode, PermissionMode, ThemeMode } from '@/enums/app'

export interface HeaderSetting {
  fixed: boolean
}

export interface SidebarSetting {
  fixed: boolean

  collapsed: boolean

  theme: ThemeMode
}

export interface TransitionSetting {
  enable: boolean

  transition: TransitionMode

  pageLoading: boolean

  progressBar: boolean
}

export interface ThemeSetting {
  theme: ThemeMode

  primaryColor: string

  grayMode: boolean

  colorWeak: boolean
}

export interface MultiTabsSetting {
  show: boolean
  barStyle: BarStyle
}
export interface AppConfig {
  themeSetting: ThemeSetting

  contentMode: ContentMode

  permissionMode: PermissionMode

  headerSetting: HeaderSetting

  sidebarSetting: SidebarSetting

  multiTabsSetting: MultiTabsSetting

  transitionSetting: TransitionSetting
}
export interface GlobEnvConfig {
  VITE_GLOB_APP_TITLE: string
  VITE_GLOB_API_URL: string
  VITE_GLOB_APP_SHORT_NAME: string
  VITE_GLOB_UPLOAD_URL: string
}

export interface GlobConfig {
  title: string
  apiUrl: string
  shortName: string
  uploadUrl?: string
}

export type LocaleType = 'zh-CN' | 'en-US' | 'ru' | 'ja' | 'ko'

export interface LocaleSetting {
  locale: LocaleType

  fallback: LocaleType

  availableLocales: LocaleType[]
}
