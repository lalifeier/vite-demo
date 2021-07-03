import type { DirectiveBinding } from 'vue'

export default {
  beforeMount: function (_el: Element, binding: DirectiveBinding) {
    console.log(`${binding.value} = ${Date.now() - window.performance.timing.navigationStart}`)
  },
}
