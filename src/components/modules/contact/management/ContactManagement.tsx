import { DataTable } from '@/components/global/DataTable'
import { useContactManagement } from './useContactManagement'
import { Button } from '@/components/ui/button'
import { MonitorPlay } from 'lucide-react'
import { Input } from '@/components/ui/input'
import type { HubDomainState } from '@/interfaces'
import { HubspotBadge } from '@/components/global/HubspotBadge'
import CreateContactModal from './CreateContactModal'
import EditContactDialog from './EditContactDialog'

export interface ContactManagementProps {
  hubDomain: HubDomainState[0]
  setHubDomain: HubDomainState[1]
}

export default function ContactManagement({ hubDomain, setHubDomain }: ContactManagementProps) {
  const {
    t,
    hubDomain: currentHubDomain,
    search,
    setSearch,
    setRowSelection,
    handleCreate,
    handleUpdate,
    editContact,
    setEditContact,
    handleHubspotLogin,
    runContactSendLocal,
    filteredRows,
    columns,
  } = useContactManagement({ hubDomain, setHubDomain })

return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="text-2xl font-semibold">{t('contact.title')}</h1>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">

          <CreateContactModal onSubmit={handleCreate} t={t} />

          <div className="flex w-full gap-2 justify-center order-2 sm:order-2 sm:w-auto sm:justify-start">
            
            {currentHubDomain ? (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 sm:gap-2"
                onClick={runContactSendLocal}
              >
                <MonitorPlay className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {t('contact.runContactSendLocal') || 'Run Contact Send (Locally)'}
                </span>
              </Button>
            ) : import.meta.env.DEV ? (
              <Button
                variant="outline"
                size="sm"
                className="flex items-center gap-1 sm:gap-2"
                onClick={runContactSendLocal}
              >
                <MonitorPlay className="h-4 w-4" />
                <span className="hidden sm:inline">
                  {t('contact.runContactSendLocal') || 'Run Contact Send (Locally)'}
                </span>
              </Button>
            ) : null}

            <HubspotBadge
              currentHubDomain={currentHubDomain}
              onConnect={handleHubspotLogin}
              label={t('contact.hubspot')}
            />
          </div>
          <Input
            placeholder={t('keyword.search')}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-8 w-full sm:w-60 order-1 sm:order-1"
          />
        </div>
      </div>
      <DataTable columns={columns} data={filteredRows} onRowSelectionChange={setRowSelection} rowSelectionMode={"single"}/>
      <EditContactDialog                                
        open={Boolean(editContact)}                     
        contact={editContact}                           
        onOpenChange={(o) => !o && setEditContact(null)}
        onSubmit={handleUpdate}                         
        t={t}                                           
      />  
    </div>
  )
}
