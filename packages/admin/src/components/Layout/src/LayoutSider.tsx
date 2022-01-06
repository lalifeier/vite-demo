import { useDesign } from '@/hooks/web/useDesign';
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core';
import { computed, defineComponent, PropType, ref, watch } from 'vue';

const props = {
  prefixCls: {
    type: String as PropType<string>,
    default: 'layout-sider',
  },
  collapsed: {
    type: Boolean as PropType<boolean>,
  },
  breakpoint: {
    type: String as PropType<breakpointType>,
    default: 'sm',
  },
  onCollapse: {
    type: Function,
  },
};

export type breakpointType = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

export default defineComponent({
  name: 'LayoutSider',
  props,
  setup(props, { slots }) {
    const { prefixCls } = useDesign('layout-sider');

    const collapsed = ref(props.collapsed);

    function changeCollapsed(collapsed: boolean, type: 'trigger' | 'breakpoint') {
      _setCollapsed(collapsed);
      props.onCollapse?.(collapsed);
    }

    const _setCollapsed = (_collapsed: boolean) => {
      collapsed.value = _collapsed;
    };

    const breakpoints = useBreakpoints(breakpointsTailwind);
    const breakpointRef = breakpoints.smaller(props.breakpoint);
    watch(
      breakpointRef,
      (value) => {
        changeCollapsed(value, 'breakpoint');
      },
      { immediate: true },
    );

    const getClass = computed(() => {
      return [
        prefixCls,
        {
          [`${prefixCls}-collapsed`]: collapsed.value,
        },
      ];
    });

    return () => <aside class={getClass.value}>{slots.default?.()}</aside>;
  },
});
