import { i18n } from '@/utils/validation/i18n'
import { defineRule } from 'vee-validate'
import { useServices } from '@/lib/services'

function checkRegex(value: string, expression: RegExp): boolean {
  return expression.test(value)
}

export function internetProviderTest(value: string): boolean {
  const expression = /^[A-Za-z0-9\s.\-()':]+$/
  return !value || checkRegex(value, expression)
}

export function emailTest(value: string): boolean {
  const expression =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return !value || checkRegex(value, expression)
}

export function zipCodeCheck(value: string): boolean {
  const expression =
    /^\d{5}(-\d{4})?$|^[ABCEGHJ-NPRSTVXY]\d[ABCEGHJ-NPRSTV-Z] ?\d[ABCEGHJ-NPRSTV-Z]\d$/i
  return !value || checkRegex(value, expression)
}

export function channelTest(value: string): boolean {
  const checkIsNan = isNaN(Number(value))
  let checkIsInRange: boolean = false
  let checkIsInteger: boolean = false
  if (!checkIsNan) {
    checkIsInRange = parseInt(value) <= 64 && parseInt(value) > 0
    checkIsInteger = parseFloat(value) % 1 == 0
  }
  return !checkIsNan && checkIsInRange && checkIsInteger
}

export function phoneTest(value: string): boolean {
  const phoneRegex = /^\d{?:11|12|13|14}$/
  return !value || checkRegex(value, phoneRegex)
}

export function portTest(value: string): boolean {
  const checkIsNan = isNaN(Number(value))
  let checkIsInRange: boolean = false
  let checkIsInteger: boolean = false
  if (!checkIsNan) {
    checkIsInRange = parseInt(value) <= 65535 && parseInt(value) > 0
    checkIsInteger = parseFloat(value) % 1 == 0
  }
  return !checkIsNan && checkIsInRange && checkIsInteger
}

export function securePortTest(value: string): boolean {
  const checkIsNan = isNaN(Number(value))
  let checkIsInRange: boolean = false
  let checkIsInteger: boolean = false
  if (!checkIsNan) {
    checkIsInRange = parseInt(value) <= 65535 && parseInt(value) >= 0
    checkIsInteger = parseFloat(value) % 1 == 0
  }
  return !checkIsNan && checkIsInRange && checkIsInteger
}

export function nameTest(value: string): boolean {
  const nameRegex = /^.{1,74}$/
  return !value || checkRegex(value, nameRegex)
}

export function workspaceNameTest(value: string): boolean {
  const nameRegex = /^[A-Za-z0-9\s.\-()':]+$/
  return !value || checkRegex(value, nameRegex)
}

export function descriptionTest(value: string): boolean {
  const descriptionRegex = /^[A-Za-z0-9\s.\-!@#$%&*()'":\\/,?`]+$|^$/
  return !value || checkRegex(value, descriptionRegex)
}

export function urlTest(value: string): boolean {
  const ipv4Regex = /^(?:[0-9]{1,3}\.){3}[0-9]{1,3}$/
  let invalidURL: boolean = false
  try {
    new URL(value)
  } catch {
    invalidURL = true
  }
  return !value || !invalidURL || checkRegex(value, ipv4Regex)
}

export function urlTestV2(value: string): boolean {
  const pattern = new RegExp(
    '^(((^|, )(https?|rtsp)):\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR IP (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', // fragment locator
    'i'
  )
  return pattern.test(value)
}

defineRule('required', <T>(value: T): true | string => {
  return !!value || i18n.global.t('required')
})
defineRule('internetProvider', (value: string): true | string => {
  return internetProviderTest(value) || i18n.global.t('internetProviderNotValid')
})
defineRule('email', (value: string): true | string => {
  return emailTest(value) || i18n.global.t('emailNotValid')
})
defineRule('minChar', (value: string, [limit]: number[]): true | string => {
  return !value || value.length >= limit || i18n.global.t('minChar', { min: limit })
})
defineRule('maxChar', (value: string, [limit]: number[]): true | string => {
  return !value || value.length <= limit || i18n.global.t('maxChar', { max: limit })
})
defineRule('isSame', <T>(value: T, [limit]: unknown[]): true | string => {
  return !value || value === limit || i18n.global.t('valueNotMatch')
})
defineRule('isLess', (value: number, [limit]: number[]): true | string => {
  return !value || value <= limit || i18n.global.t('valueNotLess')
})
defineRule('isBetween', (value: number, [min, max]: number[]): true | string => {
  if (!value) {
    return true
  }
  const numericValue = Number(value)
  if (numericValue < min) {
    return i18n.global.t('valueNotLess', { min: min })
  }
  if (numericValue > max) {
    return i18n.global.t('valueNotGreat', { max: max })
  }
  return true
})
defineRule('isNumber', (value: string): true | string => {
  const expression = /^[0-9]*$/
  return checkRegex(value, expression) || i18n.global.t('mustNumber')
})
defineRule('isString', (value: unknown): true | string => {
  return value === 'string' || i18n.global.t('mustString')
})
defineRule('passwordAtLast10', (value: string): true | string => {
  const expression = /^.{10,}$/
  return checkRegex(value, expression) || i18n.global.t('atLeast10')
})
defineRule('passwordOneUpperCase', (value: string): true | string => {
  const expression = /[A-Z]/
  return checkRegex(value, expression) || i18n.global.t('oneUpper')
})
defineRule('passwordOneNumber', (value: string): true | string => {
  const expression = /\d/
  return checkRegex(value, expression) || i18n.global.t('oneNumber')
})
defineRule('passwordOneSpecialCharacter', (value: string): true | string => {
  const expression = /[$&+,:;=?@#|'<>.^*()%!-]/
  return checkRegex(value, expression) || i18n.global.t('oneSpecial')
})

defineRule('passwordStrongEnough ', async (value: string): Promise<true | string> => {
  try {
    const passResponse = await useServices().authenticationManager.user.passwordStrengthCheckDto(
      value.toString()
    )
    // @ts-ignore
    if (passResponse.score > 3 || passResponse.score === 3) {
      return true
    } else {
      return i18n.global.t('enoughStrong')
    }
  } catch (e) {
    return i18n.global.t('enoughStrong')
  }
})
