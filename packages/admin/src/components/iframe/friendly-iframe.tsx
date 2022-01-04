import { defineComponent } from 'vue'

const props = {
  src: {
    type: String,
    required: true
  }
}

export default defineComponent({
  name: 'FriendlyIframe',
  props,
  setup() {
    return () => <div></div>
  }
})
