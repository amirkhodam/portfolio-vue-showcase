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

export enum EMessageType {
  success = 'success',
  error = 'error',
  warning = 'warn',
  info = 'info',
  secondary = 'secondary',
  contrast = 'contrast',
}

export enum EMessageStyle {
  base = 'base',
  outline = 'outline',
  primary = 'primary',
}
