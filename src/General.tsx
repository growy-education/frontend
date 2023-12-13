import React, { useContext, useState } from "react";
import { Box } from "@mui/material";

import { Outlet, useNavigate } from "react-router-dom";
import { AlertSnackbarContext } from "./providers/alert-snackbar.provider";
import { AlertSnackbar } from "./features/AlertSnackbar";
import { PageWrapperBox } from "./features/PageWrapperBox";
import { Offset } from "./components/Layout/Offset";
import { Toast } from "./components/Toast/Toast";
import { AppBar } from "./components/AppBar/AppBar";
import { SwipeableDrawer } from "./components/Drawer/SwipeableDrawer";

export const General: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { alert } = useContext(AlertSnackbarContext);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar handleToggleSidebar={handleToggleSidebar} />

      <SwipeableDrawer
        isSidebarOpen={isSidebarOpen}
        handleToggleSidebar={handleToggleSidebar}
      />

      <PageWrapperBox maxWidth={"600px"} pb={5}>
        <Offset />
        <Box m={1}>
          {alert && <AlertSnackbar />}
          <Toast />
          <Outlet />
        </Box>
      </PageWrapperBox>
    </Box>
  );
};
