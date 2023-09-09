import { Typography } from "@mui/material";
import { User } from "../../dto/user.class";
import { HeadlineTypography } from "../components/Typography/HeadlineTypography";
import { JaDateTimeTypography } from "../components/Typography/JaDateTimeTypography";

type UserDetailProps = {
  user: User;
};

export const UserDetail = ({ user }: UserDetailProps) => {
  const {
    id,
    createdAt,
    updatedAt,
    username,
    email,
    phone,
    role,
    chatWebhookUrl,
  } = user;

  return (
    <>
      <HeadlineTypography>ユーザーID</HeadlineTypography>
      <Typography>{id}</Typography>
      <HeadlineTypography>作成日時</HeadlineTypography>
      <JaDateTimeTypography date={createdAt} />
      <HeadlineTypography>更新日時</HeadlineTypography>
      <JaDateTimeTypography date={updatedAt} />
      <HeadlineTypography>ユーザー名</HeadlineTypography>
      <Typography>{username}</Typography>
      <HeadlineTypography>メールアドレス</HeadlineTypography>
      <Typography>{email}</Typography>
      <HeadlineTypography>電話番号</HeadlineTypography>
      <Typography>{phone}</Typography>
      <HeadlineTypography>ユーザータイプ</HeadlineTypography>
      <Typography>{role}</Typography>
      <HeadlineTypography>GoogleChat WebhookURL(DM)</HeadlineTypography>
      <Typography sx={{ wordBreak: "break-all" }}>{chatWebhookUrl}</Typography>
    </>
  );
};
