import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/lib/components'
import * as directives from 'vuetify/lib/directives'
import { aliases, mdi } from 'vuetify/lib/iconsets/mdi'
import 'vuetify/lib/styles/main.sass'
import config from '/@/configs'

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
    defaultTheme: config.theme.globalTheme,
    themes: {
      light: config.theme.light,
      dark: config.theme.dark
    }
  }
})
