import axios from "@/lib/api";

export const clientApi = {
  getDomains: (limit: number = 10) =>
    axios.get("/client/domains", {
      params: { limit },
      withCredentials: true,
    }),
  getDownloadUrl: () =>
    axios.get<{ download_url: string; expires_in: number }>("/client/download-url", {
      withCredentials: true,
    }),
};
