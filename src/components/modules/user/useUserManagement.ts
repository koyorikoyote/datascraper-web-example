import { useEffect, useState } from 'react'
import api from '@/api'
import type { UserRole, UserCreate, UserUpdate } from '@/interfaces'
import { useAlert } from '@/context/alert/useAlert'
import { useTranslation } from '@/context/i18n/useTranslation'
import { toast } from 'sonner'
import type { RowSelectionState } from '@tanstack/react-table'
import { getColumns } from './columns'
import type { User } from './types'

export function useUserManagement() {
  const [users, setUsers] = useState<User[]>([])
  const [roles, setRoles] = useState<UserRole[]>([])
  const [search, setSearch] = useState('')
  const [editUser, setEditUser] = useState<User | null>(null)
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({})

  const { confirm } = useAlert()
  const { t } = useTranslation()

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      const [userRes, roleRes] = await Promise.all([
        api.user.list(),
        api.userRole.list(),
      ])
      setUsers(userRes.data)
      setRoles(roleRes.data)
    } catch {
      // errors handled globally
    }
  }

  const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    const email = formData.get('email')?.toString().trim()
    const full_name = formData.get('full_name')?.toString().trim()
    const password = formData.get('password')?.toString()
    const roleIdStr = formData.get('role_id')?.toString()
    const role_id = roleIdStr ? Number(roleIdStr) : NaN

    if (!email || !password || !role_id || !full_name) {
      toast.error(t('keyword.keywordRequired'))
      return
    }

    const payload: UserCreate = { email, full_name, password, role_id }

    try {
      await api.user.create(payload)
      await loadData()
      toast.success(t('keyword.success'))
    } catch {
      // handled globally
    }
  }

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!editUser) return

    const formData = new FormData(e.currentTarget)
    const full_name = formData.get('full_name')?.toString().trim()
    const password = formData.get('password')?.toString()
    const roleIdStr2 = formData.get('role_id')?.toString()
    const role_id = roleIdStr2 ? Number(roleIdStr2) : NaN

    const payload: UserUpdate = {}
    if (full_name) payload.full_name = full_name
    if (password) payload.password = password
    if (!Number.isNaN(role_id)) payload.role_id = role_id

    try {
      await api.user.update(editUser.id, payload)
      setEditUser(null)
      await loadData()
      toast.success(t('keyword.success'))
    } catch {
      // handled globally
    }
  }

  const handleDelete = async (id: number) => {
    try {
      await api.user.delete(id)
      setUsers(prev => prev.filter(u => u.id !== id))
    } catch {
      // handled globally
    }
  }

  const filteredUsers = users.filter(u =>
    u.email.toLowerCase().includes(search.toLowerCase()) ||
    (u.full_name ?? '').toLowerCase().includes(search.toLowerCase())
  )

  const columns = getColumns({ t, confirm, setEditUser, handleDelete })

  return {
    t,
    roles,
    columns,
    filteredUsers,
    search,
    setSearch,
    handleCreate,
    handleUpdate,
    editUser,
    setEditUser,
    rowSelection,
    setRowSelection,
  }
}
