import React, { createContext, useState, ReactNode } from "react";
import { AlertProps } from "@mui/material";

interface NotificationModalObject {
  type: "Modal";
  title: string;
  message: string;
}

interface NotificationPanelObject {
  type: "Panel";
  severity: AlertProps["severity"];
  title: string;
  message: string;
}

// 通知オブジェクトの型定義
type Notification = NotificationModalObject | NotificationPanelObject;

// 通知コンテキストの作成
interface NotificationContextType {
  notification: Notification | null;
  handleNotification: (notification: Notification) => void;
  clearNotification: () => void;
}

export const NotificationContext = createContext<
  NotificationContextType | undefined
>(undefined);

// 通知コンテキストプロバイダーの作成
interface NotificationContextProviderProps {
  children: ReactNode;
}

export const NotificationContextProvider: React.FC<
  NotificationContextProviderProps
> = ({ children }) => {
  const [notification, setNotification] = useState<Notification | null>(null);

  const handleNotification = (error: Notification) => {
    setNotification(error);
  };

  const clearNotification = () => {
    setNotification(null);
  };

  const errorContextValue: NotificationContextType = {
    notification: notification,
    handleNotification,
    clearNotification,
  };

  return (
    <NotificationContext.Provider value={errorContextValue}>
      {children}
    </NotificationContext.Provider>
  );
};
