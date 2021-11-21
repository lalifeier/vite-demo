import { SidebarConfig } from "#/config";
import { useAppStore } from "@/store/modules/app";
import { computed, unref } from 'vue';

export function useSidebar() {
  const appStore = useAppStore();

  const getSidebarFixed = computed(() => appStore.getSidebarConfig.fixed)


  const getCollapsed = computed(() => appStore.getSidebarConfig.collapsed)

  function setSidebarConfig(sidebar: Partial<SidebarConfig>): void {
    appStore.setAppConfig({ sidebar })
  }

  function toggleCollapsed() {
    setSidebarConfig({
      collapsed: !unref(getCollapsed),
    });
  }

  return {
    setSidebarConfig,

    toggleCollapsed,

    getSidebarFixed,
    getCollapsed,
  }
}
