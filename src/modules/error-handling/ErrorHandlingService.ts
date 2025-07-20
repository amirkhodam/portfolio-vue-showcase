import { useEventBus } from '@/utils/eventBus/EventBus'
import { EMessageType, type IErrorTranslate } from './error-handling.interface'
import { translator } from './translate/TranslationService'

export type ErrorHandlingStrategy = 'toast' | 'console' | 'silent' | 'translate'

type ErrorTranslateReturn<T extends ErrorHandlingStrategy> = T extends 'translate'
  ? IErrorTranslate
  : void

export interface ErrorHandlingMessageOptions {
  prefix?: string
  default?: string
  inline?: boolean
}

export interface ErrorHandlingObjectOptions {
  strategy: ErrorHandlingStrategy
  severity?: 'error' | 'warn' | 'info' | 'success'
  summary?: string
  detail?: string
  life?: number
  closable?: boolean
  group?: string
}

export type ErrorHandlingOptions = ErrorHandlingObjectOptions & ErrorHandlingMessageOptions

export class ErrorHandlingService {
  private static instance: ErrorHandlingService
  private eventBus = useEventBus()

  private constructor() {}

  public static getInstance(): ErrorHandlingService {
    if (!ErrorHandlingService.instance) {
      ErrorHandlingService.instance = new ErrorHandlingService()
    }
    return ErrorHandlingService.instance
  }

  public handleError<T extends ErrorHandlingStrategy>(
    error: any,
    options: ErrorHandlingOptions & { strategy: T }
  ): ErrorTranslateReturn<T> {
    const translatedError = this.handleTranslateError(error, options)
    switch (options.strategy) {
      case 'toast':
        this.handleToastError(translatedError, options)
        return undefined as ErrorTranslateReturn<T>
      case 'silent':
        // Do nothing, silently continue
        return undefined as ErrorTranslateReturn<T>
      case 'console':
        this.handleConsoleError(translatedError)
        return undefined as ErrorTranslateReturn<T>
      case 'translate':
        return translatedError as ErrorTranslateReturn<T>
      default:
        // Default to console logging if strategy is invalid
        this.handleConsoleError(translatedError)
        return undefined as ErrorTranslateReturn<T>
    }
  }

  private handleToastError(error: any, options: ErrorHandlingOptions): void {
    this.eventBus.emit('toast.add', {
      severity: options.severity || EMessageType.error,
      summary: options.summary || 'Error',
      detail: options.detail || error.translate,
      life: options.life || 5000,
      closable: options.closable,
      group: options.group
    })
  }

  private handleConsoleError(error: any): void {
    console.error('Error occurred:', error)
  }

  private handleTranslateError(error: any, options: ErrorHandlingOptions): IErrorTranslate {
    return translator.translateError(error, options)
  }
}

// Export a singleton instance
export const errorHandler = ErrorHandlingService.getInstance()
