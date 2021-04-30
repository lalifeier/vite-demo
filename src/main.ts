import { createApp } from 'vue'
import App from './App.vue'
import { setupDirective } from './directive'
import router, { setupRouter } from './router'
import { setupRouterGuard } from './router/guard'
import { setupStore } from './store'
import './styles/tailwind.css'
;(async () => {
  const app = createApp(App)

  setupStore(app)

  setupRouter(app)

  setupRouterGuard()

  setupDirective(app)

  await router.isReady()

  app.mount('#app')
})()
