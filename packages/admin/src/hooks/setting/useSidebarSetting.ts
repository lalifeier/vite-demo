import { SidebarSetting } from '#/config'
import { useAppStore } from '@/store/modules/app'
import { computed, unref } from 'vue'

export function useSidebarSetting() {
  const appStore = useAppStore()

  const getSidebarTheme = computed(() => appStore.getSidebarSetting.theme)

  const getSidebarFixed = computed(() => appStore.getSidebarSetting.fixed)

  const getCollapsed = computed(() => appStore.getSidebarSetting.collapsed)

  function setSidebarConfig(sidebarSetting: Partial<SidebarSetting>): void {
    appStore.setAppConfig({ sidebarSetting })
  }

  function toggleCollapsed() {
    setSidebarConfig({
      collapsed: !unref(getCollapsed)
    })
  }

  const getCalcContentWidth = computed(() => {
    const width = 208
    return `calc(100% - ${unref(width)}px)`
  })

  return {
    setSidebarConfig,

    toggleCollapsed,

    getSidebarFixed,
    getCollapsed,
    getSidebarTheme,

    getCalcContentWidth
  }
}
