import { usePrefixCls } from '@/hooks/web/usePrefixCls';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LayoutHeader',
  setup(_, { slots }) {
    const prefixCls = usePrefixCls('layout-header');

    return () => <header class={prefixCls}>{slots.default?.()}</header>;
  },
});
