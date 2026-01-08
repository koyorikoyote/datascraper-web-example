import { useFormatDate } from "@/hooks/useFormatDate"

export function DateCell({ date }: { date?: string | null }) {
  const formatDate = useFormatDate()
  return <>{formatDate(date) || '-'}</>
}