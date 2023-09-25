import { Box } from "@mui/material";
import { User } from "../../dto/user.class";
import { HeadlineTypography } from "../components/Typography/HeadlineTypography";
import { JaDateTimeTypography } from "../components/Typography/JaDateTimeTypography";
import { DetailTypography } from "../components/DetailTyporagphy";
import { CheckUserWebhookButton } from "./CheckUserWebhookButton";

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
      <DetailTypography>{id}</DetailTypography>
      <HeadlineTypography>作成日時</HeadlineTypography>
      <JaDateTimeTypography textAlign="right" date={createdAt} />
      <HeadlineTypography>更新日時</HeadlineTypography>
      <JaDateTimeTypography textAlign="right" date={updatedAt} />
      <HeadlineTypography>ユーザータイプ</HeadlineTypography>
      <DetailTypography>{role}</DetailTypography>
      <HeadlineTypography>ユーザー名</HeadlineTypography>
      <DetailTypography>{username}</DetailTypography>
      <HeadlineTypography>メールアドレス</HeadlineTypography>
      <DetailTypography>{email}</DetailTypography>
      <HeadlineTypography>電話番号</HeadlineTypography>
      <DetailTypography>{phone}</DetailTypography>
      <HeadlineTypography>GoogleChat WebhookURL(DM)</HeadlineTypography>
      <Box display="flex" justifyContent="flex-end">
        <CheckUserWebhookButton user={user} />
      </Box>
      <DetailTypography sx={{ wordBreak: "break-all" }}>
        {chatWebhookUrl}
      </DetailTypography>
    </>
  );
};
