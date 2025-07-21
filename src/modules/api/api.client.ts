import type { AxiosInstance, AxiosHeaderValue } from 'axios'
import axios from 'axios'
import { AuthenticationManagerService, PortfolioService } from '@/modules/api/services'
import { computed, ref, watch } from 'vue'

// Service URL configuration
export interface ServiceConfig {
  subdomain: string
  path?: string
  prefix?: string // Optional prefix to prepend to the path
}

export const SERVICE_CONFIGS: Record<string, ServiceConfig> = {
  // authentication: { subdomain: 'auth' }
}

// export const SERVICE_CONFIGS: Record<string, ServiceConfig> = {
//   authentication: { subdomain: 'https://example.com/' }, // Auth service path
// }

function getServiceBaseUrl(envDomain: string, serviceName: string, prefix: string = ''): string {
  const domain = envDomain
  const config = SERVICE_CONFIGS[serviceName]
  // Helper to clean and join path segments

  const joinPath = (...segments: (string | undefined)[]) =>
    '/' +
    segments
      .filter(Boolean)
      .map((s) => s!.replace(/^\/+|\/+$/g, ''))
      .filter(Boolean)
      .join('/')

  // Compose the path: [prefix argument] -> [config.prefix] -> [config.path or base path]
  const pathSegments = [prefix, config?.prefix, config?.path ? config.path : undefined].filter(
    Boolean
  )

  try {
    const configUrl = new URL(config.subdomain)
    const baseUrl = domain ? new URL(domain) : ''
    if (!config?.path) pathSegments[pathSegments.length - 1] = baseUrl ? baseUrl.pathname : ''
    const finalPath = joinPath(...pathSegments)
    return `${configUrl.origin}${finalPath}`
  } catch (error) {
    // If no config, still add prefix to the domain's path
    if (domain) {
      const url = new URL(domain)
      if (!config) {
        const path = joinPath(prefix, url.pathname)
        return `${url.origin}${path}`
      }
      url.hostname = `${config.subdomain}.${url.hostname}`
      if (!config?.path) pathSegments[pathSegments.length - 1] = url.pathname
      url.pathname = joinPath(...pathSegments)
      return url.toString()
    } else {
      return joinPath(...pathSegments)
    }
  }
}

const beforeUnloadHandler = (event: Event) => {
  event.preventDefault()

  // Included for legacy support, e.g. Chrome/Edge < 119
  event.returnValue = true
  return "Wait a sec—saving your changes! Stick around by hitting 'Cancel'"
}

export class ApiClient {
  public static runningCount = ref(0)

  public static readonly isRunning = computed(() => this.runningCount.value > 0)

  public static exitCheck() {
    if (ApiClient.isRunning.value) {
      return confirm("Wait a sec—saving your changes! Stick around by hitting 'Cancel'")
    } else return true
  }

  public static closeWatch = watch(
    ApiClient.isRunning,
    () => {
      if (ApiClient.isRunning.value) {
        window.addEventListener('beforeunload', beforeUnloadHandler)
      } else {
        window.removeEventListener('beforeunload', beforeUnloadHandler)
      }
    },
    { immediate: true }
  )

  protected adaptors: Map<string, AxiosInstance>
  protected mainAdaptor: AxiosInstance

  public authenticationManager: AuthenticationManagerService
  public portfolio: PortfolioService

  constructor(protected readonly baseURL: string) {
    this.adaptors = new Map()
    this.mainAdaptor = axios.create({ baseURL: this.baseURL })

    // Initialize services with their specific adaptors
    this.authenticationManager = new AuthenticationManagerService(this.getAdaptor('authentication'))
    this.portfolio = new PortfolioService(this.getAdaptor('portfolio'))
  }

  protected getAdaptor(serviceName: string): AxiosInstance {
    if (!this.adaptors.has(serviceName)) {
      const serviceBaseUrl = getServiceBaseUrl(this.baseURL, serviceName, 'api')
      this.adaptors.set(serviceName, axios.create({ baseURL: serviceBaseUrl }))
    }
    return this.adaptors.get(serviceName)!
  }

  public setHeader(key: string, value: string): void {
    // Set header for all adaptors
    this.mainAdaptor.defaults.headers.common[key] = value
    this.adaptors.forEach((adaptor) => {
      adaptor.defaults.headers.common[key] = value
    })
  }

  public getHeader(key: string): AxiosHeaderValue | undefined {
    return this.mainAdaptor.defaults.headers.common[key]
  }

  public removeHeader(key: string): void {
    // Remove header from all adaptors
    delete this.mainAdaptor.defaults.headers.common[key]
    this.adaptors.forEach((adaptor) => {
      delete adaptor.defaults.headers.common[key]
    })
  }
}
