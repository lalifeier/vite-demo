import { usePrefixCls } from '@/hooks/web/usePrefixCls'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LayoutContent',
  setup(_, { slots }) {
    const prefixCls = usePrefixCls('layout-content')

    return () => <main class={prefixCls}>{slots.default?.()}</main>
  },
})
