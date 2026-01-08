import { Input } from '@/components/ui/input'
import { DataTable } from '@/components/global/DataTable'
import { useContactBatchHistory } from './useContactBatchHistory'
import type { HubDomainState } from '@/interfaces'

interface Props {
  hubDomain: HubDomainState[0]
}

export default function ContactBatchHistory({hubDomain}: Props) {
  const { t, search, setSearch, filteredRows, columns } = useContactBatchHistory({hubDomain})

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">{t('contact.batch.title')}</h1>
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
