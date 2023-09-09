import { Laptop, OpenInNew } from "@mui/icons-material";
import {
  ListItemButton,
  ListItemIcon,
  ListItemProps,
  ListItemText,
  Typography,
} from "@mui/material";
import { useContext, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContextProvider";
import { Role } from "../../dto/enum/role.enum";

export const ListItemRoom = (props: ListItemProps) => {
  const navigate = useNavigate();
  const [roomListOpen, setRoomListOpen] = useState(false);

  const { user } = useContext(UserContext);

  // const handleRoomListToggle = () => {
  //   setRoomListOpen(!roomListOpen);
  // };

  const location = useLocation();

  return (
    <>
      <ListItemButton
        target="_blank"
        href="https://forms.gle/X4bSytAtYh1vyMZe6"
        rel="noreferrer"
        // onClick={handleRoomListToggle}
        // selected={location.pathname.includes("rooms")}
      >
        <ListItemIcon>
          <Laptop />
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
              オンライン自習室
              <OpenInNew fontSize="1rem" sx={{ ml: 0.25 }} />
            </Typography>
          }
        />
      </ListItemButton>
      {/* <Collapse in={roomListOpen} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem onClick={() => navigate("/rooms")}>
            <ListItemButton>
              <ListItemIcon>
                <ListAlt />
              </ListItemIcon>
              <ListItemText primary="自習室リスト" />
            </ListItemButton>
          </ListItem>
          {user.role === Role.ADMIN && (
            <ListItem onClick={() => navigate("/rooms/new")}>
              <ListItemButton>
                <ListItemIcon>
                  <AddCircle />
                </ListItemIcon>
                <ListItemText primary="オンライン自習室を作成" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Collapse> */}
    </>
  );
};
