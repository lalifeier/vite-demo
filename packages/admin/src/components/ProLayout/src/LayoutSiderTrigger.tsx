import { SvgIcon } from '@/components/Icon'
import { usePrefixCls } from '@/hooks/web/usePrefixCls'
import { isString } from '@/utils/is'
import PropTypes from '@/utils/propTypes'
import { ExtractPropTypes } from 'vue'
import { useProLayoutContext } from './useProLayoutContext'

const proLayoutSiderTriggerProps = {
  icon: PropTypes.arrayOf(PropTypes.oneOfType([String])),
}

export type ProLayoutSiderTriggerProps = ExtractPropTypes<typeof proLayoutSiderTriggerProps>

export default defineComponent({
  name: 'ProLayoutSiderTrigger',
  props: proLayoutSiderTriggerProps,
  setup(props, { slots }) {
    const prefixCls = usePrefixCls('pro-layout-sider-trigger')
    const { collapsed, setCollapsed } = useProLayoutContext()

    const getClass = computed(() => {
      return {
        [prefixCls]: true,
        [`${prefixCls}-collapsed`]: collapsed.value,
      }
    })

    const handleClick = () => setCollapsed(!collapsed.value)

    const icon = computed(() => {
      const [fold = 'menu-fold', unfold = 'menu-unfold'] = props.icon || []
      return collapsed.value ? fold : unfold
    })
    const renderIcon = () => {
      if (slots.default) {
        return slots.default({ collapsed: collapsed.value })
      }
      const iconValue = icon.value
      return isString(iconValue) ? <SvgIcon name={iconValue} /> : iconValue
    }

    return () => {
      return (
        <div class={getClass.value} onClick={handleClick}>
          {renderIcon()}
        </div>
      )
    }
  },
})
