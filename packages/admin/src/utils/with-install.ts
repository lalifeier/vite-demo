import { NOOP } from '@vue/shared'
import type { App, Plugin } from 'vue'

export type SFCWithInstall<T> = T & Plugin

export function withInstall<T>(options: T) {
  ;(options as SFCWithInstall<T>).install = (app: App): void => {
    const { name } = options as unknown as { name: string }
    app.component(name, options)
  }

  return options as SFCWithInstall<T>
}

export const withInstallFunction = <T>(fn: T, name: string) => {
  ;(fn as SFCWithInstall<T>).install = (app) => {
    app.config.globalProperties[name] = fn
  }

  return fn as SFCWithInstall<T>
}

export const withNoopInstall = <T>(component: T) => {
  ;(component as SFCWithInstall<T>).install = NOOP

  return component as SFCWithInstall<T>
}
