import { useDesign } from '@/hooks/web/useDesign'
import { convertToUnit } from '@/utils/format'
import { useEventListener, useResizeObserver } from '@vueuse/core'
import type { CSSProperties, StyleValue } from 'vue'
import { computed, defineComponent, nextTick, onMounted, provide, ref, watch } from 'vue'
import Bar from './bar'

const props = {
  height: {
    type: [String, Number],
    default: ''
  },
  maxHeight: {
    type: [String, Number],
    default: ''
  },
  native: {
    type: Boolean,
    default: false
  },
  wrapClass: {
    type: [String, Array],
    default: ''
  },
  wrapStyle: {
    type: [String, Array],
    default: ''
  },
  viewClass: {
    type: [String, Array],
    default: ''
  },
  viewStyle: {
    type: [String, Array],
    default: ''
  },
  noresize: {
    type: Boolean,
    default: false
  },
  tag: {
    type: String,
    default: 'div'
  },
  always: {
    type: Boolean,
    default: false
  },
  minSize: {
    type: Number,
    default: 20
  }
}

export default defineComponent({
  name: 'Scrollbar',
  props,
  emits: ['scroll'],
  setup(props, { slots, emit }) {
    const { prefixCls } = useDesign('scrollbar')

    const scrollbarRef = ref<HTMLDivElement>()
    const wrapRef = ref<HTMLDivElement>()
    const resizeRef = ref<HTMLElement>()

    let stopResizeObserver: (() => void) | undefined = undefined
    let stopResizeListener: (() => void) | undefined = undefined

    const sizeWidth = ref('0')
    const sizeHeight = ref('0')
    const moveX = ref(0)
    const moveY = ref(0)
    const GAP = 4

    const style = computed<StyleValue>(() => {
      const style: CSSProperties = {}
      if (props.height) style.height = convertToUnit(props.height)
      if (props.maxHeight) style.maxHeight = convertToUnit(props.maxHeight)
      return [props.wrapStyle, style]
    })

    const handleScroll = () => {
      if (!wrapRef.value) {
        return
      }

      const offsetHeight = wrapRef.value.offsetHeight - GAP
      const offsetWidth = wrapRef.value.offsetWidth - GAP

      moveY.value = (wrapRef.value.scrollTop * 100) / offsetHeight
      moveX.value = (wrapRef.value.scrollLeft * 100) / offsetWidth

      emit('scroll', {
        scrollTop: wrapRef.value.scrollTop,
        scrollLeft: wrapRef.value.scrollLeft
      })
    }

    const setScrollTop = (value: number) => {
      wrapRef.value!.scrollTop = value
    }
    const setScrollLeft = (value: number) => {
      wrapRef.value!.scrollLeft = value
    }

    const update = () => {
      if (!wrapRef.value) return

      const offsetHeight = wrapRef.value.offsetHeight - GAP
      const offsetWidth = wrapRef.value.offsetWidth - GAP

      const originalHeight = offsetHeight ** 2 / wrapRef.value.scrollHeight
      const originalWidth = offsetWidth ** 2 / wrapRef.value.scrollWidth
      const height = Math.max(originalHeight, props.minSize)
      const width = Math.max(originalWidth, props.minSize)

      sizeHeight.value = height + GAP < offsetHeight ? `${height}px` : ''
      sizeWidth.value = width + GAP < offsetWidth ? `${width}px` : ''
    }

    watch(
      () => props.noresize,
      (noresize) => {
        if (noresize) {
          stopResizeObserver?.()
          stopResizeListener?.()
        } else {
          ;({ stop: stopResizeObserver } = useResizeObserver(resizeRef, update))
          stopResizeListener = useEventListener('resize', update)
        }
      },
      { immediate: true }
    )

    provide('scrollbar', scrollbarRef)
    provide('scrollbar-wrap', wrapRef)

    onMounted(() => {
      if (!props.native) nextTick(() => update())
    })

    return () => (
      <div ref={scrollbarRef} class={prefixCls}>
        <div
          ref={wrapRef}
          class={[
            props.wrapClass,
            prefixCls + '__wrap',
            props.native ? '' : prefixCls + '__wrap--hidden-default'
          ]}
          style={style.value}
          onScroll={handleScroll}
        >
          <props.tag
            ref={resizeRef}
            class={[prefixCls + '__view', props.viewClass]}
            style={props.viewStyle}
          >
            {slots.default?.()}
          </props.tag>
        </div>
        {!props.native
          ? [
              <Bar move={moveX.value} size={sizeWidth.value} always={props.always} />,
              <Bar vertical move={moveY.value} size={sizeHeight.value} always={props.always} />
            ]
          : ''}
      </div>
    )
  }
})
