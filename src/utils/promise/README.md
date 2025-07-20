# Thunder Web Application

A high-performance web-based video player application that supports various video codecs and formats.

## Features

- Support for multiple video codecs (H.264, H.265, MJPEG, MPEG4)
- Real-time video streaming
- Frame-by-frame decoding
- Image masking capabilities
- WebAssembly-based decoding
- YUV and RGB color space support
- Efficient frame queue management
- Statistical monitoring of playback performance

## Architecture

### Core Components

#### Decoders

- `DecoderMjpeg`: Handles MJPEG format decoding
- `DecoderWebAssembly`: WebAssembly-based decoder for H.264/H.265
- `DecoderWebAssemblyYUV`: YUV-specific WebAssembly decoder
- `DecoderQueue`: Manages decoding jobs and worker communication

#### Display

- `Display`: Base display class for rendering video frames
- `DisplayYuv`: YUV-specific display implementation
- Supports both canvas and WebGL rendering

#### Frame Management

- `FrameQueue`: Manages frame buffering and synchronization
- `ImageQueue`: Handles image buffering and display timing
- `JpegImage`: JPEG image format handling
- `RGBImage`: RGB image format handling
- `YUVImage`: YUV image format handling

### Performance Features

- Frame dropping for performance optimization
- Bitrate monitoring
- Decoder performance statistics
- Display timing management
- Buffer management for smooth playback

## Promise Utilities

The `promiseFunction.ts` module provides advanced promise memoization utilities to optimize performance and reduce redundant API calls in the Thunder Web Application.

### Overview

This module implements intelligent promise caching with time-based expiration (TTL) to prevent duplicate asynchronous operations and improve application responsiveness.

### Core Functions

#### `memoizePromise<Args extends any[], Return>`

Creates a memoized version of an async function that caches promises based on function signature and optional TTL.

**Parameters:**

- `fn: (...args: Args) => Promise<Return>` - The async function to memoize
- `options: { ttl?: number }` - Optional configuration object
  - `ttl`: Time-to-live in milliseconds for cached promises

**Returns:** A memoized version of the original function

**Example:**

```typescript
import { memoizePromise } from './promiseFunction'

// Original async function
const fetchUserData = async (userId: string) => {
  const response = await fetch(`/api/users/${userId}`)
  return response.json()
}

// Memoized version with 5-minute TTL
const memoizedFetchUser = memoizePromise(fetchUserData, { ttl: 5 * 60 * 1000 })

// Multiple calls with same userId will return the same promise
const promise1 = memoizedFetchUser('123')
const promise2 = memoizedFetchUser('123') // Returns cached promise
```

#### `memoizeMethod<Args extends any[], Return>`

Creates a memoized version of a class method, preserving the correct `this` context.

**Parameters:**

- `context: any` - The object/class instance containing the method
- `method: (...args: Args) => Promise<Return>` - The class method to memoize
- `options: { ttl?: number }` - Optional configuration object

**Returns:** A memoized version of the original method

**Example:**

```typescript
import { memoizeMethod } from './promiseFunction'

class UserService {
  async getUserProfile(userId: string) {
    const response = await fetch(`/api/users/${userId}/profile`)
    return response.json()
  }
}

const userService = new UserService()

// Memoize the method with proper context binding
const memoizedGetProfile = memoizeMethod(
  userService,
  userService.getUserProfile,
  { ttl: 10 * 60 * 1000 } // 10 minutes
)

// Usage
const profile = await memoizedGetProfile('123')
```

### Internal Implementation

#### `_memoizePromise<Args extends any[], Return>`

Internal helper function that implements the core memoization logic.

**Features:**

- **Automatic Cache Management**: Automatically removes resolved/rejected promises from cache
- **TTL Support**: Optional time-based expiration for cached promises
- **Hash-based Keys**: Uses function signature hashing for cache keys
- **Memory Efficient**: Cleans up cache entries after promise resolution

**Cache Behavior:**

- Promises are cached immediately when created
- Cache entries are automatically removed when promises resolve or reject
- TTL validation occurs on each function call
- Expired cache entries are ignored and new promises are created

### Use Cases

#### API Call Optimization

```typescript
// Prevent duplicate API calls for the same data
const memoizedApiCall = memoizePromise(
  async (endpoint: string) => {
    const response = await fetch(endpoint)
    return response.json()
  },
  { ttl: 5 * 60 * 1000 } // 5 minutes
)
```

#### Resource Loading

```typescript
// Cache resource loading operations
const memoizedLoadResource = memoizePromise(
  async (resourceId: string) => {
    return await loadResource(resourceId)
  },
  { ttl: 30 * 60 * 1000 } // 30 minutes
)
```

#### Class Method Optimization

```typescript
class DataManager {
  async fetchData(key: string) {
    // Expensive operation
    return await this.performExpensiveOperation(key)
  }
}

const dataManager = new DataManager()
const memoizedFetch = memoizeMethod(
  dataManager,
  dataManager.fetchData,
  { ttl: 2 * 60 * 1000 } // 2 minutes
)
```

### Performance Benefits

- **Reduced Network Requests**: Prevents duplicate API calls
- **Improved Response Times**: Returns cached results instantly
- **Memory Management**: Automatic cleanup of resolved promises
- **Configurable Caching**: TTL-based expiration for different use cases

### Best Practices

1. **Choose Appropriate TTL**: Set TTL based on data freshness requirements
2. **Monitor Memory Usage**: Large TTL values may accumulate cached promises
3. **Error Handling**: Cached promises maintain error states appropriately
4. **Function Purity**: Ensure memoized functions are pure and deterministic

### TypeScript Support

The module provides full TypeScript support with:

- Generic type parameters for function arguments and return types
- Proper type inference for memoized functions
- Type-safe method memoization with context preservation

## Usage

```typescript
// Initialize the player
const player = new PlayerPipeline()

// Set up display canvas
player.setDisplayCanvas(canvas)

// Configure playback
player.setRenderSize(width, height)
player.enableBuffering()

// Start playback
player.live(streamIndex)
```

## Development

### Prerequisites

- Node.js
- TypeScript
- WebAssembly support in the browser

### Building

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

### Testing

```bash
# Run tests
npm test
```

## Performance Considerations

- The player implements frame dropping when necessary to maintain performance
- WebAssembly decoders provide efficient video decoding
- Frame queues help manage memory and timing
- Image buffering ensures smooth playback

## Browser Support

- Modern browsers with WebAssembly support
- Canvas and WebGL support required
- ImageBitmap API support required

## License

[Add your license information here]

## Contributing

[Add contribution guidelines here]
