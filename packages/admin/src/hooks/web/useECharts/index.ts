import { useAppSetting } from '@/hooks/setting/useAppSetting'
import { breakpointsTailwind } from '@vueuse/core'
import type { EChartsOption } from 'echarts'
import type { Ref } from 'vue'
import { computed, nextTick, ref, unref, watch, onActivated } from 'vue'
import echarts from './echarts'

export function useECharts(elRef: Ref<HTMLDivElement>, theme: 'light' | 'dark' | 'default' = 'default') {
  const { getDarkMode: getSysDarkMode } = useAppSetting()

  const getDarkMode = computed(() => {
    return theme === 'default' ? getSysDarkMode.value : theme
  })
  let chartInstance: echarts.ECharts | null = null
  let resizeFn: Fn = resize
  const cacheOptions = ref({}) as Ref<EChartsOption>

  resizeFn = useDebounceFn(resize, 200)

  const getOptions = computed(() => {
    if (getDarkMode.value !== 'dark') {
      return cacheOptions.value as EChartsOption
    }
    return {
      backgroundColor: 'transparent',
      ...cacheOptions.value,
    } as EChartsOption
  })

  function initCharts(t = theme) {
    const el = unref(elRef)
    if (!el || !unref(el)) {
      return
    }

    chartInstance = echarts.init(el, t)
    useEventListener(window, 'resize', resizeFn)
    const breakpoints = useBreakpoints(breakpointsTailwind)
    if (breakpoints.isSmaller('md') || el.offsetHeight === 0) {
      useTimeoutFn(() => {
        resizeFn()
      }, 30)
    }
  }

  function setOptions(options: EChartsOption, clear = true) {
    cacheOptions.value = options
    if (unref(elRef)?.offsetHeight === 0) {
      useTimeoutFn(() => {
        setOptions(unref(getOptions))
      }, 30)
      return
    }
    nextTick(() => {
      useTimeoutFn(() => {
        if (!chartInstance) {
          initCharts(getDarkMode.value as 'default')

          if (!chartInstance) return
        }
        clear && chartInstance?.clear()

        chartInstance?.setOption(unref(getOptions))
      }, 30)
    })
  }

  function resize() {
    chartInstance?.resize()
  }

  watch(
    () => getDarkMode.value,
    (theme) => {
      if (chartInstance) {
        chartInstance.dispose()
        initCharts(theme as 'default')
        setOptions(cacheOptions.value)
      }
    },
  )

  tryOnUnmounted(() => {
    if (!chartInstance) return
    chartInstance.dispose()
    chartInstance = null
  })

  onActivated(() => {
    resize()
  })

  function getInstance(): echarts.ECharts | null {
    if (!chartInstance) {
      initCharts(getDarkMode.value as 'default')
    }
    return chartInstance
  }

  return {
    setOptions,
    resize,
    echarts,
    getInstance,
  }
}
