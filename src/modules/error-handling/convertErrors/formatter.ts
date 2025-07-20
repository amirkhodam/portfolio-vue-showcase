import type { ErrorConversionOptions, ErrorFormatter, ErrorTranslator } from './interfaces'

export class DefaultErrorFormatter implements ErrorFormatter {
  constructor(private translator: ErrorTranslator) {}

  format(key: string, value: string, options?: ErrorConversionOptions): string {
    return options?.inline
      ? this.translator.translate(value, options)
      : `${this.translator.translate(key, options)} : ${this.translator.translate(value, options)}`
  }
}
