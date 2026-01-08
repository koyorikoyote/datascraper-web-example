import axios from "@/lib/api"
import type {
  SQSQueueStats,
  SQSMonitorResponse,
  SQSDeleteRequest,
  SQSDeleteResponse,
  SQSMessageHistory
} from "@/interfaces/sqs.types"

export const sqsApi = {
  // Get basic queue statistics (lightweight)
  getQueueStats: () =>
    axios.get<SQSQueueStats>("/sqs/queue/stats", { withCredentials: true }),

  // Get all messages from queues (detailed)
  getMessages: (maxMessages: number = 100, includeInFlight: boolean = false) =>
    axios.get<SQSMonitorResponse>(`/sqs/messages?max_messages=${maxMessages}&include_in_flight=${includeInFlight}`, { withCredentials: true }),

  // Delete a message from the queue
  deleteMessage: (data: SQSDeleteRequest) =>
    axios.delete<SQSDeleteResponse>("/sqs/messages", {
      data,
      withCredentials: true
    }),

  // Get message history
  getHistory: (limit: number = 10, status?: string | string[]) => {
    let url = `/sqs/history?limit=${limit}`
    if (status) {
      if (Array.isArray(status)) {
        // Multiple statuses: &status=completed&status=failed
        status.forEach(s => {
          url += `&status=${s}`
        })
      } else {
        // Single status
        url += `&status=${status}`
      }
    }
    return axios.get<SQSMessageHistory[]>(url, { withCredentials: true })
  },

  // Get failed messages
  getFailedMessages: (limit: number = 10, includeDlq: boolean = true) =>
    axios.get<SQSMessageHistory[]>(`/sqs/history/failed?limit=${limit}&include_dlq=${includeDlq}`, { withCredentials: true }),

  // Cancel a queued job by SQS Message ID (fallback when jobId is missing)
  cancelJobByMessageId: (sqsMessageId: string) =>
    axios.post(`/sqs/cancel/sqs-message/${sqsMessageId}`, null, { withCredentials: true }),

  // Cancel a queued job
  cancelJob: (jobId: string) =>
    axios.post(`/sqs/cancel/${jobId}`, null, { withCredentials: true }),
}