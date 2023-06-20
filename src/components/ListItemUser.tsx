import React, { useState } from "react";
import {
  AddCircle,
  Group,
  ListAlt,
  Person,
  PersonAdd,
  VpnKey,
} from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const ListItemUser = () => {
  const navigate = useNavigate();
  const [userListOpen, setUserListOpen] = useState(false);

  const handleUserListToggle = () => {
    setUserListOpen(!userListOpen);
  };

  return (
    <>
      <ListItemButton onClick={handleUserListToggle}>
        <ListItemIcon>
          <VpnKey />
        </ListItemIcon>
        <ListItemText primary="ユーザー" />
      </ListItemButton>
      <Collapse in={userListOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem onClick={() => navigate("/users")}>
            <ListItemButton>
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              <ListItemText primary="ユーザーリスト" />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => navigate("/users/new")}>
            <ListItemButton>
              <ListItemIcon>
                <AddCircle />
              </ListItemIcon>
              <ListItemText primary="ユーザーを作成" />
            </ListItemButton>
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};
