export interface SQSQueueStats {
  main_queue?: {
    ApproximateNumberOfMessages: string;
    ApproximateNumberOfMessagesNotVisible: string;
    ApproximateNumberOfMessagesDelayed: string;
    ApproximateAgeOfOldestMessage?: string;
    MessageRetentionPeriod?: string;
    QueueArn?: string;
    CreatedTimestamp?: string;
    LastModifiedTimestamp?: string;
  };
  dead_letter_queue?: {
    ApproximateNumberOfMessages: string;
    ApproximateNumberOfMessagesNotVisible: string;
    ApproximateNumberOfMessagesDelayed: string;
    ApproximateAgeOfOldestMessage?: string;
    MessageRetentionPeriod?: string;
    QueueArn?: string;
    CreatedTimestamp?: string;
    LastModifiedTimestamp?: string;
  };
  summary?: {
    total_available: number;
    total_in_flight: number;
    total_failed: number;
    total_all: number;
  };
}

export type MessageStatus = "available" | "in_flight" | "failed";
export type MessageType =
  | "fetch"
  | "partial_rank"
  | "full_rank"
  | "fetch_and_rank";

export interface Keyword {
  id: number;
  keyword: string;
}

export interface SQSMessageDetail {
  message_id: string;
  receipt_handle?: string;
  status: MessageStatus;
  job_id?: string;
  message_type?: MessageType;
  keyword_ids?: number[];
  keywords?: Keyword[];
  user_id?: number;
  user_full_name?: string;
  retry_count: number;
  sent_timestamp?: string;
  first_receive_timestamp?: string;
  receive_count: number;
  visibility_timeout?: number;
  body?: Record<string, unknown>;
  attributes?: Record<string, unknown>;
  error_details?: string;
}

export interface SQSQueueMessages {
  queue_url: string;
  queue_type: "main" | "dlq";
  total_messages: number;
  messages: SQSMessageDetail[];
  has_more: boolean;
  fetched_at: string;
}

export interface SQSMonitorResponse {
  main_queue?: SQSQueueMessages;
  dead_letter_queue?: SQSQueueMessages;
  summary: {
    total_available: number;
    total_in_flight: number;
    total_failed: number;
    total_all: number;
  };
  timestamp: string;
}

export interface SQSDeleteRequest {
  message_id: string;
  receipt_handle: string;
}

export interface SQSDeleteResponse {
  success: boolean;
  message_id: string;
  message: string;
  deleted_at: string;
}

export type MessageHistoryStatus =
  | "queued"
  | "processing"
  | "completed"
  | "failed"
  | "dlq"
  | "deleted";

export interface SQSMessageHistory {
  id: number;
  sqs_message_id: string;
  job_id?: string;
  message_type?: MessageType;
  keyword_ids?: number[];
  user_id?: number;
  user_full_name?: string;
  status: MessageHistoryStatus;
  retry_count: number;
  queue_name?: string;
  error_details?: string;
  error_code?: string;
  queued_at?: string;
  started_processing_at?: string;
  completed_at?: string;
  receive_count: number;
  visibility_timeout?: number;
  created_at: string;
  updated_at: string;
  processing_duration_seconds?: number;
  message_body?: {
    job_id?: string;
    keyword_ids?: number[];
    keywords?: Keyword[];
    [key: string]: unknown;
  };
}
