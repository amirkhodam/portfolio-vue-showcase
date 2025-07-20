export enum ELanguages {
  en = 'en',
  fr = 'fr',
}

export type ITranslatedString = {
  [key in ELanguages]: string
}

export type ITranslatedStrings = {
  [key in ELanguages]: Array<string>
}
