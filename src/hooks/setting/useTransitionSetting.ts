import type { TransitionSetting } from '#/config'
import { useAppStore } from '@/store/modules/app'
import { computed } from 'vue'

export function useTransitionSetting() {
  const appStore = useAppStore()

  const getEnableTransition = computed(() => appStore.getTransitionSetting.enable)

  const getOpenProgressBar = computed(() => appStore.getTransitionSetting.progressBar)

  const getOpenPageLoading = computed(() => appStore.getTransitionSetting.pageLoading)

  const getTransition = computed(() => appStore.getTransitionSetting.transition)

  function setTransitionSetting(transitionSetting: Partial<TransitionSetting>) {
    appStore.setAppConfig({ transitionSetting })
  }
  return {
    setTransitionSetting,

    getEnableTransition,
    getOpenProgressBar,
    getOpenPageLoading,
    getTransition
  }
}
