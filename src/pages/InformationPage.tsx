import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import { Role } from "../types/role.enum";
import { AdminInfo } from "../components/informations/AdminInfo";
import { CustomerInfo } from "../components/informations/CustomerInfo";
import { Typography } from "@mui/material";
import { TeacherInfo } from "../components/informations/TeacherInfo";

export const Information = () => {
  const { user } = useContext(UserContext);
  if (user.role === Role.ADMIN) {
    return <AdminInfo />;
  } else if (user.role === Role.CUSTOMER) {
    return <CustomerInfo />;
  } else if (user.role === Role.TEACHER) {
    return <TeacherInfo />;
  } else {
    return (
      <Typography>まだアカウントがアクティベートされていません。</Typography>
    );
  }

  return <p>特にないよ！</p>;
};
