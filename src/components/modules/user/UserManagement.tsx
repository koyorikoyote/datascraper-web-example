import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/global/DataTable'
import { FormModal } from '@/components/global/FormModal'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from '@/components/ui/dialog'
import { useUserManagement } from './useUserManagement'

export default function UserManagement() {
  const {
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
  } = useUserManagement()

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">{t('user.title')}</h1>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <FormModal title={t('user.createUser')} onSubmit={handleCreate}>
            <div className="grid gap-3">
              <Label htmlFor="email">{t('user.email')}</Label>
              <Input id="email" name="email" type="email" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="full_name">{t('user.fullName')}</Label>
              <Input id="full_name" name="full_name" required />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="role_id">{t('user.role')}</Label>
              <select
                id="role_id"
                name="role_id"
                defaultValue=""
                className="border border-input bg-background rounded-md px-3 py-2 text-sm"
                required
              >
                <option value="" disabled>
                  {t('user.role')}
                </option>
                {roles.map(r => (
                  <option key={r.id} value={r.id}>
                    {t(`roles.${r.id}`)}
                  </option>
                ))}
              </select>
            </div>
            <div className="grid gap-3">
              <Label htmlFor="password">{t('user.password')}</Label>
              <Input id="password" name="password" type="password" required />
            </div>
          </FormModal>
          <Input
            placeholder={t('keyword.search')}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className="h-8 w-full sm:w-60"
          />
        </div>
      </div>
      <DataTable columns={columns} data={filteredUsers} enableRowSelection={false} />
      {editUser && (
        <Dialog open={Boolean(editUser)} onOpenChange={open => !open && setEditUser(null)}>
          <DialogContent>
            <form onSubmit={handleUpdate}>
              <DialogHeader>
                <DialogTitle>{t('user.update')}</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 my-4">
                <div className="grid gap-3">
                  <Label htmlFor="edit_full_name">{t('user.fullName')}</Label>
                  <Input id="edit_full_name" name="full_name" defaultValue={editUser.full_name} />
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="edit_role_id">{t('user.role')}</Label>
                  <select
                    id="edit_role_id"
                    name="role_id"
                    defaultValue={editUser.role_id}
                    className="border border-input bg-background rounded-md px-3 py-2 text-sm"
                  >
                    {roles.map(r => (
                      <option key={r.id} value={r.id}>
                        {t(`roles.${r.id}`)}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="grid gap-3">
                  <Label htmlFor="edit_password">{t('user.password')}</Label>
                  <Input id="edit_password" name="password" type="password" />
                </div>
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" type="button">
                    {t('common.cancel')}
                  </Button>
                </DialogClose>
                <Button type="submit">{t('common.save')}</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}
    </div>
  )
}
