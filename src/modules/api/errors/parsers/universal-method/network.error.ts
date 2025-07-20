export class NetworkError<DriverErrorType = unknown> extends Error {
  constructor(public readonly context: DriverErrorType) {
    super('It seems there is network difficulty')
  }
}
