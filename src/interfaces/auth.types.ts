import type { FormValue } from "./form.types";
import type { User } from "./user.types";

/**
 * Payload for /auth/login.
 * The index signature lets it satisfy Record<string, …>.
 */
export interface LoginPayload {
  username: string;
  password: string;
  [key: string]: FormValue | null | undefined;
}

export interface AuthContextValue {
  token: string | null | undefined;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginPayload) => Promise<void>;
  logout: () => Promise<void>;
  refresh: () => Promise<void>;
}
