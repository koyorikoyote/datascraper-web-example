import axios from "@/lib/api";
import type { UserCreate, UserUpdate } from "@/interfaces";

export const userApi = {
  // Create User
  create: (payload: UserCreate) =>
    axios.post("/users/", payload, { withCredentials: true }),

  // List Users
  list: () =>
    axios.get("/users/", { withCredentials: true }),

  // Read User
  read: (userId: number) =>
    axios.get(`/users/${userId}/`, { withCredentials: true }),

  // Update User
  update: (userId: number, payload: UserUpdate) =>
    axios.put(`/users/${userId}/`, payload, { withCredentials: true }),

  // Delete User
  delete: (userId: number) =>
    axios.delete(`/users/${userId}/`, { withCredentials: true }),
};