import { useEffect, useState, useMemo } from 'react'
import { useParams, useLocation } from 'react-router-dom'
import { useTranslation } from '@/context/i18n/useTranslation'
import type { Serp } from '@/interfaces'
import api from '@/api'
import { getColumns } from './columns'

export function useKeywordPage() {
  const { id } = useParams()
  const keywordId = Number(id) || null
  const [rows, setRows] = useState<Serp[]>([])
  const [search, setSearch] = useState('')
  const location = useLocation()
  const keyword = location.state?.keyword || ''
  const { t } = useTranslation()

  useEffect(() => {
    if (!keywordId) return
    const loadData = async () => {
      try {
        const res = await api.serp.list(keywordId)
        setRows(res.data)
      } catch {
        // errors handled globally
      }
    }
    loadData()
  }, [keywordId])

  const filteredRows = rows.filter(r =>
    r.title.toLowerCase().includes(search.toLowerCase())
  )

  const columns = useMemo(() => getColumns(t), [t])

  return { t, search, setSearch, filteredRows, columns, keyword }
}
