import { Component } from '@/router/types'
import type { App } from 'vue'

const components = []

const plugins = []

export default {
  install(app: App<Element>, options) {
    components.forEach((component: Component) => {
      app.component(component.name, component)
    })
    plugins.forEach((plugin) => {
      app.use(plugin)
    })
  },
}
