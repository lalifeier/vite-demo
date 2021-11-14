import { prefixCls, themeMode } from '@/configs/design'
import { useI18nProvide } from '@/context/modules/i18n'
import { getLanguage } from '@/locales/utils'
import { breakpointsTailwind, useBreakpoints } from '@vueuse/core'
import { defineComponent, ref, toRefs, watch } from 'vue'
import { createAppProviderContext } from './useAppContext'

const props = {
  prefixCls: {
    type: String,
    default: prefixCls
  },
  locale: {
    type: String,
    default: getLanguage()
  },
  theme: {
    type: String,
    default: themeMode
  }
}

export default defineComponent({
  name: 'AppProvider',
  inheritAttrs: false,
  props,
  setup(props, { slots }) {
    const { prefixCls } = toRefs(props)

    const isMobile = ref(false)
    const breakpoints = useBreakpoints(breakpointsTailwind)
    const isSmallerSm = breakpoints.smaller('sm')
    watch(
      isSmallerSm,
      (value) => {
        isMobile.value = value
      },
      {
        immediate: true
      }
    )

    const locale = ref(props.locale)
    watch(
      () => props.locale,
      () => {
        locale.value = props.locale
      }
    )

    useI18nProvide(locale)

    createAppProviderContext({ prefixCls, isMobile })

    return () => slots.default?.()
  }
})
