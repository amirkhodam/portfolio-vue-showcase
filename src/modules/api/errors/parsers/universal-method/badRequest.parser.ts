import { BadRequestException } from '../../service-errors'
interface ErrorMap {
  [message: string]: new (...args: any[]) => any
}
import type { ServerErrorPayload } from '../universal.parser'
export class BadRequestParser {
  private errorMap: ErrorMap = {}

  parseBadRequest(payload: ServerErrorPayload) {
    if (typeof payload === 'string') {
      for (const [message, ErrorClass] of Object.entries(this.errorMap)) {
        if (payload.indexOf(message) !== -1) {
          return new ErrorClass()
        }
      }
    }
    if (typeof payload === 'object') {
      const payloadData = payload.message
      const errors = new Set(Object.values(payloadData))
      // if (errors.has('UniquenessViolation')) {
      //   return new UniquenessViolation(...Object.keys(payloadData))
      // }

      return new BadRequestException(payloadData)
    }
  }
}
