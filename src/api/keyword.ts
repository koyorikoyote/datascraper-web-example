import axios from "@/lib/api";
import type { KeywordBulk, KeywordCreate, KeywordUpdate } from "@/interfaces";

export const keywordApi = {
  // List Keywords
  list: () => axios.get("/keywords/", { withCredentials: true }),

  // Create Keyword
  create: (payload: KeywordCreate) =>
    axios.post("/keywords/", payload, { withCredentials: true }),

  // Update Keyword
  update: (keywordId: number, payload: KeywordUpdate) =>
    axios.put(`/keywords/${keywordId}/`, payload, { withCredentials: true }),

  // Read Keyword
  read: (keywordId: number) =>
    axios.get(`/keywords/${keywordId}/`, { withCredentials: true }),

  // Delete Keyword
  delete: (keywordId: number) =>
    axios.delete(`/keywords/${keywordId}/`, { withCredentials: true }),

  // Bulk Delete Keyword
  bulkDelete: (payload: KeywordBulk) =>
    axios.post("/keywords/bulk-delete/", payload, { withCredentials: true }),

  // Serp Bulk Process
  runFetch: (payload: KeywordBulk) =>
    axios.post("/keywords/run-fetch/", payload, { withCredentials: true }),

  // Selenium + GPT
  runRank: (payload: KeywordBulk) =>
    axios.post("/keywords/run-rank/", payload, { withCredentials: true }),

  runPartialRank: (payload: KeywordBulk) =>
    axios.post("/keywords/run-partial-rank/", payload, {
      withCredentials: true,
    }),

  // Export Serp Results to CSV
  runExport: (payload: KeywordBulk) =>
    axios.post("/keywords/export/csv/", payload, {
      withCredentials: true,
      responseType: "blob", // Important for binary data
      headers: {
        Accept: "text/csv; charset=utf-8", // Specify UTF-8 encoding
        "Content-Type": "application/json; charset=utf-8",
      },
    }),

  // Import Keywords from file
  importFile: (formData: FormData) =>
    axios.post("/keywords/import/", formData, {
      withCredentials: true,
      headers: { "Content-Type": "multipart/form-data" },
    }),

  // Update processing to pending
  unstick: (keywordId: number) =>
    axios.post(`/keywords/unstick-processing/${keywordId}/`, {
      withCredentials: true,
    }),
};
