import { Theme } from '#/config';
import { useAppStoreWithOut } from '@/store/modules/app';
import { computed } from 'vue';

export function useAppSetting() {
  const appStore = useAppStoreWithOut();

  const getDarkMode = computed(() => appStore.getDarkMode);

  function setDarkMode(mode: Theme) {
    appStore.setDarkMode(mode);
  }

  return {
    getDarkMode,
    setDarkMode,
  };
}
