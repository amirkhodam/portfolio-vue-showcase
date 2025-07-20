export function getOS() {
  const userAgent = window.navigator.userAgent
  const platform = window.navigator.platform
  const macosPlatforms = ['Macintosh', 'MacIntel', 'MacPPC', 'Mac68K']
  const windowsPlatforms = ['Win32', 'Win64', 'Windows', 'WinCE']
  const iosPlatforms = ['iPhone', 'iPad', 'iPod']

  if (macosPlatforms.includes(platform)) {
    return 'MacOS'
  } else if (iosPlatforms.includes(platform)) {
    return 'iOS'
  } else if (windowsPlatforms.includes(platform)) {
    return 'Windows'
  } else if (/Android/.test(userAgent)) {
    return 'Android'
  } else if (/Linux/.test(platform)) {
    return 'Linux'
  }

  return null
}

export function isMobile() {
  return /Mobi|Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    window.navigator.userAgent
  )
}
