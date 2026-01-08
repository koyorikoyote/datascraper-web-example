import axios from "@/lib/api";
import type { UserRoleCreate, UserRoleUpdate } from "@/interfaces";

export const userRoleApi = {
  // List roles
  list: () => axios.get("/roles/", { withCredentials: true }),

  // Create role
  create: (payload: UserRoleCreate) =>
    axios.post("/roles/", payload, { withCredentials: true }),

  // Update role
  update: (roleId: number, payload: UserRoleUpdate) =>
    axios.put(`/roles/${roleId}/`, payload, { withCredentials: true }),

  // Delete role
  delete: (roleId: number) =>
    axios.delete(`/roles/${roleId}/`, { withCredentials: true }),
};
