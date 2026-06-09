// "use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import {
  clearAuthCookies,
  getTokenCookie,
  getUserInfoCookie,
} from "../cookies";
import { useRouter } from "next/navigation";

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  user: any;
  setUser: (user: any) => void;
  logout: () => Promise<void>;
  loading: boolean;
  checkAuth: () => Promise<void>;
}

// 1. Initial/Default state object banayeko
const defaultAuth: AuthContextProps = {
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: null,
  setUser: () => {},
  logout: async () => {},
  loading: false,
  checkAuth: async () => {},
};

// 2. Context ma direct default state pass gareko (undefined ko jatha)
const AuthContext = createContext<AuthContextProps>(defaultAuth);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  // Provider hatayeko le yo component le kehi pani wrap gardaina, direct children return garcha
  return <>{children}</>;
};

// 3. Provider check garne part hatyo, direct context return huncha
export const useAuth = () => {
  const context = useContext(AuthContext);
  return context;
};
