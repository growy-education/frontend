import { useContext } from "react";
import { UserEdit } from "../../components/users/UserEdit";
import { UserContext } from "../../contexts/UserContextProvider";
import { useNavigate } from "react-router-dom";

export const ProfileEditPage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <>
      <UserEdit
        user={user}
        onCancel={() => navigate("/profile")}
        onSuccess={() => navigate("/profile")}
      />
    </>
  );
};
