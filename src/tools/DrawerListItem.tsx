import { useContext } from "react";
import { List } from "@mui/material";
import { UserContext } from "../UserContextProvider";
import { Role } from "../types/role.type";
import { ListItemQuestion } from "../components/ListItemQuestion";
import { ListItemRoom } from "../components/ListItemRoom";
import { ListItemUser } from "../components/ListItemUser";
import { ListItemTeacher } from "../components/ListItemTeacher";
import { ListItemCustomer } from "../components/ListItemCustomer";

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
          <ListItemTeacher />
        </>
      )}
      {user.role === Role.CUSTOMER && <></>}
      {user.role === Role.TEACHER && <></>}
    </List>
  );
};
