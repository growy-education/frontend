import React, { useContext, useState } from "react";
import { AppBar, Toolbar, IconButton, Drawer, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { AuthContext } from "./contexts/AuthContextProvider";
import { DrawerListItem } from "./tools/DrawerListItem";
import { Outlet, useNavigate } from "react-router-dom";
import { AccountCircle } from "@mui/icons-material";
import { AlertPanelContext } from "./contexts/AlertPanelContextProvider";
import { AlertPanel } from "./components/AlertPanel";

export const General: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { handleLogout } = useContext(AuthContext);
  const { alert } = useContext(AlertPanelContext);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar style={{ display: "flex", justifyContent: "space-between" }}>
          <Box
            style={{
              display: "flex",
              alignItems: "center",
            }}
          >
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={handleToggleSidebar}
            >
              <MenuIcon />
            </IconButton>
            <img
              src="/header-logo.png"
              alt="header-logo"
              style={{ height: "40px", marginLeft: "16px", cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
          </Box>
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {user.role}モード
          </Typography> */}
          <Box>
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
          </Box>
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
        <Outlet />
        {alert && <AlertPanel />}
      </Box>
    </Box>
  );
};
