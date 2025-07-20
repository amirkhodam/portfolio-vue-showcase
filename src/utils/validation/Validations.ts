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
