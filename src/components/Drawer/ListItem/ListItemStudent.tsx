import React, { useState } from "react";
import { AddCircle, EscalatorWarning, ListAlt } from "@mui/icons-material";
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
    <ListItemButton
      onClick={() => navigate("/students")}
      selected={location.pathname.includes("students")}
    >
      <ListItemIcon>
        <EscalatorWarning />
      </ListItemIcon>
      <ListItemText primary="生徒" />
    </ListItemButton>
  );
};
