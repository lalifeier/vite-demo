import { createLoading } from '@/components/Loading';

const createInstance = (el, binding) => {
  const svg = el.getAttribute('loading-svg');
  const text = el.getAttribute('loading-text');
  const spinner = el.getAttribute('loading-spinner');
  const background = el.getAttribute('loading-background');
  const fullscreen = !!binding.modifiers.fullscreen;

  const target = fullscreen ? document.body : el;

  console.log(target);

  const instance = createLoading(
    {
      svg,
      text,
      spinner,
      background,
      absolute: !fullscreen,
      loading: !!binding.value,
    },
    target,
  );
  el.instance = instance;
};

export default {
  mounted(el, binding) {
    createInstance(el, binding);
  },
  updated(el, binding) {
    const instance = el.instance;
    if (!instance) return;
    if (binding.oldValue === binding.value) {
      return;
    }
    if (binding.value) {
      createInstance(el, binding);
    } else {
      instance.close();
    }
  },
  unmounted: function (el) {
    el?.instance?.close();
  },
};
