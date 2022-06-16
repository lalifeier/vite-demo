import app from '@/settings/app'
import { DARK_THEME, LIGHT_THEME } from '@/settings/design'
// import '@mdi/font/css/materialdesignicons.css';
import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components';
// import * as directives from 'vuetify/directives';
// import { aliases, mdi } from 'vuetify/lib/iconsets/mdi';
import 'vuetify/styles'

export default createVuetify({
  // components,
  // directives,

  // icons: {
  //   defaultSet: 'mdi',
  //   aliases,
  //   sets: {
  //     mdi,
  //   },
  // },
  theme: {
    defaultTheme: app.darkMode,
    themes: {
      light: LIGHT_THEME,
      dark: DARK_THEME,
    },
  },
})
