import { convertToUnit } from '@/utils/format'
import { useEventListener } from '@vueuse/core'
import { computed, CSSProperties, defineComponent, onMounted, reactive, ref, unref } from 'vue'
import './index.scss'

const props = {
  data: {
    type: Array,
    default: () => []
  },
  itemSize: {
    type: Number,
    default: 0,
    required: true
  },
  bufferSize: {
    type: Number,
    default: 0
  }
}

export default defineComponent({
  name: 'VirtualList',
  props,
  setup(props, { slots }) {
    const elRef = ref<HTMLDivElement | null>(null)

    const state: any = reactive({
      startOffset: 0,
      startIndex: 0,
      endIndex: 0
    })

    const visibleCount = computed(() => {
      const el = unref(elRef)
      if (!el) {
        return 0
      }
      return Math.ceil(el.clientHeight / props.itemSize) + props.bufferSize
    })

    const visibleData = computed(() => {
      const { data = [] } = props
      return data.slice(state.startIndex, Math.min(state.endIndex, data.length))
    })

    onMounted(() => {
      const el = unref(elRef)
      if (!el) {
        return
      }
      useEventListener(el, 'scroll', onScroll)
      updateVisibleData()
    })

    function onScroll(_event) {
      const scrollTop = elRef.value?.scrollTop || 0
      updateVisibleData(scrollTop)
    }

    function updateVisibleData(scrollTop = 0) {
      state.startIndex = Math.floor(scrollTop / props.itemSize)
      state.endIndex = state.startIndex + visibleCount.value
      state.startOffset = state.startIndex * props.itemSize
    }

    const getInfiniteListPhantomStyle = computed((): CSSProperties => {
      return {
        height: convertToUnit(props.data.length * props.itemSize)
      }
    })

    const getInfiniteListStyle = computed((): CSSProperties => {
      return {
        transform: `translate3d(0,${state.startOffset}px,0)`
      }
    })

    return () => (
      <div ref={elRef} class="infinite-list-container">
        <div class="infinite-list-phantom" style={unref(getInfiniteListPhantomStyle)}></div>
        <div class="infinite-list" style={unref(getInfiniteListStyle)}>
          {unref(visibleData).map((item, index) => {
            return (
              <div class="infinite-list-item" key={index}>
                {slots.default?.({ index, item })}
              </div>
            )
          })}
        </div>
      </div>
    )
  }
})
