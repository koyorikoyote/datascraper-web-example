import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { useEffect, useState } from 'react'
import { sqsApi } from '@/api/sqs'
import type { SQSMessageHistory } from '@/interfaces/sqs.types'
import { Loader2 } from 'lucide-react'
import { QueueItem } from './QueueItem'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useTranslation } from '@/context/i18n/useTranslation'

export function CurrentlyProcessing() {
  const { t } = useTranslation()
  const [processingJobs, setProcessingJobs] = useState<SQSMessageHistory[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProcessingJobs = async () => {
      try {
        setLoading(true)
        setError(null)
        // Fetch jobs with status=processing from history
        const response = await sqsApi.getHistory(10, 'processing')
        console.log('Processing jobs from history:', response.data)
        setProcessingJobs(response.data)
      } catch (err) {
        console.error('Failed to fetch processing jobs:', err)
        setError('Failed to load processing jobs')
      } finally {
        setLoading(false)
      }
    }

    fetchProcessingJobs()
    // Refresh every 10 seconds for more real-time updates
    const interval = setInterval(fetchProcessingJobs, 10000)

    return () => clearInterval(interval)
  }, [])

  return (
    <Card>
      <CardHeader className="pb-3 pt-4">
        <CardTitle className="text-sm font-semibold">
          {t('sqs.currentlyProcessing')} {processingJobs.length > 0 && `(${processingJobs.length})`}
        </CardTitle>
      </CardHeader>
      <CardContent className="pt-0">
        {loading ? (
          <div className="flex items-center gap-2 text-sm text-muted-foreground pb-4">
            <Loader2 className="h-4 w-4 animate-spin" />
            {t('sqs.loading')}
          </div>
        ) : error ? (
          <div className="text-sm text-destructive pb-4">{error}</div>
        ) : processingJobs.length > 0 ? (
          <ScrollArea className="h-[136px]">
            <div className="space-y-1 pr-4">
              {processingJobs.map((job) => (
                <QueueItem
                  key={job.id}
                  message={{
                    message_id: job.sqs_message_id,
                    status: 'in_flight',
                    message_type: job.message_type,
                    keyword_ids: job.keyword_ids,
                    keywords: job.message_body?.keywords,
                    user_id: job.user_id,
                    user_full_name: job.user_full_name,
                    sent_timestamp: job.started_processing_at || job.created_at,
                    retry_count: job.retry_count,
                    receive_count: job.receive_count
                  }}
                  type="processing"
                />
              ))}
            </div>
          </ScrollArea>
        ) : (
          <div className="text-sm text-muted-foreground pb-4">{t('sqs.noJobsProcessing')}</div>
        )}
      </CardContent>
    </Card>
  )
}
