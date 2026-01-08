import type { StatusConst } from "@/constants/status";
import type { UserBase } from "./user.types";
import type { Keyword, KeywordBase } from "./keyword.types";

export interface BatchHistoryBase {
  
  execution_type_id: number
  user_id: number
  status: StatusConst
  duration: string | null
}

export interface BatchHistoryDetails {
  id: number
  keyword_id: number | null
  batch_id: number
  target: string
  status: StatusConst
  error_message: string | null
  created_at: string
  keyword?: KeywordBase | null
}

export interface BatchResponse extends BatchHistoryBase{
  id: number
  created_at: string  

  keyword?: Keyword | null
  user: UserBase
  details: BatchHistoryDetails[]

  execution_type_code_str: string
  execution_type_jp_name: string
  total_url: number
  total_success_url: number

}

export interface BatchDetailResponse {
  id: string
  properties: {
    batch_id: string | null
    createdate: string
    domain: string | null
    hs_lastmodifieddate: string
    hs_object_id: string
    name: string
    next_action?: string | null
    status?: string | null
  }
  createdAt: string
  updatedAt: string
  archived: boolean
}

export interface BatchHistoryExecutionParams {
  execution_id_list: number[]
}

    
        