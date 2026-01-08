import axios from "@/lib/api";

export const serpApi = {
  list: (keywordId: number) =>
    axios.get(`/serp-results/keywords/${keywordId}/`, { withCredentials: true }),
};