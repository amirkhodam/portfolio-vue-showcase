import type { AxiosInstance, AxiosHeaderValue } from 'axios'
import axios from 'axios'
import { AuthenticationManagerService, PortfolioService } from '@/modules/api/services'
import { computed, ref, watch } from 'vue'

// Service URL configuration
export interface ServiceConfig {
  subdomain: string
  path?: string
}

export const SERVICE_CONFIGS: Record<string, ServiceConfig> = {
  // authentication: { subdomain: 'auth' }
}

// export const SERVICE_CONFIGS: Record<string, ServiceConfig> = {
//   authentication: { subdomain: 'https://example.com/' }, // Auth service path
// }

const getServiceBaseUrl = (baseURL: string, serviceName: string): string => {
  const config = SERVICE_CONFIGS[serviceName]
  try {
    const configUrl = new URL(config.subdomain)
    const baseUrl = new URL(baseURL)
    return `${configUrl}${baseUrl.pathname}`
  } catch (error) {
    if (!config) return baseURL

    const url = new URL(baseURL)
    url.hostname = `${config.subdomain}.${url.hostname}`
    if (config.path) {
      url.pathname = config.path
    }
    return url.toString()
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
    { immediate: true },
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
      const serviceBaseUrl = getServiceBaseUrl(this.baseURL, serviceName)
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
