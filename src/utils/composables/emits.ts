import { getCurrentInstance, type EmitFn } from 'vue'

class Emits {
  private readonly _emit: undefined | EmitFn = undefined
  private readonly ـemits: Array<string> = []
  constructor(emitsList: Array<string>) {
    const instance = getCurrentInstance()
    if (instance) {
      this._emit = instance.emit
    }
    this.ـemits = emitsList
  }

  emit(event: string, ...args: any[]) {
    if (this._emit && this.ـemits.includes(event)) {
      this._emit(event, ...args)
    }
  }
}

// Overload 1: Vue-style generic signature
type EventFn = (...args: any[]) => any
export function defineEmits<T extends (...args: any[]) => any>(): (
  event: Parameters<T>[0],
  ...args: Parameters<T> extends [any, ...infer A] ? A : never
) => void

// Overload 2: Array of strings
export function defineEmits(emitsStr: Array<string>): (event: string, ...args: any[]) => void

// Implementation
export function defineEmits(arg?: any): any {
  // Vue-style generic signature: defineEmits<{ (e: 'loaded'): void }>()
  if (typeof arg === 'undefined') {
    const instance = getCurrentInstance()
    const emit = instance?.emit
    return (event: string, ...args: any[]) => {
      emit?.(event, ...args)
    }
  }
  // Array of strings
  if (Array.isArray(arg)) {
    const emits = new Emits(arg)
    return emits.emit.bind(emits)
  }
  throw new Error('Invalid arguments passed to defineEmits')
}
