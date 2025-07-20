import { createI18n } from 'vue-i18n'
import ENLangFile from '@/assets/lang/en/index.json'
import FRLangFile from '@/assets/lang/fr/index.json'

export default createI18n({
  legacy: false,
  globalInjection: true,
  locale: 'en',
  messages: {
    en: ENLangFile,
    fr: FRLangFile
  }
})
