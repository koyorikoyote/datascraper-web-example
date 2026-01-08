import { useState, useEffect } from 'react'
import { useTranslation } from '@/context/i18n/useTranslation'
import type { BatchResponse } from '@/interfaces/batch.types'
import { getColumns } from './columns'
import { batchHistoryApi } from '@/api/batch_history'
import { ExecutionIdConst } from '@/constants/execution-type'
import { filterRows } from '@/utils/deep-match'

export function useBatchHistory() {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [data, setData] = useState<BatchResponse[]>([])

  useEffect(() => {
    fetchBatchHistory()
  }, [])

  const fetchBatchHistory = async () => {
    const response = await batchHistoryApi.list({
      execution_id_list: [
        ExecutionIdConst.URL_FETCH,
        ExecutionIdConst.RANK_FETCH,
        ExecutionIdConst.CSV_EXPORT,
        ExecutionIdConst.PARTIAL_RANK_FETCH
      ]
    })
    setData(response.data || [])
  }

  const getBatchById = (id: number) => {
    return data.find(batch => batch.id === id)
  }

  const columns = getColumns(t)
  const needle = search.trim().toLowerCase()

  const filteredRows = filterRows(data, needle)
  
  return { 
    t, 
    search, 
    setSearch, 
    filteredRows, 
    columns, 
    getBatchById 
  }
}
