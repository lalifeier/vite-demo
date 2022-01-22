import { isFunction } from 'lodash-es'
import type { ComputedRef } from 'vue'
import { computed, ref, shallowRef, toRaw } from 'vue'

export function useState<T>(defaultOrFactory: T | (() => T), shallow = true): [ComputedRef<T>, (value: T) => void] {
  const defaultValue = isFunction(defaultOrFactory) ? defaultOrFactory() : defaultOrFactory

  const state = shallow ? shallowRef(defaultValue) : ref(defaultValue)

  const setState = (value: T) => {
    if (value !== toRaw(state.value)) {
      state.value = value
    }
  }

  return [computed(() => state.value) as ComputedRef<T>, setState]
}
