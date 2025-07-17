import i18n from './i18n'

export default function translateTxt(text: string, data?: Record<string, unknown>): string {
  const { t } = i18n.global
  if (data) return t(text, data)
  else return t(text)
}
