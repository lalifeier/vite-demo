import { LocaleType } from '#/config'
import { localeSetting } from '@/settings/locale'
import { App } from 'vue'
import type { I18n, I18nOptions } from 'vue-i18n'
import { createI18n } from 'vue-i18n'
import { getMessage, setHtmlPageLang, setLanguage } from './utils'

const { locale, fallback, availableLocales } = localeSetting

export const loadLocalePool: LocaleType[] = []

export async function setI18nLanguage(locale) {
  const globalI18n = i18n.global
  if (i18n.mode === 'legacy') {
    globalI18n.locale = locale
  } else {
    ;(globalI18n.locale as any).value = locale
  }

  setHtmlPageLang(locale)
  setLanguage(locale)
}

async function createI18nOptions(): Promise<I18nOptions> {
  const message = await getMessage(locale)

  setHtmlPageLang(locale)
  loadLocalePool.push(locale)

  return {
    legacy: false,
    locale,
    fallbackLocale: fallback,
    availableLocales: availableLocales,
    messages: {
      [locale]: message,
    },
    sync: true,
    silentTranslationWarn: true,
    missingWarn: false,
    silentFallbackWarn: true,
  }
}

export let i18n: ReturnType<typeof createI18n>

export async function setupI18n(app: App) {
  const options = await createI18nOptions()
  i18n = createI18n(options) as I18n
  app.use(i18n)
}
