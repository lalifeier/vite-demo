import { PermissionMode, TransitionMode } from '@/enums/app';

export type ContentWidth = 'Fluid' | 'Fixed';

export type Layout = 'side' | 'top' | 'mix'

declare type Theme = 'light' | 'dark'

export interface HeaderSetting {
  bgColor: string

  fixed: boolean

  show: boolean

  theme: Theme
}

export interface SidebarSetting {
  bgColor: string

  fixed: boolean

  collapsed: boolean

  show: boolean

  theme: Theme

  split: boolean
}

export interface TransitionSetting {
  enable: boolean

  transition: TransitionMode

  pageLoading: boolean

  progressBar: boolean
}

export interface MultiTabsSetting {
  show: boolean
  barStyle: BarStyle
}

export interface BreadCrumbSetting {
  show: boolean

  showIcon: boolean
}



export interface AppConfig {
  darkMode: Theme

  layout: Layout

  contentWidth: ContentWidth

  permissionMode: PermissionMode

  themeColor: string

  grayMode: boolean

  colorWeak: boolean

  showFooter: boolean

  openKeepAlive: boolean

  headerSetting: HeaderSetting

  sidebarSetting: SidebarSetting

  multiTabsSetting: MultiTabsSetting

  breadCrumbSetting: BreadCrumbSetting

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
