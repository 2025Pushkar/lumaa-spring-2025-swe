// src/context/AuthContext.tsx
import { createContext } from "react";

interface AuthContextType {
  isAuthenticated: boolean;
  login: (token: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  login: (_token: string) => {},
  logout: () => {}
});
