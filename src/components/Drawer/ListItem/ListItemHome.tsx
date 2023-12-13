import { Home } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export const ListItemHome = () => {
  const navigate = useNavigate();

  const location = useLocation();

  return (
    <>
      <ListItemButton
        selected={location.pathname.includes("home")}
        onClick={() => navigate("/home")}
      >
        <ListItemIcon>
          <Home />
        </ListItemIcon>
        <ListItemText primary="ホーム" />
      </ListItemButton>
    </>
  );
};
