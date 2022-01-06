import { useECharts } from '@/hooks/web/useECharts';
import type { EChartsOption } from 'echarts';
import { computed, CSSProperties, defineComponent, ref, Ref, unref, watchEffect } from 'vue';

const props = {
  width: {
    type: String as PropType<string>,
    default: '100%',
  },
  height: {
    type: String as PropType<string>,
    default: '280px',
  },
  options: {
    type: Object as PropType<EChartsOption | null>,
    default: null,
  },
};

export default defineComponent({
  name: 'Chart',
  props,
  setup(props) {
    const chartRef = ref<HTMLDivElement | null>(null);
    const { setOptions } = useECharts(chartRef as Ref<HTMLDivElement>);

    const getWrapStyle = computed((): CSSProperties => {
      return {
        width: props.width,
        height: props.height,
      };
    });

    watchEffect(() => {
      if (props.options) {
        setOptions(props.options);
      }
    });

    return () => <div ref={chartRef} style={unref(getWrapStyle)}></div>;
  },
});
