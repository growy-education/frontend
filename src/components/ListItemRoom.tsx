import { Add, ListAlt, Tv } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const ListItemRoom = () => {
  const navigate = useNavigate();
  const [roomListOpen, setRoomListOpen] = useState(false);

  const handleRoomListToggle = () => {
    setRoomListOpen(!roomListOpen);
  };

  return (
    <>
      <ListItemButton onClick={handleRoomListToggle}>
        <ListItemIcon>
          <Tv />
        </ListItemIcon>
        <ListItemText primary="オンライン自習室" />
      </ListItemButton>
      <Collapse in={roomListOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem onClick={() => navigate("rooms")}>
            <ListItemButton>
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              <ListItemText primary="オンライン自習室リスト" />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => navigate("rooms/create")}>
            <ListItemButton>
              <ListItemIcon>
                <Add />
              </ListItemIcon>
              <ListItemText primary="オンライン自習室を作成" />
            </ListItemButton>
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};