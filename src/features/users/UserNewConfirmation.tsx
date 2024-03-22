import { Box, Typography } from "@mui/material";
import { HeadlineTypography } from "../../components/Element/Typography/HeadlineTypography";
import { CreateUserDto } from "./types/create-user.dto";
import { Role } from "./types/role.enum";
import { CustomerNewConfirmation } from "../customers/CustomerNewConfirmation";
import { StudentNewConfirmation } from "../students/StudentNewConfirmation";
import { TeacherNewConfirmation } from "../teachers/TeacherNewConfirmation";

export const UserNewConfirmation = ({ dto }: { dto: CreateUserDto }) => {
  const { customerDto, studentDto, teacherDto, ...leftCreateUserDto } = dto;
  const { role, username, password, email, phone, chatWebhookUrl } =
    leftCreateUserDto;

  return (
    <>
      <HeadlineTypography>ユーザー情報</HeadlineTypography>
      <Box m={2}>
        <HeadlineTypography>アカウントタイプ</HeadlineTypography>
        <Typography>{role}</Typography>

        <HeadlineTypography>ユーザー名</HeadlineTypography>
        <Typography>{username}</Typography>

        <HeadlineTypography>パスワード</HeadlineTypography>
        <Typography>{password}</Typography>

        <HeadlineTypography>メールアドレス</HeadlineTypography>
        <Typography>{email}</Typography>

        <HeadlineTypography>電話番号</HeadlineTypography>
        <Typography>{phone}</Typography>

        <HeadlineTypography>GoogleChat Webhook(DM)</HeadlineTypography>
        <Typography>{chatWebhookUrl}</Typography>
      </Box>

      {role === Role.CUSTOMER && (
        <>
          <CustomerNewConfirmation dto={customerDto} />
          <StudentNewConfirmation dto={studentDto} />
        </>
      )}

      {role === Role.TEACHER && <TeacherNewConfirmation dto={teacherDto} />}
    </>
  );
};
