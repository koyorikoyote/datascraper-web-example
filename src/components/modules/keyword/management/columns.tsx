import type { ColumnDef } from '@tanstack/react-table'
import { Link } from 'react-router-dom'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { MoreVertical } from 'lucide-react'
import { DateCell } from '@/components/global/DateCell'
import StatusBadge from '@/components/global/StatusBadge'
import type { KeywordRow, Keyword } from '@/interfaces'

export interface ColumnCallbacks {
  t: (key: string) => string
  confirm: (fn: () => void) => void
  handleRunFetch: (id: number) => void
  handleRunRank: (id: number) => void
  handleRunPartialRank: (id: number) => void
  handleRunExport: (id: number) => void
  handleToggleSchedule: (keyword: Keyword) => void
  handleDelete: (id: number) => void,
  handleUnstick: (id: number) => void,
}

export function getColumns({
  t,
  confirm,
  handleRunFetch,
  handleRunRank,
  handleRunPartialRank,
  handleRunExport,
  handleToggleSchedule,
  handleDelete,
  handleUnstick,
}: ColumnCallbacks): ColumnDef<KeywordRow>[] {
  return [
    {
      id: 'select',
      header: ({ table }) => (
        <div className="flex items-center justify-center">
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && 'indeterminate')
            }
            onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-start">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: 'keyword',
      header: t('keyword.keyword'),
      cell: ({ row }) => {
        const { id, keyword } = row.original
        return (
          <Link
            to={`/keywords/${id}`}
            state={{ keyword }}
            className="text-blue-600 hover:underline"
          >
            {keyword}
          </Link>
        )
      },
      enableHiding: false,
    },
    {
      accessorKey: 'fetch_status',
      header: t('keyword.fetchingStatus'),
      cell: ({ row }) => <StatusBadge status={row.original.fetch_status} />,
    },
    {
      accessorKey: 'partial_rank_status',
      header: t('keyword.partialRankingStatus'),
      cell: ({ row }) => <StatusBadge status={row.original.partial_rank_status} />,
    },
    {
      accessorKey: 'rank_status',
      header: t('keyword.rankingStatus'),
      cell: ({ row }) => <StatusBadge status={row.original.rank_status} />,
    },
    {
      id: 'user',
      header: t('keyword.user'),
      accessorFn: (row) => row.user.full_name,
    },
    {
      accessorKey: 'execution_date',
      header: t('keyword.executionDate'),
      cell: ({ row }) => <DateCell date={row.original.execution_date} />,
    },
    {
      accessorKey: 'total_items',
      header: t('keyword.totalItems'),
    },
    {
      accessorKey: 'total_a_rank',
      header: t('keyword.aRank'),
    },
    {
      accessorKey: 'total_b_rank',
      header: t('keyword.bRank'),
    },
    {
      accessorKey: 'total_c_rank',
      header: t('keyword.cRank'),
    },
    {
      accessorKey: 'total_d_rank',
      header: t('keyword.dRank'),
    },
    {
      accessorKey: 'is_scheduled',
      header: t('keyword.scheduled'),
      cell: ({ row }) => (row.original.is_scheduled ? t('common.yes') : t('common.no')),
    },
    {
      id: 'actions',
      header: t('keyword.actions'),
      cell: ({ row }) => (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <MoreVertical className="size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => handleRunFetch(row.original.id)}>
              {t('keyword.runFetch')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleRunRank(row.original.id)}>
              {t('keyword.runRank')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleRunPartialRank(row.original.id)}>
              {t('keyword.runPartialRank')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleRunExport(row.original.id)}>
              {t('keyword.download')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleToggleSchedule(row.original)}>
              {t('keyword.toggleSchedule')}
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleUnstick(row.original.id)}>
              {t('keyword.unstick')}
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onClick={() => confirm(() => handleDelete(row.original.id))}
            >
              {t('keyword.delete')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]
}
