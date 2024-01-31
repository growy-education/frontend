import { useContext, useState } from "react";
import { EditNote, Laptop, ListAlt } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Role } from "../../../features/users/types/role.enum";
import { AuthContext } from "../../../providers/auth.provider";

export const ListItemRoom = () => {
  const [listOpen, setListOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const { user } = useContext(AuthContext);

  const handleRoomListToggle = () => {
    setListOpen(!listOpen);
  };

  return (
    <>
      <ListItemButton
        onClick={handleRoomListToggle}
        selected={location.pathname.includes("rooms")}
      >
        <ListItemIcon>
          <Laptop />
        </ListItemIcon>
        <ListItemText primary="オンライン自習室" />
      </ListItemButton>
      <Collapse in={listOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem onClick={() => navigate("/rooms/")}>
            <ListItemButton>
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              <ListItemText primary="リスト" />
            </ListItemButton>
          </ListItem>
          {/* {user.role === Role.CUSTOMER && (
            <ListItem onClick={() => navigate("/rooms/reserve")}>
              <ListItemButton>
                <ListItemIcon>
                  <EditNote />
                </ListItemIcon>
                <ListItemText primary="まとめて予約する" />
              </ListItemButton>
            </ListItem>
          )} */}
          {user.role === Role.ADMIN && (
            <ListItem onClick={() => navigate("/rooms/new")}>
              <ListItemButton>
                <ListItemIcon>
                  <EditNote />
                </ListItemIcon>
                <ListItemText primary="作成する" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Collapse>
    </>
  );
};
