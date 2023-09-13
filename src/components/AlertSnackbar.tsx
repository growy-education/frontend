import React, { useContext } from "react";
import { Alert, AlertTitle, Snackbar } from "@mui/material";

import { AlertSnackbarContext } from "../contexts/AlertSnackbarContext";

/**
 * Page ComponentのLoadingに失敗した時に表示されるパネル。
 * General.tsxの共通部分（AppBarの下）で描画される。
 */
export const AlertSnackbar = () => {
  const { alert, clearAlert } = useContext(AlertSnackbarContext);

  return (
    <Snackbar
      open={!!alert}
      onClose={() => clearAlert()}
      autoHideDuration={6000}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        severity={alert?.severity}
        onClose={() => clearAlert()}
        sx={{ width: "100%" }}
      >
        <AlertTitle>{alert?.title}</AlertTitle>
        {alert?.description}
      </Alert>
    </Snackbar>
  );
};
