export const StatusConst = {
  Pending: 'pending',
  Processing: 'processing',
  Failed: 'failed',
  Success: 'success',
  Partial: 'partial',
  Waiting: 'waiting',
} as const;

export type StatusConst = typeof StatusConst[keyof typeof StatusConst];