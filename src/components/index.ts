import type { App } from 'vue'
// import VirtualList from './VirtualList';

const componentList = []

export function setupComponent(app: App) {
  componentList.forEach((component: any) => {
    app.component(component.name || component.displayName, component)
  })
}

export const withInstall = <T>(component: T, alias?: string) => {
  const comp = component as any
  comp.install = (app: App) => {
    app.component(comp.name || comp.displayName, component)
    if (alias) {
      app.config.globalProperties[alias] = component
    }
  }
  return component as T & Plugin
}
