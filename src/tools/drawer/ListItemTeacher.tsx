import React, { useState } from "react";
import {
  AddCircle,
  Group,
  ListAlt,
  Person,
  PersonAdd,
  School,
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

export const ListItemTeacher = () => {
  const navigate = useNavigate();
  const [teacherListOpen, setTeacherListOpen] = useState(false);

  const handleTeacherListToggle = () => {
    setTeacherListOpen(!teacherListOpen);
  };

  const location = useLocation();

  return (
    <>
      <ListItemButton
        onClick={handleTeacherListToggle}
        selected={location.pathname.includes("teachers")}
      >
        <ListItemIcon>
          <School />
        </ListItemIcon>
        <ListItemText primary="講師" />
      </ListItemButton>
      <Collapse in={teacherListOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem onClick={() => navigate("/teachers")}>
            <ListItemButton>
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              <ListItemText primary="講師リスト" />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => navigate("/teachers/new")}>
            <ListItemButton>
              <ListItemIcon>
                <AddCircle />
              </ListItemIcon>
              <ListItemText primary="講師を作成" />
            </ListItemButton>
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};
