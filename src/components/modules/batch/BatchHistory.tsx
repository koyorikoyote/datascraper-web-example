import { Input } from '@/components/ui/input'
import { DataTable } from '@/components/global/DataTable'
import { useBatchHistory } from './useBatchHistory'
import { useParams } from 'react-router-dom'
import BatchHistoryDetails from './details/BatchHistoryDetails'

export default function BatchHistory() {
  const { id } = useParams<{ id?: string }>()
  const { t, search, setSearch, filteredRows, columns, getBatchById } = useBatchHistory()

  // If id is provided, show the details view
  if (id) {
    const batchId = parseInt(id, 10)
    const batchData = getBatchById(batchId)

    if (!batchData) {
      return (
        <div className="space-y-6">
          <h1 className="text-2xl font-semibold">{t('batch.notFound')}</h1>
        </div>
      )
    }

    return <BatchHistoryDetails batchData={batchData} />
  }

  // Otherwise, show the list view
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t('batch.title')}</h1>
      <Input
        placeholder={t('keyword.search')}
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="h-8 w-full sm:w-60"
      />
      <DataTable columns={columns} data={filteredRows} enableRowSelection={false} />
    </div>
  )
}
