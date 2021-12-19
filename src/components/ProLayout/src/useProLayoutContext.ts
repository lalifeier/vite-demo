import { ComputedRef, getCurrentInstance, inject, InjectionKey, provide, Slots } from 'vue'
import { ProLayoutProps } from './Layout'
import { useCollapsed } from './useCollapsed'

export interface ProLayoutContext {
  props: ProLayoutProps
  slots: Slots
  collapsed: ComputedRef<boolean>
  setCollapsed: (collapsed: boolean) => void
}

export const proLayoutContextKey: InjectionKey<ProLayoutContext> = Symbol('proLayoutContextKey')

export const useProLayoutProvide = () => {
  const vm = getCurrentInstance()!
  const { props, slots } = vm

  const { collapsed, setCollapsed } = useCollapsed(props)

  provide(proLayoutContextKey, {
    props,
    slots,
    collapsed,
    setCollapsed
  })
}

export const useProLayoutContext = () => {
  const context = inject<ProLayoutContext>(proLayoutContextKey)
  if (!context) {
    throw new Error(`useProLayoutContext must be used after useProLayoutProvide`)
  }
  return context
}
