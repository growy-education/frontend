import { useContext } from "react";
import { List } from "@mui/material";
import { Role } from "../../features/users/types/role.enum";
import { ListItemQuestion } from "./ListItem/ListItemQuestion";
import { ListItemRoom } from "./ListItem/ListItemRoom";
import { ListItemUser } from "./ListItem/ListItemUser";
import { ListItemTeacher } from "./ListItem/ListItemTeacher";
import { ListItemCustomer } from "./ListItem/ListItemCustomer";
import { ListItemStudent } from "./ListItem/ListItemStudent";
import { ListItemHome } from "./ListItem/ListItemHome";
import { ListItemGoogleChat } from "./ListItem/ListItemGoogleChat";
import { ListItemCorrection } from "./ListItem/ListItemCorrection";
import { AuthContext } from "../../providers/auth.provider";
import { ListItemSettings } from "./ListItem/ListItemSettings";
import { LIstItemLesson } from "./ListItem/ListItemLesson";

export const DrawerListItem = () => {
  const { user } = useContext(AuthContext);

  return (
    <List>
      <ListItemHome />
      <ListItemQuestion />
      <ListItemRoom />
      <LIstItemLesson />
      <ListItemGoogleChat />

      {user.role === Role.ADMIN && (
        <>
          <ListItemUser />
          <ListItemCustomer />
          <ListItemStudent />
          <ListItemTeacher />
        </>
      )}
      <ListItemSettings />
    </List>
  );
};
