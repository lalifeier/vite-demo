import { useDesign } from '@/hooks/web/useDesign'
import type { CSSProperties, ExtractPropTypes } from 'vue'
import { computed, defineComponent } from 'vue'

const svgIconProps = {
  prefix: {
    type: String,
    default: 'icon'
  },
  name: {
    type: String,
    required: true
  },
  size: {
    type: [Number, String],
    default: 16
  }
}

export type SvgIconProps = ExtractPropTypes<typeof svgIconProps>

export default defineComponent({
  name: 'SvgIcon',
  props: svgIconProps,
  setup(props) {
    const { prefixCls } = useDesign('svg-icon')

    const symbolId = computed(() => `#${props.prefix}-${props.name}`)

    const getStyle = computed((): CSSProperties => {
      const { size } = props
      let s = `${size}`
      s = `${s.replace('px', '')}px`
      return {
        width: s,
        height: s
      }
    })
    return () => (
      <svg class={prefixCls} aria-hidden="true" style={getStyle.value}>
        <use xlinkHref={symbolId.value} />
      </svg>
    )
  }
})
