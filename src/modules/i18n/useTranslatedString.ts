import { computed } from 'vue'
import { i18n } from './index'
import {
  type ITranslatedString,
  type ITranslatedStrings,
  ELanguages,
} from './i18n.interface'

/**
 * Returns a computed ref of the translated string for the current language.
 * @param translations An object mapping languages to their translations.
 */
export function useTranslatedString(translations: ITranslatedString | ITranslatedStrings) {
  return computed(() => {
    const lang = i18n.global.locale.value as ELanguages
    return translations[lang] || translations[ELanguages.en] || ''
  })
}
