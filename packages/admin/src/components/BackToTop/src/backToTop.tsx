import { useDesign } from '@/hooks/web/useDesign'
import { scrollToTop } from '@/utils/dom'
import { useEventListener } from '@vueuse/core'
import { throttle } from 'lodash-es'
import { computed, CSSProperties, defineComponent, onMounted, ref, shallowRef, unref } from 'vue'

const props = {
  target: {
    type: String,
    default: '',
  },
  visibilityHeight: {
    type: Number,
    default: 400,
  },
  right: {
    type: Number,
    default: 40,
  },
  bottom: {
    type: Number,
    default: 40,
  },
}

export default defineComponent({
  name: 'BackToTop',
  props,
  emits: ['click'],
  setup(props, { slots, emit }) {
    const { prefixCls } = useDesign('backtop')

    const el = shallowRef<HTMLElement | undefined>(document.documentElement)
    const container = shallowRef<Document | HTMLElement>(document)
    const visible = ref(false)

    const getWrapStyle = computed((): CSSProperties => {
      const bottom = `${props.bottom}px`
      const right = `${props.right}px`

      return {
        bottom,
        right,
      }
    })

    const throttledScrollHandler = throttle(handleScroll, 300)

    function handleScroll() {
      if (!el.value) {
        return
      }
      const scrollTop = el.value?.scrollTop || 0
      visible.value = scrollTop >= props.visibilityHeight
    }

    function handleClick(event) {
      scrollToTop(el.value)
      emit('click', event)
    }

    onMounted(() => {
      if (props.target) {
        el.value = document.querySelector<HTMLElement>(props.target) ?? undefined
        if (!el.value) {
          throw new Error(`target is not existed: ${props.target}`)
        }
        container.value = el.value
      }

      useEventListener(container, 'scroll', throttledScrollHandler)
    })

    return () => (
      <v-fab-transition>
        <div class={prefixCls} style={unref(getWrapStyle)} onClick={handleClick} v-show={visible.value}>
          {slots.default ? (
            slots.default()
          ) : (
            <v-btn aria-label="滚动页面至顶部" title="滚动页面至顶部" class="transition-swing" color="primary" icon>
              <v-icon>mdi-chevron-up</v-icon>
            </v-btn>
          )}
        </div>
      </v-fab-transition>
    )
  },
})
