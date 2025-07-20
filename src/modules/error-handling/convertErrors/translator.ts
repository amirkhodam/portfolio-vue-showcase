import { i18n } from '@/modules/i18n'
import type { ErrorTranslator } from './interfaces'
import type { ErrorHandlingMessageOptions } from '@/utils/error-handling/ErrorHandlingService'

export class I18nErrorTranslator implements ErrorTranslator {
  private readonly prefix = 'general.message.error'
  translate(message: string, options?: ErrorHandlingMessageOptions): string {
    const translation = i18n.global.t(message)
    const translationErrors = i18n.global.t(`${options?.prefix || this.prefix}.${message}`)
    const translationDefault = options?.default ? i18n.global.t(options?.default) : ''

    return translation !== message
      ? translation
      : translationErrors !== `${options?.prefix || this.prefix}.${message}`
        ? translationErrors
        : translationDefault && translationDefault !== options?.default
          ? translationDefault
          : translation
  }
}
