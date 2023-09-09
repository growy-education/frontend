import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemProps,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { Chat, OpenInNew } from "@mui/icons-material";

export const ListItemGoogleChat = (props: ListItemProps) => {
  const navigate = useNavigate();

  const location = useLocation();

  return (
    <>
      <ListItemButton
        target="_blank"
        href="https://mail.google.com/chat/"
        rel="noreferrer"
      >
        <ListItemIcon>
          <Chat />
        </ListItemIcon>
        <ListItemText
          primary={
            <Typography
              sx={{
                verticalAlign: "bottom",
                display: "inline-flex",
                alignItems: "center",
              }}
              {...props}
            >
              Google Chat
              <OpenInNew fontSize="1rem" sx={{ ml: 0.25 }} />
            </Typography>
          }
        />
      </ListItemButton>
    </>
  );
};
