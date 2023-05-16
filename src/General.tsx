import React, { useContext, useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { QuestionNew } from "./components/QuestionNew";
import { QuestionList } from "./components/QuestionList";
import { AuthContext } from "./AuthContextProvider";
import { Outlet, Route, Routes, useNavigate } from "react-router-dom";
import { Information } from "./Information";
import { Quiz, Send } from "@mui/icons-material";
import QuestionDetail from "./components/QuestionDetail";

export const General: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const { handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();

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
            Site Logo
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
        <List>
          <ListItem onClick={() => navigate("questions")}>
            <ListItemButton>
              <ListItemIcon>
                <Quiz />
              </ListItemIcon>
              <ListItemText primary="今までの質問" />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => navigate("questions/new")}>
            <ListItemButton>
              <ListItemIcon>
                <Send />
              </ListItemIcon>
              <ListItemText primary="質問する" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          marginTop: "64px",
        }}
      >
        <Routes>
          <Route path="/" element={<Information />} />
          <Route path="/questions" element={<QuestionList />} />
          <Route path="/questions/new" element={<QuestionNew />} />
          <Route path="/questions/:questionId" element={<QuestionDetail />} />
        </Routes>
      </Box>
    </Box>
  );
};
