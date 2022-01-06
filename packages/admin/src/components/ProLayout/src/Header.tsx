import { LayoutHeader } from '@/components/Layout';
import { useDesign } from '@/hooks/web/useDesign';
import { isObject } from '@/utils/is';
import { computed, defineComponent } from 'vue';
import { useProLayoutContext } from './useProLayoutContext';

const props = {
  prefixCls: {
    type: String as PropType<string>,
    default: 'pro-layout-header',
  },
};

export default defineComponent({
  name: 'Header',
  props,
  setup() {
    const { prefixCls } = useDesign('pro-layout-header');

    const { props, slots } = useProLayoutContext();

    const theme = computed(() => {
      const { theme } = props;
      return isObject(theme) ? theme.header : theme;
    });

    const fixed = computed(() => {
      const { fixed } = props;
      return isObject(fixed) ? fixed.header : fixed;
    });

    const getClass = computed(() => {
      return [
        prefixCls,
        {
          [`${prefixCls}-${theme.value}`]: true,
          [`${prefixCls}-fixed`]: fixed.value,
        },
      ];
    });

    return () => (
      <LayoutHeader class={getClass.value}>
        {slots.logo && <div class={`${prefixCls}-logo`}>{slots.logo()}</div>}
        <div class={`${prefixCls}-content`}>{slots.headerContent && slots.headerContent()}</div>
        {slots.headerExtra && <div class={`${prefixCls}-extra`}>{slots.headerExtra()}</div>}
      </LayoutHeader>
    );
  },
});
