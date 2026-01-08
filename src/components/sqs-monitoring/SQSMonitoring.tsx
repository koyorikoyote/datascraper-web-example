import { JobQueueOverview } from './JobQueueOverview'
import { CurrentlyProcessing } from './CurrentlyProcessing'
import { useTranslation } from '@/context/i18n/useTranslation'

export function SQSMonitoring() {
  const { t } = useTranslation()

  return (
    <div className="h-full bg-slate-50 rounded-lg p-4 flex flex-col">
      <h2 className="text-lg font-bold mb-4">{t('sqs.monitoring')}</h2>
      <div className="flex-1 flex flex-col gap-4 min-h-0">
        <div className="flex-1 min-h-0">
          <JobQueueOverview />
        </div>
        <CurrentlyProcessing />
      </div>
    </div>
  )
}