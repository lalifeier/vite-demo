import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/lib/components'
import * as directives from 'vuetify/lib/directives'
import 'vuetify/lib/styles/main.sass'

export default createVuetify({
  components,
  directives

  // theme: {
  //   defaultTheme: 'myCustomLightTheme',
  //   themes: {
  //     dark: false,
  //     colors: {
  //       background: '#FFFFFF',
  //       surface: '#FFFFFF',
  //       primary: '#6200EE',
  //       error: '#B00020',
  //       info: '#2196F3',
  //       success: '#4CAF50',
  //       warning: '#FB8C00'
  //     }
  //   }
  // }
})
