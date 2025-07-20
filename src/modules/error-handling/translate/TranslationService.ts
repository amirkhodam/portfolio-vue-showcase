import { ConvertError } from '../convertErrors'
import type { IErrorResponse, IErrorTranslate } from '../error-handling.interface'
import type { ErrorHandlingOptions } from '../ErrorHandlingService'

export interface TranslationOptions {
  params?: Record<string, unknown>
  plural?: number
  default?: string
}

export class ErrorTranslator {
  private static instance: ErrorTranslator

  private constructor() {}

  public static getInstance(): ErrorTranslator {
    if (!ErrorTranslator.instance) {
      ErrorTranslator.instance = new ErrorTranslator()
    }
    return ErrorTranslator.instance
  }

  public translateError(error: any, options: ErrorHandlingOptions): IErrorTranslate {
    const errorResponse = error.response?.data ?? error.data
    if (errorResponse) {
      return this.translateAPIErrors(errorResponse, error)
    }
    const message = this.translate(error, options)
    return {
      message: message,
      status: 0,
      error: error.error,
      translate: message,
      errorObject: error,
    }
  }

  public translateAPIErrors(errorResponse: IErrorResponse, error: any): IErrorTranslate {
    let message: string
    if (typeof errorResponse.message === 'string') {
      message = errorResponse.message
    } else if (
      errorResponse.message &&
      typeof errorResponse.message === 'object' &&
      'message' in errorResponse.message &&
      typeof (errorResponse.message as { message?: unknown }).message === 'string'
    ) {
      message = (errorResponse.message as { message: string }).message
    } else if (errorResponse.message && typeof errorResponse.message === 'object') {
      // Try to get the first string property value from the object
      const values = Object.values(errorResponse.message)
      const firstString = values.find((v) => typeof v === 'string')
      message = firstString || errorResponse.error || String(error)
    } else {
      message = errorResponse.error || String(error)
    }
    return {
      message,
      status: Number(errorResponse.statusCode),
      error: errorResponse.error,
      translate: this.translate(errorResponse),
      errorObject: error,
    }
  }

  public translate(error: IErrorResponse | string, options: Partial<ErrorHandlingOptions> = {}) {
    const { prefix = '', default: defaultError = 'ooops' } = options
    return ConvertError(error, { inline: true, prefix, default: defaultError })
  }
}

// Export a singleton instance
export const translator = ErrorTranslator.getInstance()
