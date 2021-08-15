import { useEventListener } from '@vueuse/core'
import { throttle } from 'lodash-es'
import { computed, defineComponent, onMounted, ref, unref } from 'vue'

const props = {
  target: {
    type: String,
    default: ''
  },
  visibilityHeight: {
    type: Number,
    default: 200
  },
  right: {
    type: Number,
    default: 40
  },
  bottom: {
    type: Number,
    default: 40
  }
}

export default defineComponent({
  name: 'Backtop',
  props,
  setup(props, { slots, emit }) {
    const el = ref<HTMLElement | null>(null)
    const visible = ref(false)

    const getStyle = computed(() => {
      const bottom = `${props.bottom}px`
      const right = `${props.right}px`

      return {
        position: 'fixed',
        zIndex: 6,
        bottom,
        right
      }
    })

    const throttledScrollHandler = throttle(onScroll, 300)

    onMounted(() => {
      const { target } = props

      let container: Document | HTMLElement = document
      el.value = document.documentElement

      if (target) {
        el.value = document.querySelector(target)
        if (!el.value) {
          throw new Error(`target is not existed: ${target}`)
        }
        container = el.value
      }

      useEventListener(container, 'scroll', throttledScrollHandler)
    })

    function onScroll() {
      const scrollTop = el.value?.scrollTop || 0
      visible.value = scrollTop >= props.visibilityHeight
    }

    function handleClick(event) {
      scrollToTop()
      emit('click', event)
    }

    function scrollToTop() {
      if (!el.value) {
        return
      }
      el.value.scrollTop = 0
    }

    return () => (
      <v-fab-transition>
        <v-btn
          v-show={visible.value}
          aria-label="滚动页面至顶部"
          title="滚动页面至顶部"
          class="transition-swing"
          style={unref(getStyle)}
          color="primary"
          icon
          fixed
          bottom
          right
          onClick={handleClick}
        >
          {slots.default ? slots.default() : <v-icon>mdi-chevron-up</v-icon>}
        </v-btn>
      </v-fab-transition>
    )
  }
})
