import { ContentMode, PermissionMode, ThemeMode } from '@/enums/app';

export interface HeaderConfig {
  fixed: boolean

  themeMode: ThemeMode

  primaryColor: string
}

export interface SidebarConfig {
  fixed: boolean

  collapsed: boolean

  themeMode: ThemeMode

  primaryColor: string
}

export interface TransitionConfig {
  enable: boolean

  transition: TransitionMode

  pageLoading: boolean

  progressBar: boolean
}

export interface ThemeConfig {
  themeMode: ThemeMode

  primaryColor: string

  grayMode: boolean

  colorWeak: boolean
}


export interface multiTabsConfig {
  show: boolean
  barStyle: BarStyle
}
export interface AppConfig {
  theme: ThemeConfig

  contentMode: ContentMode

  permissionMode: PermissionMode

  header: HeaderConfig

  sidebar: SidebarConfig

  multiTabs: multiTabsConfig

  transition: TransitionConfig
}
