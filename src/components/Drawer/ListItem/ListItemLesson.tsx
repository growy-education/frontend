import { CalendarToday } from "@mui/icons-material";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export const LIstItemLesson = () => {
  const navigate = useNavigate();

  const location = useLocation();

  return (
    <>
      <ListItemButton
        selected={location.pathname.includes("lessons")}
        onClick={() => navigate("/lessons")}
      >
        <ListItemIcon>
          <CalendarToday />
        </ListItemIcon>
        <ListItemText primary="今日の授業" />
      </ListItemButton>
    </>
  );
};
