import React, { createContext, useContext, useEffect, useState } from "react";
import { AxiosRequestConfig } from "axios";
import { AuthContext } from "./AuthContextProvider";
import { LoadingBox } from "../components/LoadingData";
import { PendingContextPage } from "../pages/PendingContextPage";

interface AxiosContextType {
  axiosConfig: AxiosRequestConfig;
}

export const AxiosContext = createContext<AxiosContextType>({
  axiosConfig: {
    baseURL: process.env.BACKEND_BASE_URL as string,
    headers: {
      "Content-Type": "application/json",
    },
  },
});

export const useAxiosConfig = (): AxiosContextType => {
  const context = useContext(AxiosContext);
  if (!context) {
    throw new Error("useAxiosConfig must be used within an AxiosProvider");
  }
  return context;
};

export const createAxiosConfig = (bearerToken: string) => ({
  baseURL: process.env.REACT_APP_BACKEND_BASE_URL as string,
  headers: {
    Authorization: `Bearer ${bearerToken}`,
    "Content-Type": "application/json",
  },
});

interface AxiosProviderProps {
  children: React.ReactNode;
}

export const AxiosContextProvider: React.FC<AxiosProviderProps> = ({
  children,
}) => {
  const { bearerToken } = useContext(AuthContext);

  const [axiosConfig, setAxiosConfig] = useState<
    AxiosContextType["axiosConfig"] | null
  >(null);

  useEffect(() => {
    console.log("bearer token\n", `Bearer ${bearerToken}`);
    setAxiosConfig(createAxiosConfig(bearerToken));
  }, [bearerToken]);

  if (!axiosConfig) {
    return <PendingContextPage message="接続を確立しています" />;
  }

  return (
    <AxiosContext.Provider value={{ axiosConfig }}>
      {children}
    </AxiosContext.Provider>
  );
};
