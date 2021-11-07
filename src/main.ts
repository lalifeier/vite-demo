import 'animate.css'
import 'spinkit/spinkit.css'
import { createApp } from 'vue'
import { worker } from '../mock/browser'
import App from './App.vue'
import { setupComponent } from './components'
import { setupDirective } from './directives'
import { setupAppConfig } from './logics/config'
import { setupPlugin } from './plugins'
import { router, setupRouter } from './router'
import { setupRouterGuard } from './router/guard'
import { setupStore } from './store'
import './styles/index.scss'
import './styles/tailwind.css'
import { isDev } from './utils/env'

if (!isDev) {
  worker.start()
}

;(async () => {
  const app = createApp(App)

  // app.config.globalProperties.$emitter = mitt

  setupStore(app)

  setupAppConfig()

  setupComponent(app)

  setupRouter(app)

  setupRouterGuard()

  setupPlugin(app)

  setupDirective(app)

  // Performance.init()
  // app.mixin(Performance.record(router))

  await router.isReady()

  app.mount('#app')
})()
