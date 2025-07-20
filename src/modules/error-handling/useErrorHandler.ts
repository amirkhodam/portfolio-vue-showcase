import { errorHandler, type ErrorHandlingOptions } from './ErrorHandlingService'

export function useErrorHandler() {
  const handleError = (error: any, options: ErrorHandlingOptions) => {
    return errorHandler.handleError(error, options)
  }

  const handleTranslateError = (error: any, options: Partial<ErrorHandlingOptions> = {}) => {
    handleError(error, {
      strategy: 'translate',
      ...options
    })
  }

  const handleApiError = (error: any, options: Partial<ErrorHandlingOptions> = {}) => {
    return handleError(error, {
      strategy: options.strategy || 'toast',
      severity: options.severity || 'error',
      summary: options.summary || 'Service Error',
      life: options.life || 5000,
      ...options
    })
  }

  const handleValidationError = (error: any, options: Partial<ErrorHandlingOptions> = {}) => {
    handleError(error, {
      strategy: 'toast',
      severity: 'warn',
      summary: 'Validation Error',
      life: 3000,
      ...options
    })
  }

  const handleSilentError = (error: any) => {
    handleError(error, {
      strategy: 'silent'
    })
  }

  const handleDebugError = (error: any) => {
    handleError(error, {
      strategy: 'console'
    })
  }

  return {
    handleError,
    handleApiError,
    handleValidationError,
    handleSilentError,
    handleDebugError,
    handleTranslateError
  }
}
