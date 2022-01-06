import { useProvider } from '@/context';
import { useSidebarSetting } from '@/hooks/setting/useSidebarSetting';
import { prefixCls, themeMode } from '@/settings/design';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { defineComponent, ref, toRefs, watch } from 'vue';
import { createAppProviderContext } from './useAppContext';

const props = {
  prefixCls: {
    type: String,
    default: prefixCls,
  },
  theme: {
    type: String,
    default: themeMode,
  },
};

export default defineComponent({
  name: 'AppProvider',
  inheritAttrs: false,
  props,
  setup(props, { slots }) {
    const { prefixCls } = toRefs(props);

    const isMobile = ref(false);
    const breakpoints = useBreakpoints(breakpointsTailwind);
    const isSmallerSm = breakpoints.smaller('sm');
    watch(
      isSmallerSm,
      (value) => {
        isMobile.value = value;

        const { toggleCollapsed, getCollapsed } = useSidebarSetting();

        if (value) {
          !getCollapsed && toggleCollapsed();
        }
      },
      {
        immediate: true,
      },
    );

    useProvider();

    createAppProviderContext({ prefixCls, isMobile });

    return () => slots.default?.();
  },
});
