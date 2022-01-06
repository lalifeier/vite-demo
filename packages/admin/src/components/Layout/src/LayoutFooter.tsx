import { useDesign } from '@/hooks/web/useDesign';
import { defineComponent } from 'vue';

const props = {
  prefixCls: {
    type: String as PropType<string>,
    default: 'layout-footer',
  },
};

export default defineComponent({
  name: 'LayoutFooter',
  props,
  setup(_, { slots }) {
    const { prefixCls } = useDesign('layout-footer');

    return () => <footer class={prefixCls}>{slots.default?.()}</footer>;
  },
});
