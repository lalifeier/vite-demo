import { defineComponent } from 'vue'
import './index.scss'

const props = {
  title: {
    type: String,
    default: ''
  },
  subTitle: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  }
}

export default defineComponent({
  name: 'Result',
  props,
  setup(props, { slots }) {
    return () => (
      <div class="result">
        <div class="result-icon result-image">
          <img src={props.icon} />
        </div>
        <div class="result-title">{props.title}</div>
        <div class="result-subtitle">{props.subTitle}</div>
        <div class="result-extra">{slots.default?.()}</div>
      </div>
    )
  }
})
