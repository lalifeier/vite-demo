import 'virtual:windi-devtools'
import 'virtual:windi.css'
import { createApp } from 'vue'
import { worker } from '../mock/browser'
import App from './App.vue'
import { setupComponent } from './components'
import { setupDirective } from './directive'
import { setupPlugin } from './plugins'
import router, { setupRouter } from './router'
import { setupRouterGuard } from './router/guard'
import { setupStore } from './store'
import './styles/index.scss'
import { setupErrorHandle } from './utils/error-handle'

if (process.env.NODE_ENV === 'development') {
  worker.start()
}

;(async () => {
  const app = createApp(App)

  // app.config.globalProperties.$emitter = mitt

  setupStore(app)

  setupComponent(app)

  setupRouter(app)

  setupRouterGuard()

  setupPlugin(app)

  setupDirective(app)

  setupErrorHandle(app)

  await router.isReady()

  app.mount('#app')
})()
