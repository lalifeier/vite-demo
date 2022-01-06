import { useSidebarSetting } from '@/hooks/setting/useSidebarSetting';
import { useDesign } from '@/hooks/web/useDesign';
import { getSlot } from '@/utils/helper/tsxHelper';
import type { CSSProperties } from 'vue';
import { computed, defineComponent, unref } from 'vue';
import './index.scss';

export default defineComponent({
  name: 'PageFooter',
  inheritAttrs: false,
  setup(props, { slots }) {
    const { prefixCls } = useDesign('page-footer');

    const { getCalcContentWidth } = useSidebarSetting();

    const getStyle = computed((): CSSProperties => {
      return {
        width: unref(getCalcContentWidth),
      };
    });
    return () => {
      return (
        <div class={prefixCls} style={getStyle.value}>
          <div class={prefixCls + '__left'}> {getSlot(slots, 'left')}</div>
          {getSlot(slots)}
          <div class={prefixCls + '__right'}> {getSlot(slots, 'right')}</div>
        </div>
      );
    };
  },
});
