import { parseExcel } from '@/utils/excel'
import { defineComponent, ref, unref } from 'vue'

const props = {
  beforeUpload: {
    type: Function,
  },
}

export default defineComponent({
  name: 'ImportExcel',
  props,
  emits: ['onSuccess', 'onError'],
  setup(props, { slots, emit }) {
    const el = ref<HTMLInputElement | null>(null)

    async function upload(file: File) {
      const inputEl = unref(el)
      if (inputEl) {
        inputEl.value = ''
      }

      const { beforeUpload } = props
      if (beforeUpload && !beforeUpload(file)) {
        return
      }

      try {
        const data = await parseExcel(file)
        emit('onSuccess', data)
      } catch (err) {
        emit('onError', err)
      }
    }

    function handleInputChange(e: Event) {
      const files = (e.target as HTMLInputElement).files
      const file = files?.[0]
      if (!file) {
        return
      }
      upload(file)
    }

    function handleUpload() {
      const inputEl = unref(el)
      inputEl && inputEl.click()
    }

    return () => (
      <div>
        <input v-show={false} ref={el} type="file" accept=".xlsx, .xls" onChange={handleInputChange} />
        <div onClick={handleUpload}>{slots.default?.()}</div>
      </div>
    )
  },
})
