import { HttpError } from './http.error'

export class BadGatewayError extends HttpError {
  status = 502
  message = 'Bad Gateway'
}
