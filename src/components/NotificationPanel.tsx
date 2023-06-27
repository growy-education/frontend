import React, { useContext } from "react";
import {
  Box,
  Typography,
  Alert,
  AlertTitle,
  AlertColor,
  IconButton,
} from "@mui/material";
import { NotificationContext } from "../contexts/NotificationContextProvider";
import CloseIcon from "@mui/icons-material/Close";
import ErrorIcon from "@mui/icons-material/Error";

interface NotificationPanelProps {}

export const NotificationPanel: React.FC<NotificationPanelProps> = () => {
  const { notification, clearNotification } = useContext(NotificationContext);
  if (notification.type === "Modal") {
    return <></>;
  }

  return (
    <Box>
      <Alert
        severity={notification?.severity || "error"}
        onClose={() => clearNotification()}
        sx={{ display: "flex", alignItems: "center" }}
      >
        <AlertTitle>{notification.title}</AlertTitle>
        {notification.message}
      </Alert>
    </Box>
  );
};
