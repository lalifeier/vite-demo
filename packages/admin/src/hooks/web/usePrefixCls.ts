import { useAppProviderContext } from '@/components/Application'
import { CLASS_PREFIX } from '@/settings/design'

export function usePrefixCls(name: string): string {
  const vm = getCurrentInstance()!
  const appProvider = useAppProviderContext()

  const prefix = appProvider?.prefixCls ?? vm.props?.prefixCls ?? CLASS_PREFIX
  if (name) {
    return `${prefix}-${name}`
  }
  return prefix
}
