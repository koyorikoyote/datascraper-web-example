import { useEffect, useState } from 'react'
import { useTranslation } from '@/context/i18n/useTranslation'
import api from '@/api'
import { getColumns } from './columns'
import type { BatchDetailResponse } from '@/interfaces'
import { filterRows } from '@/utils/deep-match';

export function useCompanyTable(batchId: number) {
  const [companies, setCompanies] = useState<BatchDetailResponse[]>([])
  const [search, setSearch] = useState('')
  const { t } = useTranslation()

  useEffect(() => {
    loadData()
  }, [])

  
  const loadData = async () => {
    const res = await api.hubspot.listCompanies({
      batch_id: batchId
    });
    setCompanies(res.data)
  }

  const columns = getColumns(t)
  const needle = search.trim().toLowerCase();

  const filteredRows = filterRows(companies, needle)

  return {
    t,
    columns,
    filteredRows,
    search,
    setSearch,
  }
}