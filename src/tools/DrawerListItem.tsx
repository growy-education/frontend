import { useContext } from "react";
import { List } from "@mui/material";
import { UserContext } from "../contexts/UserContextProvider";
import { Role } from "../types/role.enum";
import { ListItemQuestion } from "../components/ListItemQuestion";
import { ListItemRoom } from "../components/ListItemRoom";
import { ListItemUser } from "../components/ListItemUser";
import { ListItemTeacher } from "../components/ListItemTeacher";
import { ListItemCustomer } from "../components/ListItemCustomer";
import { ListItemStudent } from "../components/ListItemStudent";

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
