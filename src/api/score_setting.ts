import axios from "@/lib/api";
import type { ScoreSetting } from "@/interfaces";

export const scoreSettingApi = {
  // List ScoreSetting
  list: () =>
    axios.get("/score-settings/", { withCredentials: true }),

  // Update ScoreSetting
  update: (payload: ScoreSetting) =>
    axios.put("/score-settings/", payload, { withCredentials: true }),

};