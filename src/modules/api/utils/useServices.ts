import { ApiClient, ApiHelpers } from '@/modules/api'

// if you want to use MOCK DATA set 'localhost' for BASE_URL
//   otherwise set your end point for BASE_URL

const BASE_URL = import.meta.env.VITE_API_ADDRESS

interface GlobalServiceInterface {
  service: ApiClient
  helpers: ApiHelpers
}

// Initialize with null instead of undefined to avoid initialization issues
export let globalServices: GlobalServiceInterface | null = null

export function useGlobal(): GlobalServiceInterface {
  if (!globalServices) {
    const service = new ApiClient(BASE_URL)
    const helpers = new ApiHelpers(service)
    globalServices = { service, helpers }
  }
  return globalServices
}

export function useHelpers() {
  return useGlobal().helpers
}

export function useServices() {
  return useGlobal().service
}
