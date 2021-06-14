import type { DirectiveBinding } from 'vue'
import Lazy from '/@/utils/dom/lazy/index'

const lazy = new Lazy()

export default {
  mounted(el: HTMLElement, binding: DirectiveBinding<any>) {
    console.log('mounted lazy')

    lazy.add(el, binding.value)
  },
  update(el: HTMLElement, binding: DirectiveBinding<any>) {
    console.log('update lazy')

    lazy.update(el, binding.value)
  },
  unmounted(el: HTMLElement) {
    console.log('unmounted lazy')

    lazy.remove(el)
  },
}
