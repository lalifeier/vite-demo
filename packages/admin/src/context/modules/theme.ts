import { inject, provide, Ref, ref } from 'vue'

interface ThemeContext {
  theme: Ref<string>
  setTheme: (value: string) => void
}

const ThemeSymbol = Symbol()

export const useThemeProvide = () => {
  const theme = ref<string>('')
  const setTheme = (value: string) => (theme.value = value)

  provide(ThemeSymbol, {
    theme,
    setTheme,
  })
}

export const useThemContext = () => {
  const context = inject<ThemeContext>(ThemeSymbol)
  if (!context) {
    throw new Error(`useThemeInject must be used after useThemeProvide`)
  }
  return context
}
