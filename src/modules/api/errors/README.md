# Errors Module

This directory contains error handling utilities for API services.

## Structure
- **service-errors/**: Standardized error types and handlers for services.
  - **http-errors/**: Contains HTTP error classes for common status codes (400, 401, 403, 404, 422, 429, 500, 502, 504, etc.).
    - `HttpError`: Base class for HTTP errors.
    - `BadRequestException`, `UnauthorizedException`, `ForbiddenException`, `NotFoundException`, `UnprocessableEntity`, `TooManyRequests`, `InternalServerError`, `BadGatewayError`, `GatewayTimeoutError`, `ServiceUnavailable`: Specific error classes for each HTTP status.
  - **general/**, **admin/**, **bridge/**, **notification/**, **payment/**, **ticketing/**: Domain-specific error types and handlers.
- **parsers/**: Error parsers for normalizing API error responses.
  - `UniversalParser`: Base parser for server and network errors, maps status codes to error classes.
  - `AxiosParser`: Extends UniversalParser, parses Axios errors and integrates with i18n for error messages.
- **messageI18/**: Internationalization for error messages (i18n support for error strings).
- **index.ts**: Exports all error utilities.

## Usage
- Used internally by services for error normalization and translation.
- Extend or add new error parsers as needed for new API response formats.

### Example: Handling Errors in a Service
```ts
import { Service } from '@/lib/api/services/service'

class MyService extends Service {
  async getData() {
    try {
      return await this.get('/endpoint')
    } catch (error) {
      // error is normalized using the error parsers and classes
      if (error instanceof UnauthorizedException) {
        // handle unauthorized
      }
      throw error
    }
  }
}
```

### Example: Parsing Errors
```ts
import { AxiosParser } from '@/lib/api/errors/parsers/axios.parser'

const parser = new AxiosParser()
const message = parser.parse(error) // error can be an AxiosError
```

## Development Notes
- Always use error utilities in services for consistent error handling.
- Add new error types or parsers in their respective subdirectories.
- For new HTTP status codes, extend `http-errors/` with a new class and export it in `index.ts`.
- For new API response formats, extend `UniversalParser` or create a new parser in `parsers/`.
- Use `messageI18/` for adding new translations for error messages. 