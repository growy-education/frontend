import { useContext } from "react";
import { Box, Button } from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../contexts/UserContextProvider";
import { UserDetail } from "../../components/users/UserDetail";
import { LinkedUserInformation } from "../../components/users/LinkedUserInformation";

export const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);

  return (
    <>
      <Box display="flex" justifyContent={"flex-end"} mb={2}>
        <Button
          variant="outlined"
          endIcon={<Edit />}
          onClick={() => navigate("edit")}
        >
          ユーザー情報を編集
        </Button>
      </Box>
      <UserDetail user={user} />
      <LinkedUserInformation user={user} />
    </>
  );
};
