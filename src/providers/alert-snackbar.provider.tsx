import React, { createContext, useState, ReactNode } from "react";
import { AlertProps } from "@mui/material";
import { isAxiosError } from "axios";

type AlertSnackbarProps = {
  severity: AlertProps["severity"];
  title: string;
  description?: string;
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
      const url = error?.request?.url;
      const method = error?.request?.method;
      if (
        typeof url === "string" &&
        url.includes("/images") &&
        method === "post"
      ) {
        return setAlert({
          severity: "error",
          title: "エラー",
          description:
            "画像の送信時にエラーが発生しました。画像データを確認してください。",
        });
      }
      // サーバーからの返答がある
      if (error.response) {
        if (error.response.status === 404) {
          return;
        }
        if (error.response.status === 500) {
          return;
        }
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
