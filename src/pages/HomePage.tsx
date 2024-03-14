import { useContext } from "react";
import { Role } from "../features/users/types/role.enum";
import { AdminInfo } from "../features/informations/AdminInfo";
import { CustomerInfo } from "../features/informations/CustomerInfo";
import { Typography } from "@mui/material";
import { TeacherInfo } from "../features/informations/TeacherInfo";
import { PageTitleTypography } from "../components/Element/Typography/PageTitleTypography";
import { QuestionTaskDescription } from "../features/questions/QuestionTaskDescription";
import { AuthContext } from "../providers/auth.provider";

export const HomePage = () => {
  const { user } = useContext(AuthContext);
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
        <QuestionTaskDescription />
      </>
    );
  } else {
    return (
      <Typography>まだアカウントがアクティベートされていません。</Typography>
    );
  }
};
