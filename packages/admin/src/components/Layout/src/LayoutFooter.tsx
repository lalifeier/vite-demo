import { usePrefixCls } from '@/hooks/web/usePrefixCls'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'LayoutFooter',
  setup(_, { slots }) {
    const prefixCls = usePrefixCls('layout-footer')

    return () => <footer class={prefixCls}>{slots.default?.()}</footer>
  },
})
