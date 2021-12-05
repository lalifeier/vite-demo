import { i18n } from '@/locales'
import { getMessage, setHtmlPageLang, setLanguage } from '@/locales/utils'
import { inject, provide, Ref, unref, watch } from 'vue'

type I18nContext = {
  locale: Ref<string>
  setLocale: (value: string) => void
}

const I18nSymbol = Symbol()

async function setI18nLanguage(locale) {
  const message = await getMessage(locale)
  const globalI18n = i18n.global
  if (i18n.mode === 'legacy') {
    globalI18n.locale = locale
  } else {
    ;(globalI18n.locale as any).value = locale
  }

  globalI18n.setLocaleMessage(locale, message)
  setHtmlPageLang(locale)

  setLanguage(locale)
}

export const useI18nProvide = (locale: Ref<string>) => {
  const setLocale = (value: string) => (locale.value = value)

  watch(
    locale,
    (value) => {
      if (value === unref(i18n.global.locale)) {
        return
      }

      setI18nLanguage(value)
    },
    { immediate: true }
  )

  provide(I18nSymbol, {
    locale,
    setLocale
  })
}

export const useI18nContext = () => {
  const context = inject<I18nContext>(I18nSymbol)
  if (!context) {
    throw new Error(`useI18nContext must be used after useI18nProvide`)
  }
  return context
}
