import { useDesign } from '@/hooks/web/useDesign'
import { defineComponent } from 'vue'

const props = {
  prefixCls: {
    type: String as PropType<string>,
    default: 'layout'
  },
  tagName: {
    type: String as PropType<string>,
    default: 'section'
  }
}

export default defineComponent({
  name: 'Layout',
  props,
  setup(_, { slots }) {
    const { prefixCls } = useDesign('layout')

    return () => <section class={prefixCls}>{slots.default?.()}</section>
  }
})
