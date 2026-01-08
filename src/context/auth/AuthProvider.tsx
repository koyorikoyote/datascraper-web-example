import {
  useState,
  useEffect,
  useRef,
  useCallback,
  useMemo,
} from "react";
import { useLocation } from "react-router-dom";
import { setAuthToken } from "@/lib/api";
import { toast } from "sonner";
import { AuthContext } from "./AuthContext";
import type { LoginPayload, User } from "@/interfaces"; // Add User interface
import type { AuthContextValue } from "@/interfaces";
import api from "@/api";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [token, setToken] = useState<string | null | undefined>(() => {
    return localStorage.getItem("auth_token") ?? undefined;
  });

  const [user, setUser] = useState<User | null>(() => {
    const stored = localStorage.getItem("auth_user");
    return stored ? JSON.parse(stored) : null;
  });

  const didRefresh = useRef(false);
  const location = useLocation();

  useEffect(() => {
    setAuthToken(token ?? null);
    if (token) {
      localStorage.setItem("auth_token", token);
    } else if (token === null) {
      localStorage.removeItem("auth_token");
    }
  }, [token]);

  useEffect(() => {
    if (user) {
      localStorage.setItem("auth_user", JSON.stringify(user));
    } else {
      localStorage.removeItem("auth_user");
    }
  }, [user]);

  useEffect(() => {
    if (didRefresh.current || location.pathname === "/login") return;
    didRefresh.current = true;
    refresh().catch(() => {
      // Only clear the token but keep the user data
      setToken(null);
      // Don't clear user data on refresh failure
      // setUser(null);
    });
  }, [location.pathname]);

  const login = useCallback(async (credentials: LoginPayload) => {
    try {
      const response = await api.auth.login(credentials);
      const { access_token, user } = response.data;
      setToken(access_token);
      setUser(user);
      didRefresh.current = true;
    } catch (err) {
      toast.error("Login failed");
      throw err;
    }
  }, []);

  const logout = useCallback(async () => {
    try {
      await api.auth.logout();
      toast.success("Logged out");
    } catch (err) {
      toast.error("Logout failed");
      throw err;
    } finally {
      setToken(null);
      setUser(null);
    }
  }, []);

  const refresh = useCallback(async () => {
    try {
      const response = await api.auth.refresh();
      const { access_token, user } = response.data;
      setToken(access_token);
      setUser(user);
    } catch (err) {
      toast.error("Session refresh failed");
      // Only clear the token but keep the user data in memory
      // This prevents user data from being removed from localStorage on refresh failures
      setToken(null);
      throw err;
    }
  }, []);

  const value: AuthContextValue = useMemo(
    () => ({
      token,
      user,
      login,
      logout,
      refresh,
      isAuthenticated: token != null,
      isLoading: token === undefined,
    }),
    [token, user, login, logout, refresh]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
