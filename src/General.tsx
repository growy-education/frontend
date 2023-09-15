import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  SwipeableDrawer,
  Box,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { AuthContext } from "./contexts/AuthContextProvider";
import { DrawerListItem } from "./tools/DrawerListItem";
import { Outlet, useNavigate } from "react-router-dom";
import { AlertSnackbarContext } from "./contexts/AlertSnackbarContext";
import { AlertSnackbar } from "./components/AlertSnackbar";
import { PageWrapperBox } from "./components/PageWrapperBox";
import { Offset } from "./tools/Offset";
import { Role } from "./dto/enum/role.enum";
import { TeacherStatusSwitch } from "./components/teachers/TeacherStatusSwitch";
import { UserContext } from "./contexts/UserContextProvider";
import { LogOutButton } from "./components/LogOutButton";

export const General: React.FC = () => {
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { handleLogout } = useContext(AuthContext);
  const { user } = useContext(UserContext);
  const { alert } = useContext(AlertSnackbarContext);

  const handleToggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      <AppBar position="fixed">
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
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
            <Box
              component="img"
              src="/header-logo.png"
              alt="header-logo"
              sx={{ height: "40px", cursor: "pointer" }}
              onClick={() => navigate("/")}
            />
          </Box>
          {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            {user.role}モード
          </Typography> */}
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            {/* <IconButton onClick={() => navigate("/profile")} color="inherit">
              <AccountCircle />
            </IconButton> */}
            {/* <IconButton onClick={() => console.log("押されたよ")} color="inherit">
            <Badge badgeContent={4} color={"secondary"}>
              <Notifications />
            </Badge>
          </IconButton> */}
            {user.role === Role.TEACHER && (
              <TeacherStatusSwitch teacher={user?.teacher} />
            )}
            <LogOutButton />
          </Box>
        </Toolbar>
      </AppBar>

      <SwipeableDrawer
        anchor="left"
        open={isSidebarOpen}
        onOpen={handleToggleSidebar}
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
      </SwipeableDrawer>

      <PageWrapperBox maxWidth={"600px"}>
        <Offset />
        <Box m={1}>
          {alert && <AlertSnackbar />}
          <Outlet />
        </Box>
      </PageWrapperBox>
    </Box>
  );
};
