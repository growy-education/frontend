import React, { useContext } from "react";
import { Box, Alert, AlertTitle } from "@mui/material";
import { AlertPanelContext } from "../contexts/AlertPanelContextProvider";

export const AlertPanel: React.FC<{}> = () => {
  const { alert, clearAlert } = useContext(AlertPanelContext);

  return (
    <Box textAlign={"left"}>
      <Alert severity={alert?.severity || "error"} onClose={() => clearAlert()}>
        <AlertTitle>{alert.title}</AlertTitle>
        {alert.description}
      </Alert>
    </Box>
  );
};
