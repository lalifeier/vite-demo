import type { ComputedRef } from 'vue';
import { computed, getCurrentInstance } from 'vue';

export const useProp = <T>(name: string): ComputedRef<T | undefined> => {
  const vm = getCurrentInstance()!;
  return computed(() => vm.proxy?.$props[name] ?? undefined);
};
