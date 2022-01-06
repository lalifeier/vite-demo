import { computed, CSSProperties, defineComponent } from 'vue';

const props = {
  loading: {
    type: Boolean,
    default: false,
  },
  absolute: {
    type: Boolean,
    default: false,
  },
  spinner: {
    type: String,
    default: '',
  },
  svg: {
    type: String,
    default: '',
  },
  text: {
    type: String,
    default: '',
  },
  background: {
    type: String,
    default: '',
  },
};

export default defineComponent({
  name: 'Loading',
  props,
  setup(props) {
    const getSpinner = computed(() => {
      const { spinner, svg } = props;
      if (spinner) {
        return <i class={spinner}></i>;
      }
      if (svg) {
        return svg;
      }
      return (
        <div class="loading-spin">
          <span class="spin-dot spin-dot-spin">
            <i></i>
            <i></i>
            <i></i>
            <i></i>
          </span>
        </div>
      );
    });

    const getStyle = computed((): CSSProperties => {
      return {
        display: props.loading ? '' : 'none',
        backgroundColor: props.background || '',
      };
    });

    const getClass = computed(() => {
      return props.absolute ? 'full-loading absolute' : 'full-loading';
    });

    return () => (
      <div class={getClass.value} style={getStyle.value}>
        <div class="loading-container">
          {getSpinner.value}
          <div class="loading-text">{props.text}</div>
        </div>
      </div>
    );
  },
});
