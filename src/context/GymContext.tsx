"use client";

import { createContext, useState, useEffect, ReactNode } from "react";
import Cookies from "js-cookie";
import { ILoginData } from "@/interfaces/ILogin";
import { useRouter } from "next/navigation";
import fetchLoginGym from "@/app/api/LoginGymAPI";

interface IGymSession {
    id: string; 
    name: string; 
    email: string; 
    phone: number;
    adress: string;
    city: string;
    token: string; 
    rol?: string;
    createdAt?: string;
  }

interface GymContextType {
  gymSession: IGymSession | null;
  isGymLoggedIn: boolean;
  initializeGymSession: () => void;
  handleGymLogout: () => Promise<void>;
  handleGymLogin: (loginData: ILoginData) => Promise<void>;
}

export const GymContext = createContext<GymContextType>({
  gymSession: null,
  isGymLoggedIn: false,
  initializeGymSession: () => {},
  handleGymLogout: async () => {},
  handleGymLogin: async () => {},
});

interface GymProviderProps {
  children: ReactNode;
}

export const GymProvider: React.FC<GymProviderProps> = ({ children }) => {
  const [gymSession, setGymSession] = useState<IGymSession | null>(null);
  const router = useRouter();

  const initializeGymSession = () => {
    const dataCookie = Cookies.get("gymData");
    if (dataCookie) {
      const parsedData = JSON.parse(dataCookie);
      setGymSession(parsedData);
    } else {
      setGymSession(null);
    }
  };

  const handleGymLogout = async () => {
    Cookies.remove("gymData");
    router.push("/");
    setTimeout(() => {
      window.location.reload();
    }, 500);
  };

  const handleGymLogin = async (loginData: ILoginData) => {
    const gym = await fetchLoginGym(loginData);
    if (gym) {
      Cookies.set("gymData", JSON.stringify(gym), { expires: 7 });
      setGymSession(gym);
      router.push("/");
    }
  };

  useEffect(() => {
    initializeGymSession();
  }, []);

  const value = {
    gymSession,
    isGymLoggedIn: !!gymSession,
    initializeGymSession,
    handleGymLogout,
    handleGymLogin,
  };

  return <GymContext.Provider value={value}>{children}</GymContext.Provider>;
};
