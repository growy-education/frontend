import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { AuthContext } from "./AuthContextProvider";
import { DrawerListItem } from "./tools/DrawerListItem";
import { UserContext } from "./UserContextProvider";
import { Outlet } from "react-router-dom";

export const General: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { handleLogout } = useContext(AuthContext);
  const { user } = useContext(UserContext);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={handleToggleSidebar}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Growy（{user.role}モード）
          </Typography>
          <IconButton onClick={handleLogout} color="inherit">
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="persistent"
        anchor="left"
        open={isSidebarOpen}
        onClose={handleToggleSidebar}
        sx={{ width: "auto" }}
      >
        <Toolbar>
          <IconButton
            onClick={handleToggleSidebar}
            onKeyDown={handleToggleSidebar}
          >
            {isSidebarOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </Toolbar>
        <DrawerListItem />
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: "64px",
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
};
