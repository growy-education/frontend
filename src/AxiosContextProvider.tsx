import React, { createContext, useContext, useEffect, useState } from "react";
import axios, { AxiosInstance, CreateAxiosDefaults } from "axios";
import { AuthContext } from "./AuthContextProvider";
import { CircularProgress } from "@mui/material";

interface AxiosContextType {
  axiosConfig: CreateAxiosDefaults<any>;
}

export const AxiosContext = createContext<AxiosContextType>({
  axiosConfig: {
    baseURL: "http://localhost:3000",
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

const AxiosProvider: React.FC<AxiosProviderProps> = ({ children }) => {
  const { bearerToken, handleLogout } = useContext(AuthContext);

  const [axiosConfig, setAxiosConfig] = useState<
    null | AxiosContextType["axiosConfig"]
  >(null);

  useEffect(() => {
    console.log("bearer token\n", `Bearer ${bearerToken}`);
    setAxiosConfig({
      baseURL: "http://localhost:3000/",
      headers: {
        Authorization: `Bearer ${bearerToken}`,
        "Content-Type": "application/json",
      },
    });
  }, [bearerToken]);

  if (!!!axiosConfig) {
    return <CircularProgress />;
  }

  return (
    <AxiosContext.Provider value={{ axiosConfig }}>
      {children}
    </AxiosContext.Provider>
  );
};

export default AxiosProvider;
