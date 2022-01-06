import NProgress from '@/utils/lib/progress';
import type { Router } from 'vue-router';

export function createProgressGuard(router: Router) {
  router.beforeEach(async () => {
    NProgress.start();
    return true;
  });

  router.afterEach(async () => {
    NProgress.done();
    return true;
  });
}
