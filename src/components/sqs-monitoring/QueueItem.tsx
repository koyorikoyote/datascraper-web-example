import { MoreVertical } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { SQSMessageDetail } from "@/interfaces/sqs.types";
import { useTranslation } from "@/context/i18n/useTranslation";
import { sqsApi } from "@/api/sqs";
import { useState } from "react";
import { toast } from "sonner";

interface QueueItemProps {
  message: SQSMessageDetail;
  type: "waiting" | "processing" | "failed" | "completed";
  onCancelled?: () => void;
}

export function QueueItem({ message, type, onCancelled }: QueueItemProps) {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = useState(false);
  const getItemStyles = () => {
    switch (type) {
      case "waiting":
        return "border-l-4 border-l-yellow-500 bg-yellow-50 border-yellow-200 hover:border-blue-500";
      case "processing":
        return "border-l-4 border-l-blue-500 bg-blue-50 border-blue-200 hover:border-blue-600";
      case "failed":
        return "border-l-4 border-l-red-500 bg-red-50 border-red-200 hover:border-red-600";
      case "completed":
        return "border-l-4 border-l-green-500 bg-green-50 border-green-200 hover:border-blue-500";
      default:
        return "border-l-4 border-l-gray-500 bg-gray-50 border-gray-200 hover:border-gray-600";
    }
  };

  const formatMessageType = (type?: string) => {
    if (!type) return t("sqs.messageTypes.unknown");
    const messageTypeKey = `sqs.messageTypes.${type}` as const;
    return t(messageTypeKey) || t("sqs.messageTypes.unknown");
  };

  const formatKeywords = (
    keywords?: { id: number; keyword: string }[],
    ids?: number[]
  ) => {
    // If keywords array is available, use keyword names
    if (keywords && keywords.length > 0) {
      const keywordNames = keywords.map((k) => k.keyword || `ID: ${k.id}`);
      if (keywordNames.length <= 3)
        return `${t("sqs.keywords")}: ${keywordNames.join(", ")}`;
      return `${t("sqs.keywords")}: ${keywordNames
        .slice(0, 3)
        .join(", ")}... (+${keywordNames.length - 3})`;
    }

    // Fall back to keyword IDs
    if (!ids || ids.length === 0) return t("sqs.noKeywords");
    if (ids.length <= 3) return `${t("sqs.keywords")}: ${ids.join(", ")}`;
    return `${t("sqs.keywords")}: ${ids.slice(0, 3).join(", ")}... (+${
      ids.length - 3
    })`;
  };

  const formatTimestamp = (timestamp?: string) => {
    if (!timestamp) return t("sqs.unknownTime");
    try {
      // Backend returns JST timestamps with correct +09:00 offset
      // Parse directly to respect the timezone
      const date = new Date(timestamp);

      // FIX: Waiting jobs (queued_at) are stored as UTC Naive in DB but treated as JST
      // causing a 9-hour lag. We manually add 9 hours for 'waiting' jobs only.
      if (type === 'waiting') {
        date.setHours(date.getHours() + 9);
      }

      const now = new Date();
      
      const diffMs = now.getTime() - date.getTime();
      const diffMins = Math.floor(diffMs / 60000);

      if (diffMins < 1) return t("sqs.justNow");
      if (diffMins < 60) return `${diffMins} ${t("sqs.minutesAgo")}`;

      const diffHours = Math.floor(diffMins / 60);
      if (diffHours < 24) return `${diffHours} ${t("sqs.hoursAgo")}`;

      // For dates more than 24 hours ago, format in JST
      return date.toLocaleString("ja-JP", { 
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZone: "Asia/Tokyo" 
      });
    } catch {
      return t("sqs.unknownTime");
    }
  };

  const handleCancel = async () => {
    console.log("Cancelling job:", message);

    // Check for job_id, if missing try to use message_id (sqs_message_id)
    if (!message.job_id) {
      if (!message.message_id) {
        toast.error(t("sqs.jobIdNotAvailable"));
        return;
      }

      // Fallback: Cancel by SQS Message ID
      setIsLoading(true);
      try {
        await sqsApi.cancelJobByMessageId(message.message_id);
        toast.success(t("sqs.jobCancelledSuccessfully"));
        onCancelled?.();
      } catch (error: any) {
        console.error("Failed to cancel job by message ID:", error);
        const errorMessage =
          error.response?.data?.detail ||
          error.message ||
          t("sqs.failedToCancelJob");
        toast.error(errorMessage);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    setIsLoading(true);
    try {
      await sqsApi.cancelJob(message.job_id);
      toast.success(t("sqs.jobCancelledSuccessfully"));
      onCancelled?.();
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.detail ||
        error.message ||
        t("sqs.failedToCancelJob");
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const formatErrorMessage = (errorDetails?: string) => {
    if (!errorDetails) return null;

    // Check for known error patterns and localize them
    const colonIndex = errorDetails.indexOf(":");
    if (colonIndex !== -1) {
      const errorCode = errorDetails.substring(0, colonIndex).trim();
      const errorMessage = errorDetails.substring(colonIndex + 1).trim();

      // Map error codes to localization keys
      switch (errorCode) {
        case "PENDING_FETCH_STATUS": {
          // Extract the number from "X keyword(s) require fetch operation first"
          const match = errorMessage.match(/^(\d+)/);
          const count = match ? match[1] : "";
          return `${count}${t("sqs.errors.pendingFetchStatus")}`;
        }
        case "Unknown message type":
          return t("sqs.errors.unknownMessageType");
        default:
          // For unknown error codes, return the message part only (strip the code)
          return errorMessage;
      }
    }

    // Known simple messages
    if (errorDetails === "Fetch completed")
      return t("sqs.errors.fetchCompleted");
    if (errorDetails === "Fetch failed") return t("sqs.errors.fetchFailed");
    if (errorDetails === "Job completed successfully")
      return t("sqs.errors.jobCompletedSuccessfully");

    // For generic errors (like "Exception: ..."), return as is
    return errorDetails;
  };

  return (
    <div
      className={`rounded-md border p-3 transition-all duration-150 hover:shadow-sm relative w-full max-w-full overflow-hidden min-w-0 ${getItemStyles()}`}
    >
      <div className="flex items-start gap-3 w-full">
        <div className="flex-1 w-0 min-w-0 overflow-hidden">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold text-primary shrink-0">
              {formatMessageType(message.message_type)}
            </span>
            <span className="text-xs text-muted-foreground shrink-0">
              {formatTimestamp(message.sent_timestamp)}
            </span>
          </div>
          <div
            className="text-xs truncate mt-0.5"
            title={formatKeywords(message.keywords, message.keyword_ids)}
          >
            {formatKeywords(message.keywords, message.keyword_ids)}
          </div>
          <div
            className="text-xs text-muted-foreground truncate"
            title={
              message.user_full_name ||
              `${t("sqs.userId")}: ${message.user_id || t("sqs.unknown")}`
            }
          >
            {message.user_full_name ||
              `${t("sqs.userId")}: ${message.user_id || t("sqs.unknown")}`}
          </div>
          {type === "failed" && message.error_details && (
            <div className="text-xs text-red-600 mt-1 break-words">
              {formatErrorMessage(message.error_details)}
            </div>
          )}
        </div>
        {(type === "waiting" || type === "processing") && (
          <div className="shrink-0 relative z-10">
            <DropdownMenu>
              <DropdownMenuTrigger
                className="focus:outline-none p-1.5 hover:bg-black/5 rounded-full"
                disabled={isLoading}
              >
                <MoreVertical className="h-4 w-4 text-gray-500" />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem
                  className="text-destructive text-xs"
                  onClick={handleCancel}
                  disabled={isLoading}
                >
                  {isLoading ? t("sqs.cancelling") : t("sqs.cancel")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </div>
    </div>
  );
}
