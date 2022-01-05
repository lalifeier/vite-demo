// import echarts from '@/utils/lib/echarts'
// import {
//   breakpointsTailwind,
//   tryOnUnmounted,
//   useBreakpoints,
//   useDebounceFn,
//   useEventListener,
//   useTimeoutFn
// } from '@vueuse/core'
// import type { EChartsOption } from 'echarts'
// import { computed, nextTick, Ref, ref, unref } from 'vue'

// export function useECharts(
//   elRef: Ref<HTMLDivElement>,
//   theme: 'light' | 'dark' | 'default' = 'default'
// ) {
//   let chartInstance: echarts.ECharts | null = null
//   let resizeFn: Fn = resize
//   const cacheOptions = ref({}) as Ref<EChartsOption>

//   resizeFn = useDebounceFn(resize, 200)

//   const getOptions = computed(() => {
//     return {
//       backgroundColor: 'transparent',
//       ...cacheOptions.value
//     } as EChartsOption
//   })

//   function initCharts(t = theme) {
//     const el = unref(elRef)
//     if (!el || !unref(el)) {
//       return
//     }

//     chartInstance = echarts.init(el, t)

//     useEventListener(window, 'resize', resizeFn)
//     const breakpoints = useBreakpoints(breakpointsTailwind)

//     if (breakpoints.isGreater('sm') || el.offsetHeight === 0) {
//       useTimeoutFn(() => {
//         resizeFn()
//       }, 30)
//     }
//   }

//   function setOptions(options: EChartsOption, clear = true) {
//     cacheOptions.value = options

//     nextTick(() => {
//       useTimeoutFn(() => {
//         if (!chartInstance) {
//           initCharts()
//           if (!chartInstance) return
//         }
//         clear && chartInstance?.clear()

//         chartInstance?.setOption(unref(getOptions))
//       }, 30)
//     })
//   }

//   function resize() {
//     chartInstance?.resize()
//   }

//   // watch(
//   //   () => theme,
//   //   () => {
//   //     if (chartInstance) {
//   //       chartInstance.dispose();
//   //       initCharts();
//   //       setOptions(cacheOptions.value);
//   //     }
//   //   },
//   // );

//   tryOnUnmounted(() => {
//     if (!chartInstance) return
//     chartInstance.dispose()
//     chartInstance = null
//   })

//   function getInstance(): echarts.ECharts | null {
//     if (!chartInstance) {
//       initCharts()
//     }
//     return chartInstance
//   }

//   return {
//     setOptions,
//     resize,
//     echarts,
//     getInstance
//   }
// }
