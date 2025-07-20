import type { ErrorConverter, ErrorConversionContext, ErrorConversionOptions } from './interfaces'

export class StringErrorConverter implements ErrorConverter {
  constructor(private context: ErrorConversionContext) {}

  canConvert(error: any): boolean {
    return typeof error === 'string'
  }

  convert(error: string, options?: ErrorConversionOptions): string {
    return error.includes('object')
      ? this.context.translator.translate('tooMany', options)
      : this.context.translator.translate(error, options)
  }
}

export class MessageErrorConverter implements ErrorConverter {
  constructor(private context: ErrorConversionContext) {}

  canConvert(error: any): boolean {
    return error && typeof error === 'object' && 'message' in error
  }

  convert(error: { message: string }, options?: ErrorConversionOptions): string {
    return error.message
  }
}

export class ObjectErrorConverter implements ErrorConverter {
  constructor(private context: ErrorConversionContext) {}

  canConvert(error: any): boolean {
    return error && typeof error === 'object' && !('message' in error)
  }

  convert(error: Record<string, any>, options?: ErrorConversionOptions): string {
    const [key, value] = Object.entries(error)[0]

    if (typeof value === 'string') {
      return this.context.formatter.format(key, value, options)
    }

    if (typeof value === 'object' && value !== null) {
      if ('ip' in value) {
        return this.context.translator.translate('tooMany', options)
      }

      const valueEntries = Object.entries(value)
      if (valueEntries.length >= 1) {
        const [nestedKey, nestedValue] = valueEntries[0]
        if (typeof nestedValue === 'string') {
          return this.context.formatter.format(key, nestedValue, options)
        }
      }

      return this.context.translator.translate('oop')
    }

    if (Array.isArray(value)) {
      return this.context.formatter.format(
        key,
        value.map((v) => this.context.translator.translate(v)).join(', '),
        options
      )
    }

    return this.context.translator.translate('oop', options)
  }
}
