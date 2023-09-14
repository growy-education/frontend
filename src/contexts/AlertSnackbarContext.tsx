import React, { createContext, useState, ReactNode } from "react";
import { AlertProps } from "@mui/material";
import { isAxiosError } from "axios";

type AlertSnackbarProps = {
  severity: AlertProps["severity"];
  title: string;
  description: string;
};

type AlertPanelContextType = {
  alert: AlertSnackbarProps;
  handleAlert: (alert: AlertSnackbarProps) => void;
  clearAlert: () => void;
  handleAxiosError: (error: Error) => void;
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

  const handleAxiosError = (error: Error) => {
    if (isAxiosError(error)) {
      // サーバーからの返答がある
      if (error.response) {
        return setAlert({
          severity: "error",
          title: "エラー",
          description: "通信環境を確認し、ブラウザを再起動してください。",
        });
      }
      // サーバーからの返答がない
      if (error.request) {
        return setAlert({
          severity: "error",
          title: "ネットワークエラー",
          description:
            "ネットワークエラーが発生しました。通信環境を確認して、再度実行してください。",
        });
      }
    }

    // よくわからんエラーのとき
    return setAlert({
      severity: "error",
      title: "予期せぬエラー",
      description: "予期せぬエラーが発生しました。サイトを更新してください。",
    });
  };

  return (
    <AlertSnackbarContext.Provider
      value={{ alert, handleAlert, clearAlert, handleAxiosError }}
    >
      {children}
    </AlertSnackbarContext.Provider>
  );
};
