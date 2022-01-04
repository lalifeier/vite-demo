import { callEmit } from '@/utils/props'
import { isFunction } from 'lodash-es'
import type { ComputedRef, Ref } from 'vue'
import { computed, ref, toRaw, watch } from 'vue'

export function useControlledProp<T, K extends keyof T>(
  props: T,
  key: K
): [ComputedRef<T[K]>, (value: T[K]) => void]
export function useControlledProp<T, K extends keyof T>(
  props: T,
  key: K,
  defaultOrFactory: T[K] | (() => T[K])
): [ComputedRef<Exclude<T[K], undefined>>, (value: Exclude<T[K], undefined>) => void]
export function useControlledProp<T, K extends keyof T>(
  props: T,
  key: K,
  defaultOrFactory?: T[K] | (() => T[K])
): [ComputedRef<T[K]>, (value: T[K]) => void] {
  const tempProp = ref(props[key]) as Ref<T[K]>

  watch(
    () => props[key],
    (value) => (tempProp.value = value)
  )

  const state = computed(
    () =>
      props[key] ??
      tempProp.value ??
      (isFunction(defaultOrFactory) ? defaultOrFactory() : defaultOrFactory)!
  )

  const setState = (value: T[K]) => {
    if (value !== toRaw(state.value)) {
      tempProp.value = value
      callEmit((props as any)[`onUpdate:${key}`], value)
    }
  }

  return [state, setState]
}
