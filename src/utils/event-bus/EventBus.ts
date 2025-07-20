import mitt from 'mitt'

const eventBus = mitt()

export function useEventBus() {
  return eventBus
}
