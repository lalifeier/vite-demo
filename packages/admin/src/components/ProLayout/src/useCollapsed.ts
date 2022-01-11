import { useControlledProp } from '@/hooks/core/useControlledProp';
import { callEmit } from '@/utils/props';
import { breakpointsTailwind } from '@vueuse/core';
import { watch, WatchStopHandle } from 'vue';
import { ProLayoutProps } from './Layout';

export function useCollapsed(props: ProLayoutProps) {
  const [collapsed, _setCollapsed] = useControlledProp(props, 'collapsed', false);

  const setCollapsed = (collapsed: boolean) => {
    _setCollapsed(collapsed);
    callEmit(props.onCollapse, collapsed);
  };

  let stopBreakpoints: WatchStopHandle | undefined;
  watch(
    () => props.breakpoint,
    (breakpoint) => {
      stopBreakpoints?.();

      if (breakpoint) {
        const breakpoints = useBreakpoints(breakpointsTailwind);

        stopBreakpoints = watchEffect(() => {
          setCollapsed(!unref(breakpoints[breakpoint]));
        });
      }
    },
    { immediate: true },
  );

  return { collapsed, setCollapsed };
}
