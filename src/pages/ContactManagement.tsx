import ContactManagement from '@/components/modules/contact/management/ContactManagement'
import ContactBatchHistory from '@/components/modules/contact/batch/ContactBatchHistory'
/* import HubspotCompanyTable from '@/components/modules/contact/company/HubspotCompanyTable' */
import { useState } from 'react'
import type { HubDomainState } from '@/interfaces'
import ContactBatchHistoryDetails from '@/components/modules/contact/batch/details/ContactBatchHistoryDetails'
import { useParams } from 'react-router-dom'

export default function ContactManagementPage() {
  const hubDomainState: HubDomainState = useState<string | null>(null)
  const [hubDomain, setHubDomain] = hubDomainState
  const { id } = useParams<{ id?: string }>();
  const batchId = id ? Number(id) : undefined;

  return (
    <div className="space-y-10">
      {batchId !== undefined ? (
          <ContactBatchHistoryDetails batchId={batchId} />
        ) : (
          <>
            <ContactManagement 
              hubDomain={hubDomain} 
              setHubDomain={setHubDomain} 
            />
            <ContactBatchHistory 
              hubDomain={hubDomain} 
            />
          </>
        )
      }

      {/* <HubspotCompanyTable hubDomain={hubDomain} setHubDomain={setHubDomain} /> */}
    </div>
  )
}