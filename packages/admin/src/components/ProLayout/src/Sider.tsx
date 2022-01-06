import { LayoutSider } from '@/components/Layout';
import { useDesign } from '@/hooks/web/useDesign';
import { isObject } from '@/utils/is';
import { computed, defineComponent } from 'vue';
import { useProLayoutContext } from './useProLayoutContext';

const props = {
  prefixCls: {
    type: String as PropType<string>,
    default: 'pro-layout-sider',
  },
};

export default defineComponent({
  name: 'Sider',
  props,
  setup() {
    const { prefixCls } = useDesign('pro-layout-sider');

    const { props, slots, collapsed, setCollapsed } = useProLayoutContext();

    const fixed = computed(() => {
      const { fixed } = props;
      return isObject(fixed) ? fixed.sider : fixed;
    });

    const getClass = computed(() => {
      return [
        prefixCls,
        {
          [`${prefixCls}-fixed`]: fixed.value,
          [`${prefixCls}-collapsed`]: collapsed.value,
        },
      ];
    });

    return () => (
      <LayoutSider class={getClass.value} onCollapse={setCollapsed}>
        {slots.siderHeader && <div class={`${prefixCls}-header`}>{slots.siderHeader()}</div>}
        <div class={`${prefixCls}-content`}>{slots.siderContent && slots.siderContent()}</div>
        {slots.siderFooter && <div class={`${prefixCls}-footer`}>{slots.siderFooter()}</div>}
      </LayoutSider>
    );
  },
});
