import { isNumber } from '@/utils/is'
import { uuidv4 } from '@/utils/uuid'
import type { Editor, RawEditorSettings } from 'tinymce'
import type { CSSProperties } from 'vue'
import {
  computed,
  defineComponent,
  nextTick,
  onActivated,
  onBeforeUnmount,
  onDeactivated,
  onMounted,
  ref,
  unref,
  watch,
} from 'vue'
import { plugins, toolbar } from './config'
import load from './dynamicLoadScript'

const props = {
  url: {
    type: String,
    default: () => {
      // return 'https://cdn.jsdelivr.net/npm/tinymce@5.10.1/tinymce.min.js'
      return 'tinymce/tinymce.min.js'
    },
  },
  baseUrl: {
    type: String,
    default: () => {
      return 'tinymce/tinymce.min.js'
    },
  },
  id: {
    type: String,
    default: () => {
      return 'vue-tinymce-' + uuidv4()
    },
  },
  modelValue: {
    type: String,
    default: '',
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  options: {
    type: Object as PropType<Partial<RawEditorSettings>>,
    default: () => {},
  },
  toolbar: {
    type: Array as PropType<string[]>,
    default: toolbar,
  },
  plugins: {
    type: Array as PropType<string[]>,
    default: plugins,
  },
  height: {
    type: [Number, String] as PropType<string | number>,
    required: false,
    default: 400,
  },
  width: {
    type: [Number, String] as PropType<string | number>,
    required: false,
    default: 'auto',
  },
  menubar: {
    type: String,
    default: 'file edit insert view format table',
  },
  language: {
    type: String,
    default: 'zh_CN',
  },
  skin: {
    type: String,
    default: 'oxide',
  },
}

export default defineComponent({
  name: 'Tinymce',
  props,
  emits: ['init', 'change', 'update:modelValue'],
  setup(props, { emit }) {
    let mounted = false
    const fullscreen = ref(false)
    const elRef = ref<Nullable<HTMLElement>>(null)
    const editorRef = ref<Nullable<Editor>>(null)
    const tinymceId = computed(() => props.id)

    watch(
      () => props.modelValue,
      (val: string) => {
        setValue(unref(editorRef), val)
      },
    )

    watch(
      () => props.disabled,
      () => {
        setModeDisabled(unref(editorRef), props.disabled)
      },
    )

    onMounted(() => {
      load(unref(props.url), (err) => {
        if (err) {
          console.error(err.message)
          return
        }
        initTinymce()
      })

      nextTick(() => {
        mounted = true
      })
    })

    onActivated(() => {
      if (mounted) {
        initTinymce()
      }
    })

    onBeforeUnmount(() => {
      destroyTinymce()
    })

    onDeactivated(() => {
      destroyTinymce()
    })

    function destroyTinymce() {
      if (fullscreen.value) {
        tinymce.get(unref(tinymceId)).execCommand('mceFullScreen')
      }
      if (tinymce) {
        tinymce.get(unref(tinymceId)).destroy()
      }
    }

    const initOptions = computed(() => {
      const { height, toolbar, plugins, menubar, options } = props

      return {
        selector: `#${unref(tinymceId)}`,
        language: unref(props.language),
        skin: unref(props.skin),
        height,
        toolbar,
        menubar,
        plugins,
        branding: false,
        object_resizing: false,
        default_link_target: '_blank',
        link_title: false,
        nonbreaking_force_tab: true,
        ...options,
        init_instance_callback: (editor) => {
          editor.on('NodeChange Change KeyUp SetContent', () => {
            const content = editor.getContent()
            emit('update:modelValue', content)
            emit('change', content)
          })

          editor.on('WordCountUpdate', (e) => {
            console.log(e.wordCount)
          })
        },
        setup(editor) {
          editorRef.value = editor

          editor.on('FullscreenStateChanged', (e) => {
            fullscreen.value = e.state
          })
        },
        convert_urls: false,
      }
    })

    function initTinymce() {
      tinymce
        .init(unref(initOptions))
        .then((editor) => {
          setValue(unref(editorRef), props.modelValue)

          setModeDisabled(unref(editorRef), props.disabled)

          emit('init', editor)
        })
        .catch((err) => {
          console.error(err)
        })
    }

    function setValue(editor, val: string) {
      if (editor && val !== editor.getContent()) {
        editor.setContent(val)
      }
    }

    function setModeDisabled(editor, disabled = true) {
      if (!editor) return
      editor.mode.set(disabled ? 'readonly' : 'design')
    }

    const getContainerClass = computed(() => (fullscreen.value ? 'tinymce-container fullscreen' : `tinymce-container`))

    const getContainerStyle = computed((): CSSProperties => {
      const { width } = props
      let w = `${width}`
      if (isNumber(w)) {
        w = `${w}px`
      }
      return {
        width: w,
      }
    })

    return () => (
      <div class={getContainerClass.value} style={getContainerStyle.value}>
        <textarea id={tinymceId.value} ref={elRef}></textarea>
      </div>
    )
  },
})
