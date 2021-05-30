import type { App } from 'vue'

const componentList = []

export function setupComponent(app: App) {
  componentList.forEach((component: any) => {
    app.component(component.name || component.displayName, component)
  })
}
