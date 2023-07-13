import { Add, ListAlt, Tv } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContextProvider";
import { Role } from "../../dto/enum/role.enum";

export const ListItemRoom = () => {
  const navigate = useNavigate();
  const [roomListOpen, setRoomListOpen] = useState(false);

  const { user } = useContext(UserContext);

  const handleRoomListToggle = () => {
    setRoomListOpen(!roomListOpen);
  };

  const location = useLocation();

  return (
    <>
      <ListItemButton
        onClick={handleRoomListToggle}
        selected={location.pathname.includes("rooms")}
      >
        <ListItemIcon>
          <Tv />
        </ListItemIcon>
        <ListItemText primary="オンライン自習室" />
      </ListItemButton>
      <Collapse in={roomListOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem onClick={() => navigate("/rooms")}>
            <ListItemButton>
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              <ListItemText primary="自習室リスト" />
            </ListItemButton>
          </ListItem>
          {user.role === Role.ADMIN && (
            <ListItem onClick={() => navigate("/rooms/new")}>
              <ListItemButton>
                <ListItemIcon>
                  <Add />
                </ListItemIcon>
                <ListItemText primary="オンライン自習室を作成" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Collapse>
    </>
  );
};
