import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  Box,
  Badge,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { AuthContext } from "./contexts/AuthContextProvider";
import { DrawerListItem } from "./tools/DrawerListItem";
import { UserContext } from "./contexts/UserContextProvider";
import { Outlet, useNavigate } from "react-router-dom";
import { NotificationContext } from "./contexts/NotificationContextProvider";
import { NotificationPanel } from "./components/NotificationPanel";
import { AccountCircle, Notifications } from "@mui/icons-material";

export const General: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { handleLogout } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  const { notification } = useContext(NotificationContext);

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
          <IconButton onClick={() => navigate("/profile")} color="inherit">
            <AccountCircle />
          </IconButton>
          {/* <IconButton onClick={() => console.log("押されたよ")} color="inherit">
            <Badge badgeContent={4} color={"secondary"}>
              <Notifications />
            </Badge>
          </IconButton> */}
          <IconButton onClick={handleLogout} color="inherit">
            <LogoutIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      <Drawer
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
        {notification && notification.type === "Modal" && <NotificationPanel />}
        {notification && notification.type === "Panel" && <NotificationPanel />}
        <Outlet />
      </Box>
    </Box>
  );
};
