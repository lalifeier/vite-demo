import { LocaleType } from '#/config'
import { i18n, loadLocalePool, setI18nLanguage } from '@/locales'
import { getLanguage, getMessage } from '@/locales/utils'
import { isEmpty } from '@/utils/is'
import {
  computed,
  ComputedRef,
  ExtractPropTypes,
  getCurrentInstance,
  inject,
  InjectionKey,
  provide,
  ref,
  unref,
  watch
} from 'vue'

type LocaleContext = {
  getLocale: ComputedRef<LocaleType>
  setLocale: (value: LocaleType) => void
}

const localeProps = {
  locale: {
    type: String as PropType<LocaleType>
  }
}

export type LocaleProps = ExtractPropTypes<typeof localeProps>

export const localeContextKey: InjectionKey<LocaleContext> = Symbol('localeContextKey')

export const useLocaleProvide = () => {
  const vm = getCurrentInstance()!
  const props = vm.props as LocaleProps

  const locale = computed(() => props.locale || getLanguage())

  const getLocale: ComputedRef<LocaleType> = computed(() => localeRef.value)

  const localeRef = ref()

  watch(
    () => locale.value,
    (value) => {
      localeRef.value = value
    },
    {
      immediate: true
    }
  )

  const setLocale = (value: LocaleType) => (localeRef.value = value)

  watch(
    () => localeRef.value,
    async (locale: LocaleType) => {
      const globalI18n = i18n.global
      const currentLocale = unref(globalI18n.locale)
      if (currentLocale === locale) {
        return
      }

      if (loadLocalePool.includes(locale)) {
        setI18nLanguage(locale)
        return
      }

      const message = await getMessage(locale)
      if (isEmpty(message)) {
        return
      }

      globalI18n.setLocaleMessage(locale, message)
      loadLocalePool.push(locale)

      setI18nLanguage(locale)
    },
    { immediate: true }
  )

  provide(localeContextKey, {
    getLocale,
    setLocale
  })
}

export const useLocaleContext = () => {
  const context = inject<LocaleContext>(localeContextKey)
  if (!context) {
    throw new Error(`useLocaleContext must be used after useLocaleProvide`)
  }
  return context
}
