import { HeaderSetting } from '#/config';
import { useAppStore } from '@/store/modules/app';
import { computed } from 'vue';

export function useHeaderSetting() {
  const appStore = useAppStore();

  const getHeaderFixed = computed(() => appStore.getHeaderSetting.fixed);

  function setHeaderSetting(headerSetting: Partial<HeaderSetting>) {
    appStore.setAppConfig({ headerSetting });
  }

  return {
    setHeaderSetting,

    getHeaderFixed,
  };
}
