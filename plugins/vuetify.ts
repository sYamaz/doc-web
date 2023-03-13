import { createVuetify, ThemeDefinition } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import { md3 } from 'vuetify/blueprints'
import { aliases, mdi } from 'vuetify/iconsets/mdi'

export default defineNuxtPlugin((nuxtApp) => {
//   const dark: ThemeDefinition = {
//     dark: true,
//     colors: {
//       primary: '#1976d2',
//       accent: '#37474f',
//       secondary: '#ff8f00',
//       info: '#26a69a',
//       warning: '#ffc107',
//       error: '#dd2c00',
//       success: '#00e676'
//     }
//   }

  const light: ThemeDefinition = {
    dark: false,
    colors: {
      background: '#FFFFFF',
      surface: '#FFFFFF',
      primary: '#6200EE',
      'primary-darken-1': '#3700B3',
      secondary: '#03DAC6',
      'secondary-darken-1': '#018786',
      error: '#B00020',
      info: '#2196F3',
      success: '#4CAF50',
      warning: '#FB8C00'
    }
  }
  const vuetify = createVuetify({
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
      defaultTheme: 'dark',
      themes: {
        // dark,
        light
      }
    },
    blueprint: md3
  })

  nuxtApp.vueApp.use(vuetify)
})
