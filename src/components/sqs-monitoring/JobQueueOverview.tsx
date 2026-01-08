import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import { QueueItem } from './QueueItem'
import { useEffect, useState } from 'react'
import { sqsApi } from '@/api/sqs'
import type { SQSMessageHistory } from '@/interfaces/sqs.types'
import { Loader2 } from 'lucide-react'
import { useTranslation } from '@/context/i18n/useTranslation'

export function JobQueueOverview() {
  const { t } = useTranslation()
  const [completedAndFailedJobs, setCompletedAndFailedJobs] = useState<SQSMessageHistory[]>([])
  const [queuedJobs, setQueuedJobs] = useState<SQSMessageHistory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchMessages = async () => {
    try {
      setError(null)

      // Fetch queued jobs from history
      try {
        const queuedResponse = await sqsApi.getHistory(10, 'queued')
        console.log('Queued jobs from history:', queuedResponse.data)
        setQueuedJobs(queuedResponse.data)
      } catch (queuedErr: any) {
        console.warn('Failed to fetch queued jobs:', queuedErr.message)
        setQueuedJobs([])
      }

      // Fetch completed and failed jobs with multiple status filters
      try {
        const historyResponse = await sqsApi.getHistory(10, ['completed', 'failed'])
        console.log('Completed and failed jobs from history:', historyResponse.data)
        setCompletedAndFailedJobs(historyResponse.data)
      } catch (historyErr: any) {
        const errorMessage = historyErr.response?.data?.detail || historyErr.message || ''
        if (errorMessage.includes('not among the defined enum values')) {
          console.warn('Enum mismatch in message history - backend needs update:', errorMessage)
        } else {
          console.warn('History endpoint not available:', errorMessage)
        }
        setCompletedAndFailedJobs([])
      }
    } catch (err: any) {
      console.error('Failed to fetch SQS messages:', err)
      console.error('Error details:', err.response?.data || err.message)
      setError(`Failed to load queue messages: ${err.response?.data?.detail || err.message}`)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMessages()
    // Refresh every 30 seconds
    const interval = setInterval(fetchMessages, 30000)

    return () => clearInterval(interval)
  }, [])

  const waitingJobs = queuedJobs


  if (loading) {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">{t('sqs.jobQueueOverview')}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Loader2 className="h-4 w-4 animate-spin" />
            {t('sqs.loadingQueueData')}
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card className="h-full flex flex-col">
        <CardHeader className="pb-3">
          <CardTitle className="text-base font-semibold">{t('sqs.jobQueueOverview')}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 flex items-center justify-center">
          <div className="text-sm text-destructive">{error}</div>
        </CardContent>
      </Card>
    )
  }
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">{t('sqs.jobQueueOverview')}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <div className="grid grid-cols-2 gap-4 h-full">
          <div className="flex flex-col h-full overflow-hidden">
            <h3 className="text-sm font-medium mb-2">
              {t('sqs.waitingToProcess')} ({waitingJobs.length})
            </h3>
            <ScrollArea className="flex-1 min-h-0">
              <div className="space-y-1 pr-4">
                {waitingJobs.length > 0 ? (
                  waitingJobs.map((job) => (
                    <QueueItem
                      key={job.id}
                      message={{
                        message_id: job.sqs_message_id,
                        job_id: job.job_id,
                        status: 'available',
                        message_type: job.message_type,
                        keyword_ids: job.keyword_ids,
                        keywords: job.message_body?.keywords,
                        user_id: job.user_id,
                        user_full_name: job.user_full_name,
                        sent_timestamp: job.queued_at || job.created_at,
                        retry_count: job.retry_count,
                        receive_count: job.receive_count
                      }}
                      type="waiting"
                      onCancelled={fetchMessages}
                    />
                  ))
                ) : (
                  <div className="text-xs text-muted-foreground">{t('sqs.noJobsWaiting')}</div>
                )}
              </div>
            </ScrollArea>
          </div>
          <div className="flex flex-col h-full overflow-hidden">
            <h3 className="text-sm font-medium mb-2">
              {t('sqs.completedJobs')} ({completedAndFailedJobs.length})
            </h3>
            <ScrollArea className="flex-1 min-h-0">
              <div className="space-y-1 pr-4">
                {completedAndFailedJobs.length > 0 ? (
                  completedAndFailedJobs.map((job) => (
                    <QueueItem
                      key={job.id}
                      message={{
                        message_id: job.sqs_message_id,
                        status: 'available',
                        message_type: job.message_type,
                        keyword_ids: job.keyword_ids,
                        keywords: job.message_body?.keywords,
                        user_id: job.user_id,
                        user_full_name: job.user_full_name,
                        sent_timestamp: job.completed_at || job.created_at,
                        retry_count: job.retry_count,
                        receive_count: job.receive_count,
                        error_details: job.error_details
                      }}
                      type={job.status === 'failed' ? 'failed' : 'completed'}
                    />
                  ))
                ) : (
                  <div className="text-xs text-muted-foreground">{t('sqs.noCompletedJobs')}</div>
                )}
              </div>
            </ScrollArea>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}