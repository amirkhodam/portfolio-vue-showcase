import type {
  AxiosError,
  AxiosHeaderValue,
  AxiosInstance,
  AxiosResponse,
  AxiosRequestConfig
} from 'axios'
import { AxiosParser } from '../errors'
import type { ErrorHandlingStrategy } from '@/modules/error-handling/ErrorHandlingService'
import { useErrorHandler } from '@/modules/error-handling/useErrorHandler'
import { ApiClient } from '../api.client'

type ServiceResponse<T, HttpResponseType> = T extends true
  ? HttpResponseType
  : HttpResponseType | undefined

interface ServiceConfig extends AxiosRequestConfig {
  strategy?: ErrorHandlingStrategy
  throwError?: boolean
}

interface ErrorConfig {
  strategy?: ErrorHandlingStrategy
  throwError?: boolean
}

export class Service {
  protected errorParser: AxiosParser
  protected errorHandler = useErrorHandler()

  constructor(protected readonly adaptor: AxiosInstance) {
    this.errorParser = new AxiosParser()
  }

  protected processResult<T>(response: AxiosResponse): T {
    return response.data
  }

  protected processError(error: AxiosError, config?: ErrorConfig): never {
    const { strategy = 'silent', throwError = true } = config ?? {}

    if (strategy !== 'silent') {
      if (strategy === 'translate') {
        const translatedError = this.errorHandler.handleApiError(error, config)
        throw translatedError
      }
      this.errorHandler.handleApiError(error, {
        detail: this.errorParser.parse(error),
        strategy
      })
    }

    if (throwError) {
      throw this.errorParser.parse(error)
    }
    return undefined as never
  }

  protected extractConfig(config: ServiceConfig): {
    errorConfig: ErrorConfig
    axiosConfig: AxiosRequestConfig
  } {
    const { strategy, throwError, ...axiosConfig } = config
    return {
      errorConfig: { strategy, throwError },
      axiosConfig
    }
  }

  protected async executeRequest<T>(
    request: () => Promise<AxiosResponse>,
    errorConfig: ErrorConfig
  ): Promise<T> {
    try {
      const response = await request()
      return this.processResult<T>(response)
    } catch (error) {
      this.processError(error as AxiosError, errorConfig)
    }
  }

  setHeader(key: string, value: string): void {
    this.adaptor.defaults.headers.common[key] = value
  }

  deleteHeader(key: string): void {
    delete this.adaptor.defaults.headers.common[key]
  }

  getHeader(key: string): AxiosHeaderValue | undefined {
    return this.adaptor.defaults.headers.common[key]
  }

  get<HttpResponseType = unknown, T extends boolean = true>(
    url: string,
    config: ServiceConfig & { throwError?: T } = {}
  ): Promise<ServiceResponse<T, HttpResponseType>> {
    const { errorConfig, axiosConfig } = this.extractConfig(config)
    return this.executeRequest<ServiceResponse<T, HttpResponseType>>(
      () => this.adaptor.get(url, axiosConfig),
      errorConfig
    )
  }

  post<HttpResponseType = unknown, HttpRequestType = unknown, T extends boolean = true>(
    url: string,
    data: HttpRequestType = {} as HttpRequestType,
    config: ServiceConfig & { throwError?: T } = {}
  ): Promise<ServiceResponse<T, HttpResponseType>> {
    const { errorConfig, axiosConfig } = this.extractConfig(config)
    return this.executeRequest<ServiceResponse<T, HttpResponseType>>(
      () => this.adaptor.post(url, data, axiosConfig),
      errorConfig
    )
  }

  patch<HttpResponseType = unknown, HttpRequestType = unknown, T extends boolean = true>(
    url: string,
    data: HttpRequestType = {} as HttpRequestType,
    config: ServiceConfig & { throwError?: T } = {}
  ): Promise<T extends true ? HttpResponseType : HttpResponseType | undefined> {
    const { errorConfig, axiosConfig } = this.extractConfig(config)
    ApiClient.runningCount.value += 1
    return this.executeRequest<HttpResponseType>(
      () => this.adaptor.patch(url, data, axiosConfig),
      errorConfig
    ).finally(() => {
      ApiClient.runningCount.value -= 1
    })
  }

  put<HttpResponseType = unknown, HttpRequestType = unknown, T extends boolean = true>(
    url: string,
    data: HttpRequestType = {} as HttpRequestType,
    config: ServiceConfig & { throwError?: T } = {}
  ): Promise<T extends true ? HttpResponseType : HttpResponseType | undefined> {
    const { errorConfig, axiosConfig } = this.extractConfig(config)
    ApiClient.runningCount.value += 1
    return this.executeRequest<HttpResponseType>(
      () => this.adaptor.put(url, data, axiosConfig),
      errorConfig
    ).finally(() => {
      ApiClient.runningCount.value -= 1
    })
  }

  delete<HttpResponseType = unknown, T extends boolean = true>(
    url: string,
    config: ServiceConfig & { throwError?: T } = {}
  ): Promise<T extends true ? HttpResponseType : HttpResponseType | undefined> {
    const { errorConfig, axiosConfig } = this.extractConfig(config)
    ApiClient.runningCount.value += 1
    return this.executeRequest<HttpResponseType>(
      () => this.adaptor.delete(url, axiosConfig),
      errorConfig
    ).finally(() => {
      ApiClient.runningCount.value -= 1
    })
  }

  deleteData<HttpResponseType = unknown, HttpRequestType = unknown>(
    url: string,
    data: HttpRequestType = {} as HttpRequestType,
    config: ServiceConfig = {}
  ): Promise<HttpResponseType> {
    const { errorConfig, axiosConfig } = this.extractConfig(config)
    ApiClient.runningCount.value += 1
    return this.executeRequest<HttpResponseType>(
      () => this.adaptor.request({ url, method: 'delete', data, ...axiosConfig }),
      errorConfig
    ).finally(() => {
      ApiClient.runningCount.value -= 1
    })
  }
}
