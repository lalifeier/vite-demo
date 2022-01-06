import { inject, InjectionKey, provide, reactive, readonly as defineReadonly, UnwrapRef } from 'vue';

type ShallowUnwrap<T> = {
  [P in keyof T]: UnwrapRef<T[P]>;
};

export function createContext<T>(context: any, key: InjectionKey<T> = Symbol(), readonly = true) {
  const state = reactive({ ...context });
  const provideData = readonly ? defineReadonly(state) : state;
  provide(key, provideData);
}

export function useContext<T>(key: InjectionKey<T> = Symbol(), defaultValue?: any): ShallowUnwrap<T> {
  return inject(key, defaultValue || {});
}
