import { useNavigate } from "react-router-dom";
import { AppBar as MuiAppBar, Toolbar, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

import { LogOutButton } from "../../features/LogOutButton";

type AppBarProps = {
  handleToggleSidebar: () => void;
};

export const AppBar = ({ handleToggleSidebar }: AppBarProps) => {
  const navigate = useNavigate();

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

        <Box sx={{ display: "flex", flexDirection: "row" }}>
          {/* <IconButton onClick={() => console.log("押されたよ")} color="inherit">
            <Badge badgeContent={4} color={"secondary"}>
              <Notifications />
            </Badge>
          </IconButton> */}
          <IconButton
            onClick={() => navigate("/settings/account")}
            color="inherit"
          >
            <AccountCircleIcon />
          </IconButton>
          <LogOutButton />
        </Box>
      </Toolbar>
    </MuiAppBar>
  );
};
