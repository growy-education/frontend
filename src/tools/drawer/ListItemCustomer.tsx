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
  const [customerListOpen, setCustomerListOpen] = useState(false);

  const handleCustomerListToggle = () => {
    setCustomerListOpen(!customerListOpen);
  };

  const location = useLocation();

  return (
    <>
      <ListItemButton
        onClick={handleCustomerListToggle}
        selected={location.pathname.includes("customers")}
      >
        <ListItemIcon>
          <Contacts />
        </ListItemIcon>
        <ListItemText primary="保護者" />
      </ListItemButton>
      <Collapse in={customerListOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem onClick={() => navigate("/customers")}>
            <ListItemButton>
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              <ListItemText primary="保護者リスト" />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => navigate("/customers/new")}>
            <ListItemButton>
              <ListItemIcon>
                <AddCircle />
              </ListItemIcon>
              <ListItemText primary="保護者を作成" />
            </ListItemButton>
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};
