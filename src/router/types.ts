import { defineComponent } from 'vue'
import type { RouteMeta, RouteRecordRaw } from 'vue-router'
import { Role } from '../enums/role'

export type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

export interface AppRouteMeta extends RouteMeta {
  roles?: Role[]
  orderNo?: number
  frameSrc?: string
  ignoreKeepAlive?: boolean
  affix?: boolean
  icon?: string
  hidden?: boolean
}

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string
  meta?: AppRouteMeta
  component?: Component | string
  children?: AppRouteRecordRaw[]
  props?: Recordable
}
export interface MenuTag {
  type?: 'primary' | 'error' | 'warn' | 'success'
  content?: string
  dot?: boolean
}
export interface Menu {
  name: string

  icon?: string

  path: string

  paramPath?: string

  disabled?: boolean

  children?: Menu[]

  orderNo?: number

  roles?: Role[]

  meta?: Partial<RouteMeta>

  tag?: MenuTag

  hideMenu?: boolean
}

export interface MenuModule {
  orderNo?: number
  menu: Menu
}

export type AppRouteModule = AppRouteRecordRaw
