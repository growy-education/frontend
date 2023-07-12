import { useContext } from "react";
import { List } from "@mui/material";
import { UserContext } from "../contexts/UserContextProvider";
import { Role } from "../types/role.enum";
import { ListItemQuestion } from "./drawer/ListItemQuestion";
import { ListItemRoom } from "./drawer/ListItemRoom";
import { ListItemUser } from "./drawer/ListItemUser";
import { ListItemTeacher } from "./drawer/ListItemTeacher";
import { ListItemCustomer } from "./drawer/ListItemCustomer";
import { ListItemStudent } from "./drawer/ListItemStudent";

export const DrawerListItem = () => {
  const { user } = useContext(UserContext);

  return (
    <List>
      <ListItemQuestion />
      <ListItemRoom />
      {user.role === Role.ADMIN && (
        <>
          <ListItemUser />
          <ListItemCustomer />
          <ListItemStudent />
          <ListItemTeacher />
        </>
      )}
      {user.role === Role.CUSTOMER && <></>}
      {user.role === Role.TEACHER && <></>}
    </List>
  );
};
