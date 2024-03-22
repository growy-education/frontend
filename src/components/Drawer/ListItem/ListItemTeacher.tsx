import { School } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export const ListItemTeacher = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <ListItemButton
      onClick={() => navigate("/teachers")}
      selected={location.pathname.includes("teachers")}
    >
      <ListItemIcon>
        <School />
      </ListItemIcon>
      <ListItemText primary="講師" />
    </ListItemButton>
  );
};
