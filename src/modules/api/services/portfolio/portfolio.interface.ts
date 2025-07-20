import type { ITranslatedString, ITranslatedStrings } from '@/modules/i18n'

export interface IPortfolio {
  id: string
  title: ITranslatedString
  videos: string[]
  images: string[]
  texts: ITranslatedStrings
  createdAt: Date
  updatedAt: Date
}
