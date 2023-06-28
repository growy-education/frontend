import { AlertProps } from "@mui/material";
import React, { createContext, useState, ReactNode } from "react";

type AlertPanelProps = {
  severity: AlertProps["severity"];
  title: string;
  description: string;
};

type AlertPanelContextType = {
  alert: AlertPanelProps;
  handleAlert: (alert: AlertPanelProps) => void;
  clearAlert: () => void;
};

export const AlertPanelContext = createContext<null | AlertPanelContextType>(
  null
);

interface AlertPanelContextProviderProps {
  children: ReactNode;
}

export const AlertPanelContextProvider: React.FC<
  AlertPanelContextProviderProps
> = ({ children }) => {
  const [alert, setAlert] = useState<AlertPanelProps | null>(null);

  const handleAlert = (alert: AlertPanelProps) => {
    setAlert(alert);
  };

  const clearAlert = () => {
    setAlert(null);
  };

  return (
    <AlertPanelContext.Provider value={{ alert, handleAlert, clearAlert }}>
      {children}
    </AlertPanelContext.Provider>
  );
};
