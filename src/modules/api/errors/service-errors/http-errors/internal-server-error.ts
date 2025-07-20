import { HttpError } from './http.error'

export class InternalServerError extends HttpError {
  status = 500
  message = 'Internal Server Error'
}
