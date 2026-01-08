import { useTranslation } from '@/context/i18n/useTranslation'
import type { Language } from '@/context/i18n/I18nContext'

export function LanguageSwitcher() {
  const { lang, setLang } = useTranslation()
  return (
    <select
      className="border border-gray-700 rounded-md text-sm bg-gray-900 text-white px-2 py-1"
      value={lang}
      onChange={(e) => setLang(e.target.value as Language)}
    >
      <option value="en">English</option>
      <option value="ja">日本語</option>
    </select>
  )
}