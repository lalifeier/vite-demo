import { Layout, LayoutContent, LayoutFooter } from '@/components/Layout';
import { useDesign } from '@/hooks/web/useDesign';
import PropTypes from '@/utils/propTypes';
import { computed, defineComponent, ExtractPropTypes } from 'vue';
import { func, object } from 'vue-types';
import Header from './Header';
import Sider from './Sider';
import { BreakpointType, MenuClickOptions, ProLayoutContentMode, ProLayoutMode, ProLayoutTheme } from './types';
import { useProLayoutProvide } from './useProLayoutContext';

const proLayoutProps = {
  collapsed: PropTypes.bool,
  activeKey: PropTypes.oneOfType<string | number | symbol>([String, Number, Symbol]),
  mode: PropTypes.oneOfType<ProLayoutMode>([String]).def('sider'),
  contentMode: PropTypes.oneOfType<ProLayoutContentMode>([String]).def('fluid'),
  fixed: PropTypes.oneOfType([Boolean, object<{ header: boolean; sider: boolean }>()]).def(false),
  theme: PropTypes.oneOfType([
    PropTypes.oneOfType<ProLayoutTheme>([String]),
    object<{ header: ProLayoutTheme; sider: ProLayoutTheme }>(),
  ]).def('light'),
  breakpoint: PropTypes.oneOfType<BreakpointType>([String]),

  onCollapse: func<(collapsed: boolean) => void>(),
  onMenuClick: func<(options: MenuClickOptions) => void>(),
};

export type ProLayoutProps = ExtractPropTypes<typeof proLayoutProps>;

export default defineComponent({
  name: 'Layout',
  props: proLayoutProps,
  setup(props, { slots }) {
    const { prefixCls } = useDesign('pro-layout');

    useProLayoutProvide();

    const getClass = computed(() => {
      const { mode, fixed } = props;

      return [
        prefixCls,
        {
          [`${prefixCls}-fixed`]: fixed,
          [`${prefixCls}-is-${mode}`]: true,
        },
      ];
    });

    const showSider = computed(() => ['sider', 'mixin'].includes(props.mode));

    return () => (
      <Layout class={getClass.value}>
        <Header></Header>
        {showSider.value && <Sider></Sider>}
        <LayoutContent class={`${prefixCls}-content`}>{slots.default?.()}</LayoutContent>
        {slots.footer && <LayoutFooter class={`${prefixCls}-footer`}>{slots.footer()}</LayoutFooter>}
      </Layout>
    );
  },
});
