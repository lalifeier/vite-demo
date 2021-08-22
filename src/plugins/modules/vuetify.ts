import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/lib/components'
import * as directives from 'vuetify/lib/directives'
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi'
import 'vuetify/lib/styles/main.sass'
import app from '/@/configs/app'
import { DARK_THEME, LIGHT_THEME } from '/@/configs/design'

export default createVuetify({
  components,
  directives,

  icons: {
    defaultSet: 'mdi',
    aliases,
    sets: {
      mdi
    }
  },
  theme: {
    defaultTheme: app.theme.themeMode,
    themes: {
      light: LIGHT_THEME,
      dark: DARK_THEME
    }
  }
})
