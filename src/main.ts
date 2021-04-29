import 'tailwindcss/tailwind.css'
import { createApp } from 'vue'
import App from './App.vue'
import { setupStore } from './store'
;async () => {
  const app = createApp(App)

  setupStore(app)

  app.mount('#app')
}
