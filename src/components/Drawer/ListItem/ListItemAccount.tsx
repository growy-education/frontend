import { useState } from "react";
import { AccountBox, AddCircle } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export const ListItemAccount = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <>
      <ListItemButton
        onClick={() => navigate("/account")}
        selected={location.pathname.includes("account")}
      >
        <ListItemIcon>
          <AccountBox />
        </ListItemIcon>
        <ListItemText primary="アカウント　　　" />
      </ListItemButton>
    </>
  );
};
