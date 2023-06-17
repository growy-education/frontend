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
import { QuestionNew } from "./components/QuestionNew";
import { QuestionList } from "./components/QuestionList";
import { AuthContext } from "./AuthContextProvider";
import { Outlet, Route, Routes } from "react-router-dom";
import { Information } from "./Information";
import QuestionDetail from "./components/QuestionDetail";
import { Studyroom } from "./components/Studyroom";
import { DrawerListItem } from "./tools/DrawerListItem";
import { Preservation } from "./components/StudyroomPreservation";
import { UserContext } from "./UserContextProvider";
import { Role } from "./types/role.type";
import { UsersList } from "./components/UsersList";
import { UserNew } from "./components/CreateUser";
import { UpdateUser } from "./components/UpdateUser";
import { CustomerNew } from "./components/CreateCustomer";
import { CustomerDetail } from "./components/CustomerDetail";
import { UserDetail } from "./components/UserDetail";
import { TeacherDetail } from "./components/TeacherDetail";
import { UpdateCustomer } from "./components/UpdateCustomer";
import { CustomersList } from "./components/CustomersList";
import { TeachersList } from "./components/TeachersList";
import { TeacherNew } from "./components/CreateTeacher";
import { UpdateTeacher } from "./components/UpdateTeacher";

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
            Growy（現在：{user.role}モードです）
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
        <Routes>
          <Route path="/" element={<Information />} />
          <Route path="/questions" element={<QuestionList />} />
          <Route path="/questions/new" element={<QuestionNew />} />
          <Route path="/questions/:questionId" element={<QuestionDetail />} />
          <Route path="/studyroom" element={<Studyroom />} />
          <Route path="/studyroom/preservation" element={<Preservation />} />
          {user.role === Role.ADMIN && (
            <>
              <Route path="/users" element={<UsersList />} />
              <Route path="/users/create" element={<UserNew />} />
              <Route path="/users/:userId/" element={<UserDetail />} />
              <Route path="/users/:userId/update" element={<UpdateUser />} />
              <Route path="/customers" element={<CustomersList />} />
              <Route path="/customers/create" element={<CustomerNew />} />
              <Route
                path="/customers/:customerId"
                element={<CustomerDetail />}
              />
              <Route
                path="/customers/:customerId/update"
                element={<UpdateCustomer />}
              />
              <Route path="/teachers" element={<TeachersList />} />
              <Route path="/teachers/create" element={<TeacherNew />} />
              <Route path="/teachers/:teacherId/" element={<TeacherDetail />} />
              <Route
                path="/teachers/:teacherId/update"
                element={<UpdateTeacher />}
              />
            </>
          )}
        </Routes>
      </Box>
    </Box>
  );
};
