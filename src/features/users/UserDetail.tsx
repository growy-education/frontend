import { Divider } from "@mui/material";
import { User } from "./types/user.class";
import { HeadlineTypography } from "../../components/Element/Typography/HeadlineTypography";
import { DetailTypography } from "../../components/Element/Typography/DetailTyporagphy";
import { UserId } from "./components/UserId";
import { CreatedAt } from "../../components/shared/CreatedAt";
import { UpdatedAt } from "../../components/shared/UpdatedAt";
import { UserEmail } from "./components/UserEmail";
import { UserPhone } from "./components/UserPhone";
import { UserChatWebhookUrl } from "./components/UserChatWebhookUrl";

type UserDetailProps = {
  user: User;
};

export const UserDetail = ({ user }: UserDetailProps) => {
  const { id, createdAt, updatedAt, username, role } = user;

  return (
    <>
      <UserId id={id} />
      <Divider />
      <CreatedAt createdAt={createdAt} />
      <Divider />
      <UpdatedAt updatedAt={updatedAt} />
      <Divider />
      <HeadlineTypography>ユーザータイプ</HeadlineTypography>
      <DetailTypography>{role}</DetailTypography>
      <Divider />
      <HeadlineTypography>ユーザー名</HeadlineTypography>
      <DetailTypography>{username}</DetailTypography>
      <Divider />
      <UserEmail user={user} />
      <Divider />
      <UserPhone user={user} />
      <Divider />
      <UserChatWebhookUrl user={user} />
    </>
  );
};
