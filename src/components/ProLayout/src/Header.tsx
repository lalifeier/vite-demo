import { LayoutHeader } from '@/components/Layout'
import { useDesign } from '@/hooks/web/useDesign'
import { computed, defineComponent } from 'vue'
import { useProLayoutContext } from './useProLayoutContext'

const props = {
  prefixCls: {
    type: String as PropType<string>,
    default: 'pro-layout-header'
  }
}

export default defineComponent({
  name: 'Header',
  props,
  setup() {
    const { prefixCls } = useDesign('pro-layout-header')

    const { props, slots } = useProLayoutContext()

    const fixed = computed(() => !!props.fixedHeader)

    const getClass = computed(() => {
      return [
        prefixCls,
        {
          [`${prefixCls}-fixed`]: fixed.value
        }
      ]
    })

    return () => (
      <LayoutHeader class={getClass.value}>
        {slots.logo && <div class={`${prefixCls}-logo`}>{slots.logo()}</div>}
        <div class={`${prefixCls}-content`}>{slots.headerContent && slots.headerContent()}</div>
        {slots.headerExtra && <div class={`${prefixCls}-extra`}>{slots.headerExtra()}</div>}
      </LayoutHeader>
    )
  }
})
