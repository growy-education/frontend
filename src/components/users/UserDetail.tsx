import { Typography } from "@mui/material";
import { User } from "../../types/user.class";
import { Title } from "../QuestionTitle";

type UserDetailProps = {
  user: User;
};

export const UserDetail = ({ user }: UserDetailProps) => {
  const { id, createdAt, updatedAt, username, email, phone, role } = user;

  return (
    <>
      <Title title="ID" />
      <Typography>{id}</Typography>
      <Title title="作成日時" />
      <Typography>{createdAt.toDateString()}</Typography>
      <Title title="更新日時" />
      <Typography>{updatedAt.toDateString()}</Typography>
      <Title title="ユーザー名" />
      <Typography>{username}</Typography>
      <Title title="メールアドレス" />
      <Typography>{email}</Typography>
      <Title title="電話番号" />
      <Typography>{phone}</Typography>
      <Title title="ロール" />
      <Typography>{role}</Typography>
    </>
  );
};
