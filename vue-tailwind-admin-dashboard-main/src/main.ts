import './assets/main.css'
// Import Swiper styles
import 'swiper/css'
import 'swiper/css/navigation'
import 'swiper/css/pagination'
import 'jsvectormap/dist/jsvectormap.css'
import 'flatpickr/dist/flatpickr.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import VueApexCharts from 'vue3-apexcharts'

import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'
import { definePreset } from '@primeuix/themes'
import { applyThemeToDocument, getInitialTheme } from './utils/theme'
import { initChatbase } from './services/chatbase'

// SGFM color preset — sky/indigo primary so it matches the landing accents
const SGFMPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50: '#f0f9ff',
      100: '#e0f2fe',
      200: '#bae6fd',
      300: '#7dd3fc',
      400: '#38bdf8',
      500: '#0ea5e9',
      600: '#0284c7',
      700: '#0369a1',
      800: '#075985',
      900: '#0c4a6e',
      950: '#082f49',
    },
  },
})

const app = createApp(App)

// Apply theme as early as possible to keep dark/light consistent across all routes (landing/auth/dashboard)
applyThemeToDocument(getInitialTheme())

// Global Chatbase embed (all pages)
initChatbase()

app.use(router)
app.use(VueApexCharts)
app.use(PrimeVue, {
  theme: {
    preset: SGFMPreset,
    options: {
      darkModeSelector: '.dark',
      cssLayer: false,
    },
  },
})

app.mount('#app')
