import { defineComponent } from 'vue'
import type { RouteMeta, RouteRecordRaw } from 'vue-router'

export type Component<T extends any = any> =
  | ReturnType<typeof defineComponent>
  | (() => Promise<typeof import('*.vue')>)
  | (() => Promise<T>)

// @ts-ignore
export interface AppRouteRecordRaw extends Omit<RouteRecordRaw, 'meta'> {
  name: string
  meta?: RouteMeta
  component?: Component | string
  children?: AppRouteRecordRaw[]
  props?: Recordable
  hidden?: boolean
}

export type AppRouteModule = AppRouteRecordRaw
