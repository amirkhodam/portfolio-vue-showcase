import { NetworkError, BadRequestParser, NetworkUnknownError } from './universal-method'
import {
  UnprocessableEntity,
  UnauthorizedException,
  InternalServerError,
  BadGatewayError,
  ServiceUnavailable,
  GatewayTimeoutError,
  ForbiddenException
} from '../service-errors'

export interface ServerErrorPayloadObject {
  error: string
  statusCode: number
  message: Record<string, string>
}

export type ServerErrorPayload = ServerErrorPayloadObject | string | undefined

export class UniversalParser<DriverErrorType = unknown> {
  parseNetworkError(nativeHandle: DriverErrorType) {
    return new NetworkError(nativeHandle)
  }

  parseUnknownError(error: Error) {
    return new NetworkUnknownError(error)
  }

  parseServerErrors(code: number, payload: ServerErrorPayload) {
    switch (code) {
      case 400:
        return this.parseBadRequest(payload)
      case 401:
        return this.parseUnauthorized(payload)
      case 403:
        return this.forbiddenException(payload)
      case 404:
        return this.notFound(payload)
      case 429:
        return this.tooMayRequest(payload)
      case 500:
        return this.internalServerError(payload)
      case 502:
        return this.badGateAway(payload)
      case 503:
        return this.serviceUnavailable(payload)
      case 504:
        return this.gateAwayTimeOut(payload)
    }
  }

  parseBadRequest(payload: ServerErrorPayload) {
    return new BadRequestParser().parseBadRequest(payload)
  }

  parseUnauthorized(payload: ServerErrorPayload) {
    switch (payload) {
      case 'authorized':
        return new UnauthorizedException()
    }
  }

  forbiddenException(payload: ServerErrorPayload) {
    switch (payload) {
      default:
        return new ForbiddenException()
    }
  }

  notFound(payload: ServerErrorPayload) {
    switch (payload) {
      default:
        return 'Not Found Data'
    }
  }

  tooMayRequest(payload: ServerErrorPayload) {
    if (typeof payload === 'object') {
      const msg = payload.message.message as unknown as Record<string, string>
      if (msg) {
        const payloadData = Object.keys(msg)[0]
        if (payloadData) {
          const tmp = msg[payloadData] as unknown as {
            value: string
            retrySecs: number
          }
        }
      }
    }
  }

  internalServerError(payload: ServerErrorPayload) {
    //  logic for handling 500 errors
    return new InternalServerError()
  }
  badGateAway(payload: ServerErrorPayload) {
    //  logic for handling 502 errors
    return new BadGatewayError()
  }
  serviceUnavailable(payload: ServerErrorPayload) {
    //  logic for handling 502 errors
    return new ServiceUnavailable()
  }
  gateAwayTimeOut(payload: ServerErrorPayload) {
    //  logic for handling 502 errors
    return new GatewayTimeoutError()
  }
}
