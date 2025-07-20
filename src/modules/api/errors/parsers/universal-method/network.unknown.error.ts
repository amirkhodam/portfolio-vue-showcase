export class NetworkUnknownError extends Error {
  constructor(public readonly error: Error) {
    super(error.message)
  }
}
