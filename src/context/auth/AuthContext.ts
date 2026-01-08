import { createContext } from "react";
import type { AuthContextValue } from "@/interfaces";

export const AuthContext = createContext<AuthContextValue | null>(null);