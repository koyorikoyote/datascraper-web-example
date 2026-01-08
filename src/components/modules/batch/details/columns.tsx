import type { ColumnDef } from '@tanstack/react-table'
import StatusBadge from '@/components/global/StatusBadge'
import type { BatchHistoryDetails } from '@/interfaces/batch.types'
import { DateCell } from '@/components/global/DateCell'

export function getColumns(
  t: (key: string) => string
): ColumnDef<BatchHistoryDetails>[] {
  return [
    { accessorKey: 'id', header: t('batch.details.id') },
    { accessorKey: 'batch_id', header: t('batch.details.batchId') },
    { accessorKey: 'target', header: t('batch.details.target') },
    {
      accessorKey: 'status',
      header: t('batch.details.status'),
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
    {
      accessorKey: 'error_message',
      header: t('batch.details.errorMessage'),
      cell: ({ row }) => row.original.error_message || '-',
    },
    {
      accessorKey: 'created_at',
      header: t('batch.details.createdAt'),
      cell: ({ row }) => <DateCell date={row.original.created_at} />,
    }
  ]
}
