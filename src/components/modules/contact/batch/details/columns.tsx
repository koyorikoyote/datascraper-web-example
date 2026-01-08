import type { ColumnDef } from '@tanstack/react-table'
import StatusBadge from '@/components/global/StatusBadge'
import type { BatchDetailResponse } from '@/interfaces/batch.types'
import { DateCell } from '@/components/global/DateCell'
import type { StatusConst } from '@/constants/status'

export function getColumns(
  t: (key: string) => string
): ColumnDef<BatchDetailResponse>[] {
  return [
    { accessorKey: 'id', header: t('contact.batch.detail.id') },
    { 
      accessorKey: 'batch_id', 
      header: t('contact.batch.detail.batch_id'),
      accessorFn: row => row.properties.batch_id,
    },
    { 
      accessorKey: 'domain', 
      header: t('contact.batch.detail.domain'),
      accessorFn: row => row.properties.domain,
      cell: ({ row }) => {
        const domain = row.original.properties.domain;
        return domain ? (
          <a
            href={domain.startsWith('http') ? domain : `https://${domain}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {domain}
          </a>
        ) : '-';
      }      
    },
    { 
      accessorKey: 'name', 
      header: t('contact.batch.detail.name'),
      accessorFn: row => row.properties.name,
    },
    { 
      accessorKey: 'next_action', 
      header: t('contact.batch.detail.next_action'),
      cell: ({ row }) => <DateCell date={row.original.properties.next_action} />,
    },
    {
      accessorKey: 'status',
      header: t('contact.batch.detail.status'),
      cell: ({ row }) => <StatusBadge status={row.original.properties.status as StatusConst ?? undefined} />,
    }
  ]
}
