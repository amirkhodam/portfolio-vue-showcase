import { HttpError } from './http.error'

export class ServiceUnavailable extends HttpError {
  status = 504
  message = ' Service Unavailable'
}
