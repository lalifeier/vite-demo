import { useDesign } from '@/hooks/web/useDesign';
import { defineComponent } from 'vue';

const props = {
  prefixCls: {
    type: String as PropType<string>,
    default: 'layout-content',
  },
};

export default defineComponent({
  name: 'LayoutContent',
  props,
  setup(_, { slots }) {
    const { prefixCls } = useDesign('layout-content');

    return () => <main class={prefixCls}>{slots.default?.()}</main>;
  },
});
