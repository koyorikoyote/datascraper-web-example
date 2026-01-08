import axios from "@/lib/api";

export const dashboardApi = {
  list: () =>
    axios.get("/dashboard/", { withCredentials: true }),
};
