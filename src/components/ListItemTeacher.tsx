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
import { useNavigate } from "react-router-dom";

export const ListItemTeacher = () => {
  const navigate = useNavigate();
  const [teacherListOpen, setTeacherListOpen] = useState(false);

  const handleTeacherListToggle = () => {
    setTeacherListOpen(!teacherListOpen);
  };

  return (
    <>
      <ListItemButton onClick={handleTeacherListToggle}>
        <ListItemIcon>
          <School />
        </ListItemIcon>
        <ListItemText primary="講師" />
      </ListItemButton>
      <Collapse in={teacherListOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem onClick={() => navigate("teachers")}>
            <ListItemButton>
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              <ListItemText primary="講師リスト" />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => navigate("teachers/create")}>
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