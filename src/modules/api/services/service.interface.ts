export enum ELanguages {
  en = 'en',
}

export type ITranslatedStrings = {
  [key in ELanguages]: string
}
