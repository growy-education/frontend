import {
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItemProps,
  Typography,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import { ChecklistRtl, OpenInNew } from "@mui/icons-material";

export const ListItemCorrection = (props: ListItemProps) => {
  const navigate = useNavigate();

  const location = useLocation();

  return (
    <>
      <ListItemButton
        target="_blank"
        href="https://forms.gle/GNjV4zpcmykTas6K8"
        rel="noreferrer"
      >
        <ListItemIcon>
          <ChecklistRtl />
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
              模試・過去問添削
              <OpenInNew fontSize="small" sx={{ ml: 0.25 }} />
            </Typography>
          }
        />
      </ListItemButton>
    </>
  );
};
