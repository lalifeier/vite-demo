import { LocaleType } from '#/config'
import { LOCALE_KEY } from '@/enums/cache'
import { LOCALE } from '@/settings/locale'
import { _localStorage } from '@/utils/cache'
import { set } from 'lodash-es'

export function setHtmlPageLang(locale) {
  document.querySelector('html')?.setAttribute('lang', locale)
}

export function getLangMessage(langs: Record<string, Record<string, any>>, prefix = 'lang') {
  const obj: Recordable = {}

  Object.keys(langs).forEach((key) => {
    const langFileModule = langs[key].default
    let fileName = key.replace(`./${prefix}/`, '').replace(/^\.\//, '')
    const lastIndex = fileName.lastIndexOf('.')
    fileName = fileName.substring(0, lastIndex)
    const keyList = fileName.split('/')
    const moduleName = keyList.shift()
    const objKey = keyList.join('.')

    if (moduleName) {
      if (objKey) {
        set(obj, moduleName, obj[moduleName] || {})
        set(obj[moduleName], objKey, langFileModule)
      } else {
        set(obj, moduleName, langFileModule || {})
      }
    }
  })
  return obj
}

// export const getLanguage = (messages = {}) => {
//   const chooseLanguage = _localStorage.get(LOCALE_KEY)
//   if (chooseLanguage) {
//     return chooseLanguage
//   }

//   const language = (navigator.language || navigator.browserLanguage).toLowerCase()
//   const locales = Object.keys(messages)
//   for (const locale of locales) {
//     if (language.indexOf(locale) > -1) {
//       return locale
//     }
//   }
//   return LOCALE_TYPE.ZH_CN
// }

export const getLanguage = (): LocaleType => _localStorage.get(LOCALE_KEY) || LOCALE.ZH_CN

export const setLanguage = (locale: LocaleType) => _localStorage.set(LOCALE_KEY, locale)
interface LangModule {
  message: Recordable
  dateLocale: Recordable
  dateLocaleName: string
}

export const getMessage = async (locale: LocaleType) => {
  const langModule = ((await import(`./lang/${locale}.ts`)) as any).default as LangModule
  return langModule?.message ?? {}
}
