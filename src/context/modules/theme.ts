import { inject, provide, Ref, ref } from "vue"

type ThemeContext = {
  theme: Ref<String>
  setTheme: (value: String) => void
}

const ThemeSymbol = Symbol()

export const useThemeProvide = () => {
  const theme = ref<String>('')
  const setTheme = (value: String) => (theme.value = value)

  provide(ThemeSymbol, {
    theme,
    setTheme
  })
}

export const useThemContext = () => {
  const context = inject<ThemeContext>(ThemeSymbol)
  if (!context) {
    throw new Error(`useThemeInject must be used after useThemeProvide`)
  }
  return context
}
