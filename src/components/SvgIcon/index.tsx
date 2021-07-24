import type { CSSProperties } from 'vue'
import { computed, defineComponent } from 'vue'
import './index.scss'

export default defineComponent({
  name: 'SvgIcon',
  props: {
    iconClass: {
      type: String,
      required: true
    },
    className: {
      type: String,
      default: ''
    },
    size: {
      type: [Number, String],
      default: 16
    }
  },
  setup(props) {
    const iconName = computed(() => `#icon-${props.iconClass}`)
    const svgClass = computed(() => (props.className ? `svg-icon ${props.className}` : 'svg-icon'))

    const getStyle = computed((): CSSProperties => {
      const { size } = props
      let s = `${size}`
      s = `${s.replace('px', '')}px`
      return {
        width: s,
        height: s
      }
    })
    return () => {
      ;<svg class={svgClass.value} aria-hidden="true" style={getStyle.value}>
        <use xlinkHref={iconName.value} />
      </svg>
    }
  }
})
