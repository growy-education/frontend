import { useState } from "react";
import { Group, Person, PersonAdd } from "@mui/icons-material";
import {
  Collapse,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

export const ListItemCustomer = () => {
  const navigate = useNavigate();
  const [customerListOpen, setCustomerListOpen] = useState(false);

  const handleCustomerListToggle = () => {
    setCustomerListOpen(!customerListOpen);
  };

  return (
    <>
      <ListItemButton onClick={handleCustomerListToggle}>
        <ListItemIcon>
          <Person />
        </ListItemIcon>
        <ListItemText primary="保護者情報" />
      </ListItemButton>
      <Collapse in={customerListOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem onClick={() => navigate("customers")}>
            <ListItemButton>
              <ListItemIcon>
                <Group />
              </ListItemIcon>
              <ListItemText primary="保護者リスト" />
            </ListItemButton>
          </ListItem>
          <ListItem onClick={() => navigate("customers/create")}>
            <ListItemButton>
              <ListItemIcon>
                <PersonAdd />
              </ListItemIcon>
              <ListItemText primary="保護者を作成" />
            </ListItemButton>
          </ListItem>
        </List>
      </Collapse>
    </>
  );
};
