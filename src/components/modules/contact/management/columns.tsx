import type { ColumnDef } from '@tanstack/react-table'
import { Checkbox } from '@/components/ui/checkbox'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { MoreVertical } from 'lucide-react'
import type { ContactTemplateBase } from '@/interfaces'

export interface ColumnCallbacks {
  t: (key: string) => string
  confirm: (fn: () => void) => void
  setEditContact: (c: ContactTemplateBase) => void
  handleDelete: (id: number) => void
}

export function getColumns({ t, confirm, setEditContact, handleDelete }: ColumnCallbacks): ColumnDef<ContactTemplateBase>[] {
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
            onCheckedChange={value => table.toggleAllPageRowsSelected(!!value)}
            aria-label="Select all"
          />
        </div>
      ),
      cell: ({ row }) => (
        <div className="flex items-center justify-start">
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={value => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        </div>
      ),
      enableSorting: false,
      enableHiding: false,
    },
    { accessorKey: 'last', header: t('contact.lastName') },
    { accessorKey: 'first', header: t('contact.firstName') },
    { accessorKey: 'last_kana', header: t('contact.lastKana') },
    { accessorKey: 'first_kana', header: t('contact.firstKana') },
    { accessorKey: 'last_hira', header: t('contact.lastHira') },
    { accessorKey: 'first_hira', header: t('contact.firstHira') },
    { accessorKey: 'email', header: t('contact.email') },
    { accessorKey: 'company', header: t('contact.company') },
    { accessorKey: 'department', header: t('contact.department') },
    { accessorKey: 'url', header: t('contact.url') },
    { accessorKey: 'phone1', header: t('contact.phone1') },
    { accessorKey: 'phone2', header: t('contact.phone2') },
    { accessorKey: 'phone3', header: t('contact.phone3') },
    { accessorKey: 'zip1', header: t('contact.zip1') },
    { accessorKey: 'zip2', header: t('contact.zip2') },
    { accessorKey: 'address1', header: t('contact.address1') },
    { accessorKey: 'address2', header: t('contact.address2') },
    { accessorKey: 'address3', header: t('contact.address3') },
    { accessorKey: 'subject', header: t('contact.subject') },
    {
      accessorKey: "body",
      header: t("contact.body"),
      cell: ({ getValue }) => (
        <div className="w-[300px] max-h-24 overflow-y-auto whitespace-pre-wrap">
          {getValue<string>()}
        </div>
      ),
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
            <DropdownMenuItem onSelect={() => setEditContact(row.original)}>
              {t('contact.contactUpdate')}
            </DropdownMenuItem>
            <DropdownMenuItem
              variant="destructive"
              onSelect={() => confirm(() => handleDelete(row.original.id))}
            >
              {t('contact.contactDelete')}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ]
}
