import { on, once } from '@/utils/dom'
import type { Directive, DirectiveBinding } from 'vue'

const repeat: Directive = {
  beforeMount: function (el: Element, binding: DirectiveBinding) {
    let interval: Nullable<IntervalHandle> = null
    let startTime = 0
    const handler = (): void => binding?.value()
    const clear = (): void => {
      if (Date.now() - startTime < 100) {
        handler()
      }
      interval && clearInterval(interval)
      interval = null
    }

    on(el, 'mousedown', (e: Event): void => {
      if ((e as any).button !== 0) return
      startTime = Date.now()
      once(document as any, 'mouseup', clear)
      interval && clearInterval(interval)
      interval = setInterval(handler, 100)
    })
  }
}

export default repeat
