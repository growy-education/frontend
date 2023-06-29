import React, { createContext, useContext, useEffect, useState } from "react";
import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { AuthContext } from "./AuthContextProvider";
import { CircularProgress } from "@mui/material";
import { LoadingData } from "../components/LoadingData";

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

interface AxiosProviderProps {
  children: React.ReactNode;
}

export const AxiosContextProvider: React.FC<AxiosProviderProps> = ({
  children,
}) => {
  const { bearerToken, handleLogout } = useContext(AuthContext);

  const [axiosConfig, setAxiosConfig] = useState<
    AxiosContextType["axiosConfig"] | null
  >(null);

  useEffect(() => {
    console.log("bearer token\n", `Bearer ${bearerToken}`);
    setAxiosConfig({
      baseURL: process.env.REACT_APP_BACKEND_BASE_URL as string,
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
    });
  }, [bearerToken]);

  if (!axiosConfig) {
    return <LoadingData message="ログイン情報を取得中です" />;
  }

  return (
    <AxiosContext.Provider value={{ axiosConfig }}>
      {children}
    </AxiosContext.Provider>
  );
};
