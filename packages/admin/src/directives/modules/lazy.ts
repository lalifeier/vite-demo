import Lazy from '@/utils/dom/lazy/index';
import type { DirectiveBinding } from 'vue';

const lazy = new Lazy();

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<any>) {
    lazy.add(el, binding.value);
  },
  update(el: HTMLElement, binding: DirectiveBinding<any>) {
    lazy.update(el, binding.value);
  },
  unmounted(el: HTMLElement) {
    lazy.remove(el);
  },
};
