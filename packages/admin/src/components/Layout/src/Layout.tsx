import { usePrefixCls } from '@/hooks/web/usePrefixCls'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Layout',
  setup(_, { slots }) {
    const prefixCls = usePrefixCls('layout')

    return () => <section class={prefixCls}>{slots.default?.()}</section>
  },
})
