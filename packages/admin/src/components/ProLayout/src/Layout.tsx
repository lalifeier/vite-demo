import { Layout, LayoutContent, LayoutFooter } from '@/components/Layout'
import { usePrefixCls } from '@/hooks/web/usePrefixCls'
import PropTypes from '@/utils/propTypes'
import { computed, defineComponent, ExtractPropTypes } from 'vue'
import { func, object } from 'vue-types'
import { BreakpointType, ProLayoutContentMode, ProLayoutMode, ProLayoutTheme } from '../types'
import Header from './Header'
import Sider from './Sider'
import { useProLayoutProvide } from './useProLayoutContext'

const proLayoutProps = {
  collapsed: PropTypes.bool.def(false),
  activeKey: PropTypes.oneOfType<string | number | symbol>([String, Number, Symbol]),
  mode: PropTypes.oneOfType<ProLayoutMode>([String]).def('sider'),
  contentMode: PropTypes.oneOfType<ProLayoutContentMode>([String]).def('fluid'),
  fixed: PropTypes.oneOfType([Boolean, object<{ header: boolean; sider: boolean }>()]).def(false),
  theme: PropTypes.oneOfType([
    PropTypes.oneOfType<ProLayoutTheme>([String]),
    object<{ header: ProLayoutTheme; sider: ProLayoutTheme }>(),
  ]).def('light'),
  breakpoint: PropTypes.oneOfType<BreakpointType>([String]),

  'onUpdate:collapsed': func<(collapsed: boolean) => void>(),
  onCollapse: func<(collapsed: boolean) => void>(),
  // onMenuClick: func<(options: MenuClickOptions) => void>(),
}

export type ProLayoutProps = ExtractPropTypes<typeof proLayoutProps>

export default defineComponent({
  name: 'Layout',
  props: proLayoutProps,
  setup(props, { slots }) {
    const prefixCls = usePrefixCls('pro-layout')

    useProLayoutProvide()

    const getClass = computed(() => {
      const { mode, fixed } = props

      return [
        prefixCls,
        {
          [`${prefixCls}-fixed`]: fixed,
          [`${prefixCls}-is-${mode}`]: true,
        },
      ]
    })

    const showSider = computed(() => ['sider', 'mixin'].includes(props.mode))

    return () => (
      <Layout class={getClass.value}>
        <Header></Header>
        {showSider.value && <Sider></Sider>}
        <LayoutContent class={`${prefixCls}-content`}>{slots.default?.()}</LayoutContent>
        {slots.footer && <LayoutFooter class={`${prefixCls}-footer`}>{slots.footer()}</LayoutFooter>}
      </Layout>
    )
  },
})
