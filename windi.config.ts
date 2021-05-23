import colors from 'windicss/colors'
import { defineConfig } from 'windicss/helpers'
import lineClamp from 'windicss/plugin/line-clamp'
import typography from 'windicss/plugin/typography'

export default defineConfig({
  extract: {
    include: ['index.html', 'src/**/*.{vue,html,jsx,tsx}'],
    exclude: ['node_modules/**/*'],
  },
  safelist: [],
  darkMode: 'class',
  plugins: [typography, lineClamp],
  theme: {
    extend: {
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
      colors: {
        ...colors,
      },
    },
  },
})
