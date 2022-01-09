import { usePrefixCls } from '@/hooks/web/usePrefixCls';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LayoutSider',
  setup(_, { slots }) {
    const prefixCls = usePrefixCls('layout-sider');

    return () => <aside class={prefixCls}>{slots.default?.()}</aside>;
  },
});
