import { useContext, useState } from "react";
import {
  AccountBox,
  AccountCircle,
  AddCircle,
  Face,
  Face3,
  Face6,
  Settings,
} from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../providers/auth.provider";
import { Role } from "../../../features/users/types/role.enum";

export const ListItemSettings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useContext(AuthContext);

  const [open, setOpen] = useState(false);

  const handleListToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <ListItemButton
        onClick={handleListToggle}
        selected={location.pathname.includes("settings")}
      >
        <ListItemIcon>
          <Settings />
        </ListItemIcon>
        <ListItemText primary="設定" />
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem onClick={() => navigate("/settings/account")}>
            <ListItemButton>
              <ListItemIcon>
                <AccountBox />
              </ListItemIcon>
              <ListItemText primary="アカウント情報" />
            </ListItemButton>
          </ListItem>
          {user.role === Role.CUSTOMER && (
            <>
              <ListItem onClick={() => navigate("/settings/customer")}>
                <ListItemButton>
                  <ListItemIcon>
                    <Face3 />
                  </ListItemIcon>
                  <ListItemText primary="保護者情報" />
                </ListItemButton>
              </ListItem>
              <ListItem onClick={() => navigate("/settings/student")}>
                <ListItemButton>
                  <ListItemIcon>
                    <Face6 />
                  </ListItemIcon>
                  <ListItemText primary="生徒情報" />
                </ListItemButton>
              </ListItem>
            </>
          )}
          {user.role === Role.TEACHER && (
            <ListItem onClick={() => navigate("/settings/teacher")}>
              <ListItemButton>
                <ListItemIcon>
                  <Face />
                </ListItemIcon>
                <ListItemText primary="講師情報" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Collapse>
    </>
  );
};
