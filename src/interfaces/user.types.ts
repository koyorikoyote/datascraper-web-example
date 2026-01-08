import type { UserRole } from "./user-role.types";

export interface UserBase {
  email: string;
  full_name?: string;
  role_id: number;
}

export interface UserCreate extends UserBase {
  password?: string;
}

export interface UserUpdate {
  full_name?: string;
  password?: string;
  role_id?: number;
  last_login_at?: string; // ISO date string
}

export interface User extends UserBase {
  id: number;
  password_hash: string;
  created_at: string;
  last_login_at: string | null;
  role: UserRole;
}