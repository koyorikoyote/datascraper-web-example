import { createContext } from 'react'

export type Language = 'en' | 'ja'

export interface I18nContextValue {
  lang: Language
  setLang: (lang: Language) => void
  t: (key: string, vars?: Record<string, string | number>) => string
}

export const I18nContext = createContext<I18nContextValue>({
  lang: 'ja',
  setLang: () => {},
  t: (key: string) => key,
})
