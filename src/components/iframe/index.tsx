import { useResizeObserver } from '@vueuse/core'
import { defineComponent, ref, unref } from 'vue'

const props = {
  src: {
    type: String,
    required: true
  }
}

export default defineComponent({
  name: 'Frame',
  props,
  setup(props) {
    const el = ref<HTMLFrameElement>()

    // const getWrapStyle = computed((): CSSProperties => {
    //   return {}
    // })

    useResizeObserver(el, (entries) => {
      const iframeElement = unref(el)
      if (!iframeElement) {
        return
      }

      const entry = entries[0]
      const { width, height } = entry.contentRect

      iframeElement.style.width = `${width}px`
      iframeElement.style.height = `${height}px`
    })

    return () => <iframe src={props.src} ref={el}></iframe>
  }
})
