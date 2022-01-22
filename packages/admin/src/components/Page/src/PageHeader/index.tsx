import { useDesign } from '@/hooks/web/useDesign'
import type { CSSProperties } from 'vue'
import { computed, defineComponent } from 'vue'
import './index.scss'

export default defineComponent({
  name: 'PageHeader',
  props: {
    title: {
      type: String,
      default: '基础表单',
    },
    subTitle: {
      type: String,
      default: '基础表单',
    },
    extra: {
      type: String,
      default: '基础表单',
    },
    content: {
      type: String,
      default: '表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。',
    },
    dense: {
      type: Boolean,
      default: true,
    },
  },
  setup(props, { slots }) {
    const { prefixCls } = useDesign('page-header')
    const headingPrefixCls = `${prefixCls}-heading`

    const title = props.title ?? slots.title?.()
    const subTitle = props.subTitle ?? slots.subTitle?.()
    const extra = props.extra ?? slots.extra?.()

    const getClass = computed(() => {
      return [
        prefixCls,
        {
          [`${prefixCls}--dense`]: props.dense,
        },
      ]
    })

    const getStyle = computed((): CSSProperties => {
      return {}
    })

    return () => {
      return (
        <div class={getClass.value} style={getStyle.value}>
          <div class={headingPrefixCls}>
            <div class={headingPrefixCls + '-left'}>
              <span class={headingPrefixCls + '-title'} title={typeof title === 'string' ? title : undefined}>
                {title}
              </span>
              <span class={headingPrefixCls + '-sub-title'} title={typeof subTitle === 'string' ? subTitle : undefined}>
                {subTitle}
              </span>
            </div>
            <div class={headingPrefixCls + '-extra'}>{extra}</div>
          </div>
          <div class={prefixCls + '-content'}>{props.content}</div>
        </div>
      )
    }
  },
})
