import type { DirectiveBinding } from 'vue'

interface ClickOutsideElement extends HTMLElement {
  _clickOutside: any
}

export default {
  beforeMount: function (el: ClickOutsideElement, binding: DirectiveBinding) {
    const onClick = (event: MouseEvent) => {
      if (!el.contains(event.target as HTMLElement)) {
        binding.value(event)
      }
    }
    el._clickOutside = onClick
    document.addEventListener('click', onClick, true)
  },
  unmounted: function (el: ClickOutsideElement) {
    if (!el._clickOutside) return

    document.removeEventListener('click', el._clickOutside, true)
    delete el._clickOutside
  },
}
