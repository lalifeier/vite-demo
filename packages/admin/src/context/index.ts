import { useLocaleContext, useLocaleProvide } from './modules/locale'
import { useThemContext, useThemeProvide } from './modules/theme'

export { useThemContext, useLocaleContext }

export const useProvider = () => {
  useLocaleProvide()

  useThemeProvide()
}
