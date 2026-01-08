import { MoreVertical } from 'lucide-react'
import type { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { formatLocaleLabel } from '@/utils/helper'
import type { User } from './types'

export interface ColumnCallbacks {
  t: (key: string) => string
  confirm: (fn: () => void) => void
  setEditUser: (user: User) => void
  handleDelete: (id: number) => void
}

export function getColumns({ t, confirm, setEditUser, handleDelete }: ColumnCallbacks): ColumnDef<User>[] {
  return [
    { accessorKey: 'full_name', header: t('user.fullName') },
    { accessorKey: 'email', header: t('user.email') },
    {
      id: 'role',
      header: t('user.role'),
      accessorFn: row => formatLocaleLabel(row.role_id, 'roles', t),
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
            <DropdownMenuItem onSelect={() => setEditUser(row.original)}>
              {t('user.update')}
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => confirm(() => handleDelete(row.original.id))}
            >
              {t('user.delete')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]
}
