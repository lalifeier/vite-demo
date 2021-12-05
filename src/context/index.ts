import { useI18nContext } from './modules/i18n'
import { useThemContext, useThemeProvide } from './modules/theme'

export { useThemContext, useI18nContext }

export const useProvider = () => {
  useThemeProvide()
}
