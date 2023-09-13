import React, { createContext, useState, ReactNode } from "react";
import { AlertProps } from "@mui/material";

type AlertSnackbarProps = {
  severity: AlertProps["severity"];
  title: string;
  description: string;
};

type AlertPanelContextType = {
  alert: AlertSnackbarProps;
  handleAlert: (alert: AlertSnackbarProps) => void;
  clearAlert: () => void;
};

export const AlertSnackbarContext = createContext<null | AlertPanelContextType>(
  null
);

interface AlertSnackbarContextProviderProps {
  children: ReactNode;
}

export const AlertSnackbarContextProvider: React.FC<
  AlertSnackbarContextProviderProps
> = ({ children }) => {
  const [alert, setAlert] = useState<AlertSnackbarProps | null>(null);

  const handleAlert = (alert: AlertSnackbarProps) => {
    setAlert(alert);
  };

  const clearAlert = () => {
    setAlert(null);
  };

  return (
    <AlertSnackbarContext.Provider value={{ alert, handleAlert, clearAlert }}>
      {children}
    </AlertSnackbarContext.Provider>
  );
};
