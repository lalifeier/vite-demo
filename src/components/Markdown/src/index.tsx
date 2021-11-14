import { onMountedOrActivated } from '@/hooks/core/onMountedOrActivated'
import Vditor from 'vditor'
import 'vditor/dist/index.css'
import type { Ref } from 'vue'
import { defineComponent, onBeforeUnmount, onDeactivated, PropType, ref, unref, watch } from 'vue'

const props = {
  modelValue: {
    type: String,
    default: ''
  },
  height: {
    type: [Number, String] as PropType<string | number>,
    required: false,
    default: 360
  }
}

export default defineComponent({
  name: 'MarkDown',
  props,
  emits: ['init', 'change', 'update:modelValue'],
  setup(props, { attrs, emit }) {
    const elRef = ref<ElRef>(null)
    const vditorRef = ref(null) as Ref<Nullable<Vditor>>

    watch(
      () => props.modelValue,
      (value: string) => {
        setValue(value)
      }
    )

    function setValue(value) {
      if (unref(vditorRef)?.getValue() != value) {
        vditorRef.value?.setValue(value)
      }
    }

    function init() {
      const el = unref(elRef) as HTMLElement
      if (!el) return
      const bindValue = { ...attrs, ...props }

      const vditor = new Vditor(el, {
        mode: 'sv',
        fullscreen: {
          index: 520
        },
        preview: {
          actions: []
        },
        input: (value) => {
          emit('update:modelValue', value)
          emit('change', value)
        },
        after: () => {
          vditor.setValue(unref(props.modelValue))
          vditorRef.value = vditor
          emit('init', vditor)
        },
        blur: () => {},
        ...bindValue,
        cache: {
          enable: false
        }
      })
    }

    function destroy() {
      const vditor = unref(vditorRef)
      if (!vditor) return
      vditor?.destroy?.()
      vditorRef.value = null
    }

    onMountedOrActivated(init)

    onBeforeUnmount(destroy)
    onDeactivated(destroy)

    return () => <div ref={elRef}></div>
  }
})
