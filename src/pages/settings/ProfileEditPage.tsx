import { useContext } from "react";
import { UserEdit } from "../../features/users/UserEdit";
import { AuthContext } from "../../providers/auth.provider";

export const ProfileEditPage = () => {
  const { user } = useContext(AuthContext);

  return (
    <>
      <UserEdit user={user} />
    </>
  );
};
