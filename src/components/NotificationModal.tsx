import React, { useContext } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Modal,
  Box,
  Typography,
} from "@mui/material";
import { NotificationContext } from "../contexts/NotificationContextProvider";

interface NotificationModalProps {}

export const NotificationModal: React.FC<NotificationModalProps> = ({}) => {
  const { notification, clearNotification } = useContext(NotificationContext);

  return (
    <Modal
      open={!!notification}
      onClose={() => clearNotification()}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {notification.title}
        </Typography>
        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
          {notification.message}
        </Typography>
      </Box>
    </Modal>
  );
};
