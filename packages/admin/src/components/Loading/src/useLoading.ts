import { unref } from 'vue'
import { createLoading } from './createLoading'

export function useLoading(options) {
  const { target = document.body, ...props } = options

  const instance = createLoading(props, undefined)

  const open = (): void => {
    const t = unref(target)
    if (!t) return
    instance.open(t)
  }

  const close = (): void => {
    instance.close()
  }

  return {
    instance,
    open,
    close,
  }
}
