import { AxiosError } from 'axios'
import { UniversalParser } from './'
import { i18n } from '@/modules/i18n'

export class AxiosParser extends UniversalParser {
  parse(error: AxiosError) {
    if (error.response) {
      const serverParser: any = error.response.data
      // const errorParser = this.errorParser(serverParser);
      // const ss = this.convertToText(errorParser);
      if (serverParser) {
        if (serverParser?.message && Object.keys(serverParser.message).length > 0) {
          return serverParser?.message
        } else if (serverParser?.error) {
          return serverParser?.error
        }
      } else if (error.response.statusText) {
        return error.response.statusText
      } else {
        return error.message
      }
    } else if (error.request) {
      return this.parseNetworkError(error)
    } else {
      return this.parseUnknownError(error)
    }
  }

  errorParser(error) {
    if (typeof error === 'string') {
      return i18n.global.t(error)
    } else {
      const { status, message, payload } = error
      if (payload && typeof payload === 'string') {
        return i18n.global.t(payload)
      } else if (payload && typeof payload === 'object') {
        const translatedData = Object.keys(payload).reduce((acc, key) => {
          if (Array.isArray(payload[key])) {
            acc[key] = payload[key].map((item) => i18n.global.t(item))
            return acc
          } else {
            acc[key] = i18n.global.t(payload[key])
            return acc
          }
        }, {})
        return translatedData
      } else if (message) {
        return i18n.global.t(message)
      } else {
        return i18n.global.t(status)
      }
    }
  }

  convertToText(error) {
    if (error && typeof error === 'string') {
      return error
    } else if (error && typeof error === 'object') {
      const firstKey = Object.keys(error)[0]
      if (!firstKey) return i18n.global.t('oop')
      const value = Array.isArray(error[firstKey]) ? error[firstKey].join(',') : error[firstKey]
      return `${firstKey}:${value}`
    }
  }
}
