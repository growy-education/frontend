import { Typography } from "@mui/material";
import { User } from "../../types/user.class";
import { HeadlineTypography } from "../components/Typography/HeadlineTypography";
import { JaDateTime } from "../JaDateTime";

type UserDetailProps = {
  user: User;
};

export const UserDetail = ({ user }: UserDetailProps) => {
  const { id, createdAt, updatedAt, username, email, phone, role } = user;

  return (
    <>
      <HeadlineTypography>ユーザーID</HeadlineTypography>
      <Typography>{id}</Typography>
      <HeadlineTypography>作成日時</HeadlineTypography>
      <JaDateTime date={createdAt} />
      <HeadlineTypography>更新日時</HeadlineTypography>
      <JaDateTime date={updatedAt} />
      <HeadlineTypography>ユーザー名</HeadlineTypography>
      <Typography>{username}</Typography>
      <HeadlineTypography>メールアドレス</HeadlineTypography>
      <Typography>{email}</Typography>
      <HeadlineTypography>電話番号</HeadlineTypography>
      <Typography>{phone}</Typography>
      <HeadlineTypography>ユーザータイプ</HeadlineTypography>
      <Typography>{role}</Typography>
    </>
  );
};
