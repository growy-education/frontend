import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from "@mui/material"
import { Quiz, Send, Tv } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"

export const DrawerListItem = () => {
    const navigate = useNavigate();
    return(
        <List>
        <ListItem onClick={() => navigate("questions")}>
          <ListItemButton>
            <ListItemIcon>
              <Quiz />
            </ListItemIcon>
            <ListItemText primary="今までの質問" />
          </ListItemButton>
        </ListItem>
        <ListItem onClick={() => navigate("questions/new")}>
          <ListItemButton>
            <ListItemIcon>
              <Send />
            </ListItemIcon>
            <ListItemText primary="質問する" />
          </ListItemButton>
        </ListItem>
        <ListItem onClick={() => navigate("studyroom")}>
          <ListItemButton>
            <ListItemIcon>
              <Tv />
            </ListItemIcon>
            <ListItemText primary="オンライン自習室" />
          </ListItemButton>
        </ListItem>
      </List>

    )
}