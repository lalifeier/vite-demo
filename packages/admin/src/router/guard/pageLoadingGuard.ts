import { useTransitionSetting } from '@/hooks/setting/useTransitionSetting'
import { useAppStoreWithOut } from '@/store/modules/app'
import type { Router } from 'vue-router'

export function createPageLoadingGuard(router: Router) {
  const appStore = useAppStoreWithOut()
  const { getOpenPageLoading } = useTransitionSetting()
  router.beforeEach(async (to) => {
    if (unref(getOpenPageLoading)) {
      appStore.setPageLoadingAction(true)
    }
    return true
  })
  router.afterEach(async () => {
    if (unref(getOpenPageLoading)) {
      setTimeout(() => {
        appStore.setPageLoading(false)
      }, 220)
    }
    return true
  })
}
