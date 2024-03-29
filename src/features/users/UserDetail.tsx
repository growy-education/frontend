import { Box } from "@mui/material";
import { User } from "./types/user.class";
import { HeadlineTypography } from "../../components/Element/Typography/HeadlineTypography";
import { JaDateTimeTypography } from "../../components/Element/Typography/JaDateTimeTypography";
import { DetailTypography } from "../../components/Element/Typography/DetailTyporagphy";
import { CheckUserWebhookButton } from "./CheckUserWebhookButton";
import { UserId } from "./components/UserId";

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
      <UserId id={id} />
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
