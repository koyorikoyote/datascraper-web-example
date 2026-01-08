import { Input } from '@/components/ui/input'
import { DataTable } from '@/components/global/DataTable'
import { useCompanyTable } from './useCompanyTable'
import { Breadcrumb } from '@/components/global/BreadcrumbComponent';

interface ContactBatchHistoryDetailsProps {
  batchId: number;
}

export default function ContactBatchHistoryDetails({ batchId }: ContactBatchHistoryDetailsProps) {
  const { t, search, setSearch, filteredRows, columns} = useCompanyTable(batchId)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Breadcrumb
          items={[
            { label: t('contact.title'), to: '/contact' },
            { label: batchId.toString() }
          ]}
        />
        <Input
          placeholder={t('keyword.search')}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="h-8 w-full sm:w-60"
        />
      </div>
      <DataTable columns={columns} data={filteredRows} enableRowSelection={false} />
    </div>
  )
}
