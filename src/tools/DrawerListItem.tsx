import { useContext } from "react";
import { List } from "@mui/material";
import { UserContext } from "../contexts/UserContextProvider";
import { Role } from "../dto/enum/role.enum";
import { ListItemQuestion } from "./drawer/ListItemQuestion";
import { ListItemRoom } from "./drawer/ListItemRoom";
import { ListItemUser } from "./drawer/ListItemUser";
import { ListItemTeacher } from "./drawer/ListItemTeacher";
import { ListItemCustomer } from "./drawer/ListItemCustomer";
import { ListItemStudent } from "./drawer/ListItemStudent";
import { ListItemHome } from "./drawer/ListItemHome";
import { ListItemGoogleChat } from "./drawer/ListItemGoogleChat";
import { ListItemCorrection } from "./drawer/ListItemCorrection";

export const DrawerListItem = () => {
  const { user } = useContext(UserContext);

  return (
    <List>
      <ListItemHome />
      <ListItemQuestion />
      {user.role === Role.ADMIN && (
        <>
          <ListItemUser />
          <ListItemCustomer />
          <ListItemStudent />
          <ListItemTeacher />
        </>
      )}
      {user.role === Role.CUSTOMER && (
        <>
          <ListItemRoom />
          <ListItemCorrection />
          <ListItemGoogleChat />
        </>
      )}
    </List>
  );
};
