import { useState, useCallback, useMemo } from 'react'
import en from '@/locales/en.json'
import ja from '@/locales/ja.json'
import { I18nContext } from './I18nContext'
import type { Language } from './I18nContext'

const resources = { en, ja } as const

function translate(
  lang: Language,
  key: string,
  vars?: Record<string, string | number>
): string {
  const keys = key.split('.')
  let result: unknown = resources[lang]
  for (const k of keys) {
    if (typeof result === 'object' && result != null && k in result) {
      result = (result as Record<string, unknown>)[k]
    } else {
      return key
    }
  }
  if (typeof result === 'string') {
    let text = result
    if (vars) {
      for (const [k, v] of Object.entries(vars)) {
        text = text.replace(`{{${k}}}`, String(v))
      }
    }
    return text
  }
  return key
}

export function I18nProvider({ children }: { children: React.ReactNode }) {
  // Get the language from localStorage or default to 'en'
  const [lang, setLangState] = useState<Language>(() => {
    const savedLang = localStorage.getItem('language') as Language
    return savedLang === 'en' || savedLang === 'ja' ? savedLang : 'ja'
  })

  // Update language in state and localStorage
  const setLang = useCallback((newLang: Language) => {
    localStorage.setItem('language', newLang)
    setLangState(newLang)
  }, [])

  const t = useCallback((key: string, vars?: Record<string, string | number>) => {
    return translate(lang, key, vars)
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t }), [lang, setLang, t])

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}
