import { useDesign } from '@/hooks/web/useDesign';
import type { CSSProperties } from 'vue';
import { computed, defineComponent } from 'vue';
import PageFooter from '../PageFooter';
import PageHeader from '../PageHeader';
import './index.scss';

export default defineComponent({
  name: 'PageContainer',
  props: {},
  setup(props, { slots }) {
    const { prefixCls } = useDesign('page-container');

    const getStyle = computed((): CSSProperties => {
      return {};
    });
    return (
      <div class={prefixCls} style={getStyle.value}>
        <PageHeader></PageHeader>
        <div class={prefixCls + '-container'}>{slots.default?.()}</div>
        <PageFooter></PageFooter>
      </div>
    );
  },
});
