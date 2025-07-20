export interface IErrorTranslate {
  message: string
  status: number
  error: string
  translate: string
  errorObject: any
}
export interface IErrorResponse {
  message: string | { message: string }
  statusCode: number
  error: string
}
