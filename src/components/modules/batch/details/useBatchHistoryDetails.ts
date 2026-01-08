import { useTranslation } from '@/context/i18n/useTranslation'
import type { BatchResponse } from '@/interfaces/batch.types'
import { getColumns } from './columns'

export function useBatchHistoryDetails(batchData: BatchResponse | undefined) {
  const { t } = useTranslation()

  const columns = getColumns(t)
  const details = batchData?.details || []

  return {
    t,
    columns,
    details,
    batchData
  }
}
