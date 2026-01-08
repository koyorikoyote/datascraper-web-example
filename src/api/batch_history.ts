import type { BatchHistoryExecutionParams } from "@/interfaces";
import axios from "@/lib/api";

export const batchHistoryApi = {
  list: (payload: BatchHistoryExecutionParams) => 
    axios.post("/batch-history/", payload, { withCredentials: true }),
};
