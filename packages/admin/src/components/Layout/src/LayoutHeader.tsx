import { useDesign } from '@/hooks/web/useDesign'
import { defineComponent } from 'vue'

const props = {
  prefixCls: {
    type: String as PropType<string>,
    default: 'layout-header'
  }
}

export default defineComponent({
  name: 'LayoutHeader',
  props,
  setup(_, { slots }) {
    const { prefixCls } = useDesign('layout-header')

    return () => <header class={prefixCls}>{slots.default?.()}</header>
  }
})
