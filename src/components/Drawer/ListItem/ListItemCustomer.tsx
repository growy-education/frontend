import { useState } from "react";
import { AddCircle, Contacts, ListAlt } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export const ListItemCustomer = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <ListItemButton
      onClick={() => navigate("/customers")}
      selected={location.pathname.includes("customers")}
    >
      <ListItemIcon>
        <Contacts />
      </ListItemIcon>
      <ListItemText primary="保護者" />
    </ListItemButton>
  );
};
