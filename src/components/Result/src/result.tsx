import { useDesign } from '@/hooks/web/useDesign'
import { defineComponent } from 'vue'

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
    const { prefixCls } = useDesign('result')

    const renderIcon = () => (
      <div class={prefixCls + '__icon'}>{slots.icon ? slots.icon() : <img src={props.icon} />}</div>
    )

    const renderTitle = () => (
      <div class={prefixCls + '__title'}>{slots.title ? slots.title() : props.title}</div>
    )

    const renderSubTitle = () => (
      <div class={prefixCls + '__subtitle'}>
        {slots.subTitle ? slots.subTitle() : props.subTitle}
      </div>
    )

    const renderExtra = () => (
      <div class={prefixCls + '__extra'}>{slots.extra ? slots.extra() : props.title}</div>
    )

    return () => (
      <div class={prefixCls}>
        {renderIcon()}
        {renderTitle()}
        {renderSubTitle()}
        {renderExtra()}
      </div>
    )
  }
})
