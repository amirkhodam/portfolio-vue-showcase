import type { ErrorHandlingMessageOptions } from '@/utils/error-handling/ErrorHandlingService'

export type ErrorConversionOptions = {
  inline?: boolean
} & ErrorHandlingMessageOptions

export interface ErrorTranslator {
  translate(message: string, options?: ErrorHandlingMessageOptions): string
}

export interface ErrorFormatter {
  format(key: string, value: string, options?: ErrorConversionOptions): string
}

export interface ErrorConverter {
  canConvert(error: any): boolean
  convert(error: any, options?: ErrorConversionOptions): string
}

export interface ErrorConversionContext {
  translator: ErrorTranslator
  formatter: ErrorFormatter
}
