import { computed, onMounted, ref, watch } from 'vue'
import type { ComputedRef, Ref, WatchHandle, WatchOptions } from 'vue'

export interface Options {
  /**
   * Options for the Intersection Observer.
   * @default { threshold: 0.1 }
   */
  observer?: Partial<IntersectionObserverInit>

  /**
   * Configuration for setting up a watcher to re-trigger the callback when a specific value changes.
   */
  watcher?: {
    /**
     * The value to watch for changes. Can be a `Ref` or `ComputedRef`.
     */
    value?: Ref<any> | ComputedRef<any>

    /**
     * Options for the watcher.
     * @default { deep: true, immediate: false }
     */
    options?: WatchOptions
  }
}

/**
 * A reusable composable for lazy loading elements when they enter the viewport.
 * Uses the Intersection Observer API to trigger a callback when the target element becomes visible.
 * Optionally, a watcher can be set up to re-trigger the callback when a specific value changes.
 *
 * @param refEl - A Vue `Ref` pointing to the target HTML element to observe.
 * @param callback - A function (or async function) to execute when the element is visible.
 * @param options - Configuration options for the Intersection Observer and watcher.
 *
 * @returns An object with a `stopWatcher` method to stop the watcher (if enabled).
 *
 * @example
 * ```vue
 * <template>
 *   <div ref="targetElement">
 *     <p v-if="data">{{ data }}</p>
 *     <p v-else>Loading...</p>
 *   </div>
 * </template>
 *
 * <script setup>
 * import { ref } from 'vue'
 * import lazyLoader from './lazyLoader'
 *
 * const targetElement = ref(null)
 * const data = ref(null)
 *
 * lazyLoader(targetElement, async () => {
 *   // Simulate an API call
 *   setTimeout(() => {
 *     data.value = 'This is the fetched data!'
 *   }, 1000)
 * }, {
 *   observer: { threshold: 0.5 },
 *   watcher: {
 *     value: data,
 *     options: { immediate: true }
 *   }
 * })
 * </script>
 * ```
 */
export default function lazyLoader(
  refEl: Ref<HTMLElement>,
  callback: () => void | Promise<void>,
  options: Options = {}
) {
  const { observer: observerArg, watcher: watcherArg } = options

  // Default options for watcher and observer
  const watchOptions = {
    deep: true,
    immediate: false,
    ...watcherArg?.options
  }
  const observerOptions = {
    threshold: 0.1,
    ...observerArg
  }

  const watcher = ref<WatchHandle | undefined>(undefined)
  const isVisible = ref(false)

  // Computed value for the watcher's target value
  const watcherValue = computed(() => watcherArg?.value)

  // Handle the callback, supporting both sync and async functions
  async function handleCallback() {
    if (!isVisible.value) return
    const result = callback()
    if (result instanceof Promise) {
      await result
    }
  }

  // Set up a watcher if `watcherValue` is provided
  function setupWatcher() {
    if (!watcher.value && watcherValue.value) {
      watcher.value = watch(() => watcherValue.value, handleCallback, watchOptions)
    }
  }

  // Stop the watcher if it exists
  function stopWatcher() {
    if (watcher.value) {
      watcher.value()
      watcher.value = undefined
    }
  }

  // Initialize Intersection Observer
  onMounted(() => {
    setupWatcher()

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        isVisible.value = true
        handleCallback()
        observer.disconnect()
      }
    }, observerOptions)

    observer.observe(refEl.value)
  })

  return { stopWatcher }
}
