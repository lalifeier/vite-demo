import { Layout, LayoutContent, LayoutFooter } from '@/components/Layout'
import { breakpointType } from '@/components/Layout/src/LayoutSider'
import { useDesign } from '@/hooks/web/useDesign'
import { computed, defineComponent, ExtractPropTypes } from 'vue'
import Header from './Header'
import Sider from './Sider'
import { useProLayoutProvide } from './useProLayoutContext'

const proLayoutProps = {
  prefixCls: {
    type: String as PropType<string>,
    default: 'pro-layout'
  },
  collapsed: {
    type: Boolean,
    default: false
  },
  breakpoint: {
    type: String as PropType<breakpointType>,
    default: 'lg'
  },
  // side | top | mix
  layout: {
    type: String,
    default: 'side'
  },
  // Fluid | Fixed
  contentWidth: {
    type: String,
    default: 'Fluid'
  },
  siderWidth: {
    type: Number,
    default: 208
  },
  fixedHeader: {
    type: Boolean,
    default: true
  },
  fixedSider: {
    type: Boolean,
    default: true
  },
  // light | dark
  headerTheme: {
    type: String,
    default: 'dark'
  },
  siderTheme: {
    type: String,
    default: 'dark'
  }
}

export type ProLayoutProps = ExtractPropTypes<typeof proLayoutProps>

export default defineComponent({
  name: 'Layout',
  props: proLayoutProps,
  setup(props, { slots }) {
    const { prefixCls } = useDesign('pro-layout')

    useProLayoutProvide()

    const getClass = computed(() => {
      return [
        prefixCls,
        {
          [`${prefixCls}-fixed`]: props.fixedHeader || props.fixedSider,
          [`${prefixCls}--side`]: props.layout === 'side',
          [`${prefixCls}--top`]: props.layout === 'top',
          [`${prefixCls}--mix`]: props.layout === 'mix'
        }
      ]
    })

    const showSider = computed(() => ['side', 'mix'].includes(props.layout))

    return () => (
      <Layout class={getClass.value}>
        <Header></Header>
        {showSider.value && <Sider></Sider>}
        <LayoutContent class={`${prefixCls}-content`}>{slots.default?.()}</LayoutContent>
        {slots.footer && (
          <LayoutFooter class={`${prefixCls}-footer`}>{slots.footer()}</LayoutFooter>
        )}
      </Layout>
    )
  }
})
