import { I18nErrorTranslator } from './translator'
import { DefaultErrorFormatter } from './formatter'
import { StringErrorConverter, MessageErrorConverter, ObjectErrorConverter } from './converters'
import type { ErrorConverter } from './interfaces'
import type { ErrorHandlingMessageOptions } from '../ErrorHandlingService'

class ErrorConversionService {
  private converters: ErrorConverter[]

  constructor() {
    const translator = new I18nErrorTranslator()
    const formatter = new DefaultErrorFormatter(translator)
    const context = { translator, formatter }

    this.converters = [
      new StringErrorConverter(context),
      new MessageErrorConverter(context),
      new ObjectErrorConverter(context)
    ]
  }

  convert(error: any, options: ErrorHandlingMessageOptions = {}): string {
    const converter = this.converters.find((c) => c.canConvert(error))
    if (!converter) {
      return 'Unknown error format'
    }
    return converter.convert(error, options)
  }
}

// Create a singleton instance
const errorConversionService = new ErrorConversionService()

// Export the main conversion function
export const ConvertError = (
  message: any,
  options: ErrorHandlingMessageOptions | boolean = {}
): string =>
  errorConversionService.convert(
    message,
    typeof options === 'boolean' ? { inline: options } : options
  )
