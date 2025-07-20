# Error Handling Module

This module provides a robust error handling system for the Thunder Web Application. It offers a centralized way to handle, translate, and display errors across the application.

## Features

- Centralized error handling service
- Error translation support
- Multiple error handling strategies
- Type-safe error interfaces
- Vue composition API integration

## Components

### ErrorHandlingService

The core service that manages error handling throughout the application. It provides methods for handling errors with different strategies:

- `toast`: Display errors as toast notifications
- `console`: Log errors to the console
- `silent`: Silently handle errors without user feedback
- `translate`: Return translated error messages

### useErrorHandler

A Vue composition API hook that provides easy access to error handling functionality in components.

## Usage

### Basic Error Handling

```typescript
import { errorHandler } from '@/utils/error-handling/ErrorHandlingService'

// Handle an error with toast notification
errorHandler.handleError(error, {
  strategy: 'toast',
  severity: 'error',
  summary: 'Error Title',
  detail: 'Error details'
})

// Handle an error silently
errorHandler.handleError(error, {
  strategy: 'silent'
})

// Log error to console
errorHandler.handleError(error, {
  strategy: 'console'
})
```

### Using the Composition API Hook

```typescript
import { useErrorHandler } from '@/utils/error-handling/useErrorHandler'

export default {
  setup() {
    const { handleError } = useErrorHandler()

    const someFunction = async () => {
      try {
        // Your code here
      } catch (error) {
        handleError(error, {
          strategy: 'toast',
          severity: 'error'
        })
      }
    }

    return {
      someFunction
    }
  }
}
```

### Error Translation

The service automatically translates error messages using the application's translation system:

```typescript
const translatedError = errorHandler.translateError(error)
// Returns: {
//   message: string
//   status: number
//   error: string
//   translate: string
//   errorObject: any
// }
```

## Error Handling Options

```typescript
interface ErrorHandlingOptions {
  strategy: 'toast' | 'console' | 'silent' | 'translate'
  severity?: 'error' | 'warn' | 'info' | 'success'
  summary?: string
  detail?: string
  life?: number
  closable?: boolean
  group?: string
}
```

## Best Practices

1. **Always use the error handler**: Instead of directly handling errors, use the error handling service to ensure consistent error handling across the application.

2. **Choose appropriate strategies**:

   - Use `toast` for user-facing errors that need immediate attention
   - Use `console` for development and debugging
   - Use `silent` for expected errors that don't need user feedback
   - Use `translate` when you need the translated error message for custom handling

3. **Provide meaningful error details**: When using the toast strategy, provide clear and helpful error messages to users.

4. **Use type-safe interfaces**: Always use the provided interfaces to ensure type safety when handling errors.

## Error Response Structure

```typescript
interface ErrorResponse {
  message: string
  status: number
  error: string
  translate: string
  errorObject: any
}
```

## Contributing

When adding new error handling features:

1. Update the interfaces in `error-handling.interface.ts`
2. Add new strategies to the `ErrorHandlingStrategy` type
3. Implement new handling methods in `ErrorHandlingService`
4. Update this documentation

## Related Files

- `ErrorHandlingService.ts`: Core error handling service
- `useErrorHandler.ts`: Vue composition API hook
- `error-handling.interface.ts`: Type definitions
- `translate/`: Error translation utilities
