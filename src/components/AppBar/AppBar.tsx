import { AppBar as MuiAppBar, Toolbar, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { TeacherStatusSwitch } from "../../features/teachers/TeacherStatusSwitch";
import { LogOutButton } from "../../features/LogOutButton";
import { useContext } from "react";
import { AuthContext } from "../../providers/auth.provider";
import { Role } from "../../features/users/types/role.enum";

type AppBarProps = {
  handleToggleSidebar: () => void;
};

export const AppBar = ({ handleToggleSidebar }: AppBarProps) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  return (
    <MuiAppBar position="fixed">
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
    </MuiAppBar>
  );
};
