import type { App } from 'vue'
import clipboard from './modules/clipboard'
import lazy from './modules/lazy'
import permission from './modules/permission'

export function setupDirective(app: App<Element>) {
  app.directive('permission', permission)
  app.directive('clipboard', clipboard)
  app.directive('lazy', lazy)
}
