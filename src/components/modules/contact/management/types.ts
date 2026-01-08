import type { HubDomainState } from '@/interfaces'


export interface ContactManagementProps {
  hubDomain: HubDomainState[0]
  setHubDomain: HubDomainState[1]
  onFinish: () => void
}