import { Input } from '@/components/ui/input'
import { DataTable } from '@/components/global/DataTable'
import { useKeywordPage } from './useKeywordPage'
import { Breadcrumb } from '@/components/global/BreadcrumbComponent'

export default function KeywordPage() {
  const { t, search, setSearch, filteredRows, columns, keyword } = useKeywordPage()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Breadcrumb
          items={[
            { label: t('keyword.title'), to: '/keywords' },
            { label: keyword }
          ]}
        />
        <Input
          placeholder={t('serp.search')}
          value={search}
          onChange={e => setSearch(e.target.value)}
          className="h-8 w-full sm:w-60"
        />
      </div>
      <DataTable 
        columns={columns} 
        data={filteredRows} 
        defaultSorting={[{ id: 'position', desc: false }]} 
      />
    </div>
  )
}
