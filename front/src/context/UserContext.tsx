"use client";
import { createContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie"
import { IUserSession, ILoginData } from "@/interfaces/ILogin";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import fetchLogin from "@/app/api/LoginAPI";
import fetchLoginGoogle from "@/app/api/LoginGoogleAPI";

interface UserContextType {
  userSession: IUserSession | null;
  isLoggedIn: boolean;
  initializeUserSession: () => void;
  handleLogout: () => Promise<void>;
  handleLogin: (loginData: ILoginData) => Promise<void>;
  handleGoogleLogin: () => Promise<void>;
}

export const UserContext = createContext<UserContextType>({
  userSession: null,
  isLoggedIn: false,
  initializeUserSession: () => {},
  handleLogout: async () => {},
  handleLogin: async () => {},
  handleGoogleLogin: async () => {},
});

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userSession, setUserSession] = useState<IUserSession | null>(null);
  const router = useRouter();

  const initializeUserSession = () => {
    const dataCookie = Cookies.get("loginData");
    if (dataCookie) {
      const parsedData = JSON.parse(dataCookie);
      setUserSession(parsedData);
    } else {
      setUserSession(null);
    }
  };

  const handleLogout = async () => {
    Cookies.remove("loginData");
    toast.success("Successfully logged out. Redirecting to home...");
    router.push("/home");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleLogin = async (loginData: ILoginData) => {
    const user = await fetchLogin(loginData);
    if (user) {
      Cookies.set("loginData", JSON.stringify(user), { expires: 7 });
      setUserSession(user);
      toast.success("Login successful! Welcome back.");
      router.push("/");
    } else {
      toast.error("Login failed. Invalid credentials, please try again.");
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const user = await fetchLoginGoogle(); // Llama a la API para iniciar sesión con Google
      if (user) {
        Cookies.set("loginData", JSON.stringify(user), { expires: 7 });
        setUserSession(user);
        toast.success("Login with Google successful! Welcome back.");
        router.push("/");
      } else {
        toast.error("Google login failed. Please try again.");
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("An error occurred during Google login. Please try again.");
    }
  };

  useEffect(() => {
    initializeUserSession();
  }, []);

  const value = {
    userSession,
    isLoggedIn: !!userSession,
    initializeUserSession,
    handleLogout,
    handleLogin,
    handleGoogleLogin
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};
