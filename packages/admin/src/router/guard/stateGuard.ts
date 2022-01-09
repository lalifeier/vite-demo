import { Page } from '@/enums/page';
import { useUserStoreWithOut } from '@/store/modules/user';
import type { Router } from 'vue-router';

export function createStateGuard(router: Router) {
  router.afterEach((to) => {
    if (to.path === Page.LOGIN) {
      const userStore = useUserStoreWithOut();

      userStore.resetState();
    }
  });
}
