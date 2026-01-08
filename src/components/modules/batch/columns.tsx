import type { ColumnDef } from '@tanstack/react-table'
import StatusBadge from '@/components/global/StatusBadge'
import type { BatchResponse } from '@/interfaces/batch.types'
import { ExecutionIdConst } from '@/constants/execution-type'
import { Link } from 'react-router-dom'

export function getColumns(t: (key: string) => string): ColumnDef<BatchResponse>[] {
  return [
    {
      accessorKey: 'id', 
      header: t('batch.id'),
      cell: ({ row }) => {
        const { id } = row.original
        return (
          <Link
            to={`/batch-history/${id}`}
            state={{ id }}
            className="text-blue-600 hover:underline"
          >
            {id}
          </Link>
        )
      },
    },
    { 
      accessorKey: 'created_at', 
      header: t('batch.date'),
      cell: ({ row }) => {
        const date = new Date(row.original.created_at)
        return date.toLocaleString()
      }
    },
    {
      accessorKey: 'execution_type_id',
      header: t('batch.executionType'),
      cell: ({ row }) => {
        const executionTypeId = row.original.execution_type_id
        switch (executionTypeId) {
          case ExecutionIdConst.URL_FETCH:
            return t('batch.executionTypes.urlFetch')
          case ExecutionIdConst.RANK_FETCH:
            return t('batch.executionTypes.rankFetch')
          case ExecutionIdConst.CSV_EXPORT:
            return t('batch.executionTypes.csvExport')
          case ExecutionIdConst.PARTIAL_RANK_FETCH:
            return t('batch.executionTypes.partialRankFetch')
          default:
            return executionTypeId
        }
      }
    },
    { accessorKey: 'duration', header: t('batch.duration') },
    {
      id: 'user',
      header: t('batch.user'),
      accessorFn: row => row.user.full_name,
    },
    {
      accessorKey: 'status',
      header: t('batch.status'),
      cell: ({ row }) => <StatusBadge status={row.original.status} />,
    },
  ]
}
