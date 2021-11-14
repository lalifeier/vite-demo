import { LOCALE_TYPE } from '@/enums/app'
import { LANGUAGE_KEY } from '@/enums/cache'
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

export const setLanguage = (language: string) => _localStorage.set(LANGUAGE_KEY, language)

export const getLanguage = (messages = {}) => {
  const chooseLanguage = _localStorage.get(LANGUAGE_KEY)
  if (chooseLanguage) {
    return chooseLanguage
  }

  const language = (navigator.language || navigator.browserLanguage).toLowerCase()
  const locales = Object.keys(messages)
  for (const locale of locales) {
    if (language.indexOf(locale) > -1) {
      return locale
    }
  }
  return LOCALE_TYPE.ZH_CN
}

export const getMessage = async (locale: string) => {
  const defaultLocal = await import(`./lang/${locale}.ts`)
  return defaultLocal.default?.message ?? {}
}
