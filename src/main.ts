import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import { i18n } from './modules/i18n'

import App from './App.vue'
import router from './router'
import PrimeVue from 'primevue/config'
import '@primeuix/themes/aura'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.use(PrimeVue)

app.mount('#app')
