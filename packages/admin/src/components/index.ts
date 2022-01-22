import type { App } from 'vue'
// import VirtualList from './VirtualList';

const componentList = []

export function setupComponent(app: App) {
  componentList.forEach((component: any) => {
    app.component(component.name || component.displayName, component)
  })
}
