import type { ColumnDef } from '@tanstack/react-table'
import StatusBadge from '@/components/global/StatusBadge'
import type { BatchResponse } from '@/interfaces/batch.types'
import { DateCell } from '@/components/global/DateCell'
import { Link } from 'react-router-dom'
import type { HubDomainState } from '@/interfaces'

export function getColumns(
  t: (key: string) => string, 
  hubDomain: HubDomainState[0]
): ColumnDef<BatchResponse>[] {
  return [
    { accessorKey: 'id', 
      header: t('contact.batch.id'),
      cell: ({ row }) => {
        const { id } = row.original
        return (
          hubDomain ? (
            <Link
              to={`/contact/${id}`}
              state={{ id }}
              className="text-blue-600 hover:underline"
            >
              {id}
            </Link>
          ) : (
            <span>{id}</span>
          )
        )
      },
    },
    {
      accessorKey: 'status',
      header: t('contact.batch.status'),
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      id: 'user',
      header: t('contact.batch.user'),
      accessorFn: row => row.user.full_name,
    },
    {
      accessorKey: 'created_at',
      header: t('contact.batch.createdAt'),
      cell: ({ row }) => <DateCell date={row.original.created_at} />,
    },
    { accessorKey: 'total_url', header: t('contact.batch.totalUrl') },
    { accessorKey: 'total_success_url', header: t('contact.batch.totalSuccessUrl') },

  ]
}
