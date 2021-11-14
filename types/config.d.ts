import { ContentMode, PermissionMode, ThemeMode } from '@/enums/app';

export interface HeaderConfig {
  fixed: boolean

  themeMode: ThemeMode

  primaryColor: string
}

export interface sidebarConfig {
  fixed: boolean

  collapsed: boolean

  themeMode: ThemeMode

  primaryColor: string
}

export interface TransitionConfig {
  enable: boolean

  animate: string

  loading: boolean

  progressBar: boolean
}

export interface ThemeConfig {
  themeMode: ThemeMode

  primaryColor: string

  grayMode: boolean

  colorWeak: boolean
}

export interface AppConfig {
  theme: ThemeConfig

  contentMode: ContentMode

  permissionMode: PermissionMode

  header: HeaderConfig

  sidebar: sidebarConfig

  transition: TransitionConfig
}
