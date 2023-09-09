import { useContext } from "react";
import { UserContext } from "../contexts/UserContextProvider";
import { Role } from "../dto/enum/role.enum";
import { AdminInfo } from "../components/informations/AdminInfo";
import { CustomerInfo } from "../components/informations/CustomerInfo";
import { Box, Typography } from "@mui/material";
import { TeacherInfo } from "../components/informations/TeacherInfo";
import { PageTitleTypography } from "../components/components/Typography/PageTitleTypography";

export const HomePage = () => {
  const { user } = useContext(UserContext);
  if (user.role === Role.ADMIN) {
    return (
      <>
        <PageTitleTypography>ホーム</PageTitleTypography>
        <AdminInfo />
      </>
    );
  } else if (user.role === Role.CUSTOMER) {
    return (
      <>
        <PageTitleTypography>ホーム</PageTitleTypography>
        <CustomerInfo />
      </>
    );
  } else if (user.role === Role.TEACHER) {
    return (
      <>
        <PageTitleTypography>ホーム</PageTitleTypography>
        <TeacherInfo />
      </>
    );
  } else {
    return (
      <Typography>まだアカウントがアクティベートされていません。</Typography>
    );
  }
};
