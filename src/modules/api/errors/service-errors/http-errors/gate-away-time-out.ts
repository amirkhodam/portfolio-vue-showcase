import { HttpError } from './http.error'

export class GatewayTimeoutError extends HttpError {
  status = 504
  message = 'Gateway Timeout'
}
