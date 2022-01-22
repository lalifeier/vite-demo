import { useDesign } from '@/hooks/web/useDesign'
import { off, on } from '@/utils/dom'
import { useEventListener } from '@vueuse/core'
import { computed, defineComponent, inject, onBeforeUnmount, onMounted, ref, Ref, Transition } from 'vue'
import { BAR_MAP, renderThumbStyle } from './util'

const props = {
  vertical: Boolean,
  size: String,
  move: Number,
  always: Boolean,
}

export default defineComponent({
  name: 'Bar',
  props,
  setup(props) {
    const { prefixCls } = useDesign('scrollbar')

    const scrollbar = inject('scrollbar', {} as Ref<Nullable<HTMLElement>>) as any
    const wrap = inject('scrollbar-wrap', {} as Ref<Nullable<HTMLElement>>) as any

    const instance = ref<HTMLDivElement>()
    const thumb = ref<HTMLDivElement>()

    const barStore = ref<Recordable>({})
    const visible = ref(false)

    let cursorDown = false
    let cursorLeave = false

    const bar = computed(() => BAR_MAP[props.vertical ? 'vertical' : 'horizontal'])

    const thumbStyle = computed(() =>
      renderThumbStyle({
        size: props.size,
        move: props.move,
        bar: bar.value,
      }),
    )

    const clickThumbHandler = (e: MouseEvent) => {
      // prevent click event of middle and right button
      e.stopPropagation()
      if (e.ctrlKey || [1, 2].includes(e.button)) return

      window.getSelection()?.removeAllRanges()
      startDrag(e)

      const el = e.currentTarget as HTMLDivElement
      if (!el) return
      barStore.value[bar.value.axis] =
        el[bar.value.offset] - (e[bar.value.client] - el.getBoundingClientRect()[bar.value.direction])
    }

    const clickTrackHandler = (e: MouseEvent) => {
      if (!thumb.value || !instance.value || !wrap.value) return

      const offset = Math.abs(
        (e.target as HTMLElement).getBoundingClientRect()[bar.value.direction] - e[bar.value.client],
      )
      const thumbHalf = thumb.value[bar.value.offset] / 2
      const thumbPositionPercentage = ((offset - thumbHalf) * 100) / instance.value[bar.value.offset]

      wrap.value[bar.value.scroll] = (thumbPositionPercentage * wrap.value[bar.value.scrollSize]) / 100
    }

    const startDrag = (e: MouseEvent) => {
      e.stopImmediatePropagation()
      cursorDown = true

      on(document, 'mousemove', mouseMoveDocumentHandler)
      on(document, 'mouseup', mouseUpDocumentHandler)
      document.onselectstart = () => false
    }

    const mouseMoveDocumentHandler = (e: MouseEvent) => {
      if (!instance.value || !thumb.value) return
      if (cursorDown === false) return

      const prevPage = barStore.value[bar.value.axis]
      if (!prevPage) return

      const offset = (instance.value.getBoundingClientRect()[bar.value.direction] - e[bar.value.client]) * -1
      const thumbClickPosition = thumb.value[bar.value.offset] - prevPage
      const thumbPositionPercentage = ((offset - thumbClickPosition) * 100) / instance.value[bar.value.offset]
      wrap.value[bar.value.scroll] = (thumbPositionPercentage * wrap.value[bar.value.scrollSize]) / 100
    }

    const mouseUpDocumentHandler = () => {
      cursorDown = false
      barStore.value[bar.value.axis] = 0
      off(document, 'mousemove', mouseMoveDocumentHandler)
      off(document, 'mouseup', mouseUpDocumentHandler)
      document.onselectstart = null
      if (cursorLeave) visible.value = false
    }

    const mouseMoveScrollbarHandler = () => {
      cursorLeave = false
      visible.value = !!props.size
    }

    const mouseLeaveScrollbarHandler = () => {
      cursorLeave = true
      visible.value = cursorDown
    }

    onMounted(() => {
      useEventListener(scrollbar.value, 'mousemove', mouseMoveScrollbarHandler)
      useEventListener(scrollbar.value, 'mouseleave', mouseLeaveScrollbarHandler)
    })

    onBeforeUnmount(() => off(document, 'mouseup', mouseUpDocumentHandler))

    return () => (
      <Transition name={prefixCls + '-fade'}>
        <div
          v-show={props.always || visible.value}
          ref={instance}
          class={[prefixCls + '__bar', 'is-' + bar.value.key]}
          onMousedown={clickTrackHandler}
        >
          <div ref={thumb} class={prefixCls + '__thumb'} style={thumbStyle.value} onMousedown={clickThumbHandler}></div>
        </div>
      </Transition>
    )
  },
})
