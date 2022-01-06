import App from '@/App.vue';
import { setupComponent } from '@/components';
import { setupDirective } from '@/directives';
import { setupI18n } from '@/locales/index';
import { setupPlugin } from '@/plugins';
import { router, setupRouter } from '@/router';
import { setupRouterGuard } from '@/router/guard';
import { setupStore } from '@/store';
import '@/styles/index.scss';
import { setupAppConfig } from '@/utils/app-config';
import { isDev } from '@/utils/env';
// import 'animate.css'
// import 'spinkit/spinkit.css'
import 'virtual:windi-base.css';
import 'virtual:windi-components.css';
import 'virtual:windi-utilities.css';
import 'vite-plugin-svg-icons/register';
import { createApp } from 'vue';
import { worker } from '../mock/browser';

if (!isDev) {
  worker.start({
    onUnhandledRequest: 'bypass',
  });
}

(async () => {
  const app = createApp(App);

  // app.config.globalProperties.$emitter = mitt

  setupStore(app);

  setupAppConfig();

  setupComponent(app);

  await setupI18n(app);

  setupRouter(app);

  setupRouterGuard();

  setupPlugin(app);

  setupDirective(app);

  // Performance.init()
  // app.mixin(Performance.record(router))

  await router.isReady();

  app.mount('#app');
})();
