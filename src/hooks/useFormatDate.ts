import { useTranslation } from '@/context/i18n/useTranslation'
import { formatDate } from '@/utils/date'

export function useFormatDate() {
  const { lang } = useTranslation()

  return (date?: string | Date | null, options?: Intl.DateTimeFormatOptions) =>
    formatDate(date, lang, options)
}