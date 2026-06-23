"use client";
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
  useCallback,
} from "react";
import { clearAuthCookies, getTokenCookie, getUserData } from "../cookies";
import { useRouter } from "next/navigation";
import { ToastContainer } from "react-toastify";

type AuthUser = {
  firstName?: string;
  lastName?: string;
  email?: string;
  username?: string;
  phoneNumber?: string;
  gender?: string;
  profileImage?: string;
  profileImageUrl?: string;
  imageUrl?: string;
  image?: string;
} | null;

interface AuthContextProps {
  isAuthenticated: boolean;
  setIsAuthenticated: (value: boolean) => void;
  user: AuthUser;
  setUser: (user: AuthUser) => void;
  logout: () => Promise<void>;
  loading: boolean;
  checkAuth: () => Promise<void>;
}
const AuthContext = createContext<AuthContextProps | undefined>(undefined);
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<AuthUser>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const checkAuth = useCallback(async () => {
    try {
      const token = await getTokenCookie();
      const storedUser = await getUserData();
      setUser(storedUser as AuthUser);
      setIsAuthenticated(!!token);
    } catch {
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      void checkAuth();
    }, 0);

    return () => window.clearTimeout(timer);
  }, [checkAuth]);

  const logout = async () => {
    try {
      await clearAuthCookies();
      setIsAuthenticated(false);
      setUser(null);
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setIsAuthenticated,
        user,
        setUser,
        logout,
        loading,
        checkAuth,
      }}
    >
      {children}
      <ToastContainer position="top-center" autoClose={3000} />
    </AuthContext.Provider>
  );
};
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
