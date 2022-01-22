import { LayoutSider } from '@/components/Layout'
import { usePrefixCls } from '@/hooks/web/usePrefixCls'
import { isObject } from '@/utils/is'
import { computed, defineComponent } from 'vue'
import { useProLayoutContext } from './useProLayoutContext'

export default defineComponent({
  name: 'Sider',
  setup() {
    const prefixCls = usePrefixCls('pro-layout-sider')

    const { props, slots, collapsed } = useProLayoutContext()

    const fixed = computed(() => {
      const { fixed } = props
      return isObject(fixed) ? fixed.sider : fixed
    })

    const getClass = computed(() => {
      return [
        prefixCls,
        {
          [`${prefixCls}-fixed`]: fixed.value,
          [`${prefixCls}-collapsed`]: collapsed.value,
        },
      ]
    })

    return () => (
      <LayoutSider class={getClass.value}>
        {slots.siderHeader && <div class={`${prefixCls}-header`}>{slots.siderHeader()}</div>}
        <div class={`${prefixCls}-content`}>{slots.siderContent && slots.siderContent()}</div>
        {slots.siderFooter && <div class={`${prefixCls}-footer`}>{slots.siderFooter()}</div>}
      </LayoutSider>
    )
  },
})
