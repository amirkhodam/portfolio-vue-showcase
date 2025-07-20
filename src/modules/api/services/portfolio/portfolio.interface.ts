import type { ITranslatedStrings } from '@/modules/api'

export interface IPortfolio {
  id: string
  title: ITranslatedStrings
  videos: string[]
  images: string[]
  texts: ITranslatedStrings
  createdAt: Date
  updatedAt: Date
}
