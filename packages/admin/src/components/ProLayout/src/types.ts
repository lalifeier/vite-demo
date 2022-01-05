export type ProLayoutMode = 'header' | 'sider' | 'mixin' | 'both'

export type ProLayoutContentMode = 'fluid' | 'fixed'

export type ProLayoutTheme = 'light' | 'dark'

export type ProLayoutFixed = boolean | { header: boolean; sider: boolean }

export type BreakpointType = 'sm' | 'md' | 'lg' | 'xl' | '2xl'

export interface MenuClickOptions {
  event: Event
}
