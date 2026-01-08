import axios from "@/lib/api";
import { toFormData } from "@/utils/helper";
import type { LoginPayload } from "@/interfaces";

export const authApi = {
  login: (payload: LoginPayload) =>
    axios.post("/auth/login/", toFormData(payload), { withCredentials: true }),

  logout: () =>
    axios.post("/auth/logout/", undefined),

  refresh: () =>
    axios.post("/auth/refresh/", undefined, { withCredentials: true }),
};
