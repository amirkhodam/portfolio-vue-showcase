import type { ITranslatedString, ITranslatedStrings } from '@/modules/i18n'

export enum EMediaType {
  IMAGE = 'image',
  VIDEO = 'video'
}

export type TMediaType = `${EMediaType}`

export interface Media {
  id: string
  path: string
  name: string
  index: number
  type: TMediaType
}

export interface IPortfolioCreate {
  title: ITranslatedString
  texts: ITranslatedStrings
}

export interface IPortfolioBase {
  title: ITranslatedString
  media: Media[]
  texts: ITranslatedStrings
}

export type IPortfolioUpdate = IPortfolioBase & {
  id: string
}

export type IPortfolio = IPortfolioBase & {
  id: string
  createdAt: Date
  updatedAt: Date
}

export interface IUploadMedia {
  form: FormData
  id: string
}

export interface IMediaRemove {
  id: string
  mediaId: string
}
