import type { UserBase } from "./user.types";
import { StatusConst } from '@/constants/status'

export interface KeywordBase {
  keyword: string
  fetch_status?: StatusConst
  rank_status?: StatusConst
  partial_rank_status?: StatusConst
  execution_date?: string | null
  is_scheduled?: boolean
  created_by_user_id?: number| null
}

export type KeywordCreate = KeywordBase

export interface KeywordUpdate {
  status?: StatusConst
  execution_date?: string | null
  is_scheduled?: boolean
}

export interface KeywordInDBBase extends KeywordBase {
  id: number
  updated_at: string
}

export interface Keyword extends KeywordInDBBase {
  user: UserBase
}

export interface KeywordInDB extends KeywordBase {
  id?: number
  updated_at?: string
}

export interface KeywordBulk {
  ids: Array<number>
}

export type KeywordRow = Keyword
