import React, { useState } from "react";
import {
  AddCircle,
  EscalatorWarning,
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
import { useLocation, useNavigate } from "react-router-dom";

export const ListItemStudent = () => {
  const navigate = useNavigate();
  const [studentListOpen, setStudentListOpen] = useState(false);

  const handleStudentListToggle = () => {
    setStudentListOpen(!studentListOpen);
  };

  const location = useLocation();

  return (
    <>
      <ListItemButton
        onClick={handleStudentListToggle}
        selected={location.pathname.includes("students")}
      >
        <ListItemIcon>
          <EscalatorWarning />
        </ListItemIcon>
        <ListItemText primary="生徒" />
      </ListItemButton>
      <Collapse in={studentListOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem onClick={() => navigate("/students")}>
            <ListItemButton>
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              <ListItemText primary="生徒リスト" />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => navigate("/students/new")}>
            <ListItemButton>
              <ListItemIcon>
                <AddCircle />
              </ListItemIcon>
              <ListItemText primary="生徒を作成" />
            </ListItemButton>
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};
