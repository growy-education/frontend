import { useContext } from "react";
import { UserDetail } from "../../features/users/UserDetail";
import { AuthContext } from "../../providers/auth.provider";
import { PageTitleTypography } from "../../components/Element/Typography/PageTitleTypography";

export const ProfilePage = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <PageTitleTypography>アカウント</PageTitleTypography>
      <UserDetail user={user} />
    </>
  );
};
