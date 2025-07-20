import { hashString } from '../HashFn'

interface PromiseCache<T> {
  promise: Promise<T>
  timestamp: number
}

function _memoizePromise<Args extends any[], Return>(
  fn: (...args: Args) => Promise<Return>,
  key: string,
  options: { ttl?: number } = {}
): (...args: Args) => Promise<Return> {
  const cache = new Map<string, PromiseCache<Return>>()
  const { ttl } = options

  return function (...args: Args): Promise<Return> {
    const now = Date.now()
    const cached = cache.get(key)

    // Check if we have a valid cached promise
    if (cached && (!ttl || now - cached.timestamp < ttl)) {
      return cached.promise
    }

    // Create new promise and cache it
    const promise = fn(...args).then(
      (res) => {
        cache.delete(key)
        return res
      },
      (error) => {
        cache.delete(key)
        throw error
      }
    )

    cache.set(key, { promise, timestamp: now })
    return promise
  }
}

export function memoizePromise<Args extends any[], Return>(
  fn: (...args: Args) => Promise<Return>,
  options: { ttl?: number } = {}
): (...args: Args) => Promise<Return> {
  const key = hashString(String(fn).replace(/[\n\s]/g, ''))
  return _memoizePromise<Args, Return>(fn, key, options)
}

// Helper function to memoize class methods
export function memoizeMethod<Args extends any[], Return>(
  context: any,
  method: (...args: Args) => Promise<Return>,
  options: { ttl?: number } = {}
): (...args: Args) => Promise<Return> {
  const key = hashString(String(method).replace(/[\n\s]/g, ''))
  return _memoizePromise<Args, Return>(
    async (...args: Args) => method.apply(context, args),
    key,
    options
  )
}
