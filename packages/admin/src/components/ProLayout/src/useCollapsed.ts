import { useControlledProp } from '@/hooks/core/useControlledProp';
import { callEmit } from '@/utils/props';
import { breakpointsTailwind } from '@vueuse/core';
import { watch } from 'vue';
import { ProLayoutProps } from './Layout';

export function useCollapsed(props: ProLayoutProps) {
  const [collapsed, _setCollapsed] = useControlledProp(props, 'collapsed', false);

  const setCollapsed = (collapsed: boolean) => {
    _setCollapsed(collapsed);
    callEmit(props.onCollapse, collapsed);
  };

  // let stopBreakpoints: WatchStopHandle | undefined
  // watch(
  //   () => props.breakpoint, breakpoint => {
  //     stopBreakpoints?.()

  //     // if (breakpoint) {
  //       const useSharedBreakpoints = createSharedComposable(useBreakpoints)
  //       stopBreakpoints = watchEffect(() => {
  //         console.log(useSharedBreakpoints, props.breakpoint);

  //         console.log();

  //       })
  //     // }
  //   },
  //   { immediate: true },
  // )

  const breakpoints = useBreakpoints(breakpointsTailwind);
  const breakpointRef = breakpoints.smaller('sm');
  watch(
    breakpointRef,
    (value) => {
      setCollapsed(value);
    },
    { immediate: true },
  );

  return { collapsed, setCollapsed };
}
