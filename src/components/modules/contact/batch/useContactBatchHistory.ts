import { useEffect, useState } from 'react'
import { useTranslation } from '@/context/i18n/useTranslation'
import type { BatchResponse } from '@/interfaces/batch.types'
import { getColumns } from './columns'
import api from '@/api'
import type { HubDomainState } from '@/interfaces'
import { filterRows } from '@/utils/deep-match'
import { ExecutionIdConst } from '@/constants/execution-type'

interface Props {
  hubDomain: HubDomainState[0]
}

export function useContactBatchHistory({hubDomain}: Props) {
  const { t } = useTranslation()
  const [search, setSearch] = useState('')
  const [rows, setRows] = useState<BatchResponse[]>([])

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const res = await api.batchHistory.list({execution_id_list: [ExecutionIdConst.CONTACT_SENDING]})
      setRows(res.data)
    } catch {
      // errors handled globally
    }
  }

  const columns = getColumns(t, hubDomain)
  const needle = search.trim().toLowerCase();

  const filteredRows = filterRows(rows, needle)

  return { t, search, setSearch, filteredRows, columns }
}
