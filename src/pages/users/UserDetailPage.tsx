import { useContext, useEffect, useState } from "react";
import { Box, Container, Button } from "@mui/material";
import { AxiosContext } from "../../contexts/AxiosContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../dto/user.class";
import axios from "axios";
import { plainToInstance } from "class-transformer";
import { Edit, LockOpen } from "@mui/icons-material";
import { Role } from "../../dto/enum/role.enum";
import { UserDetail } from "../../components/users/UserDetail";
import { LinkedUserInformation } from "../../components/users/LinkedUserInformation";
import { HeadEditBox } from "../../components/HeadEditBox";
import { LoadingBox } from "../../components/LoadingData";

export const UserDetailPage = () => {
  const [user, setUser] = useState<null | User>(null);
  const { axiosConfig } = useContext(AxiosContext);
  const navigate = useNavigate();

  const { userId } = useParams();
  useEffect(() => {
    console.log("param userId:", userId);
    axios
      .create(axiosConfig)
      .get(`/users/${userId}`)
      .then((response) => {
        const user = plainToInstance(User, response.data);
        setUser(user);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosConfig, userId]);

  if (!!!user) {
    return <LoadingBox message="講師情報を取得中" />;
  }

  return (
    <Container maxWidth="md">
      <HeadEditBox>
        <Button
          variant="outlined"
          endIcon={<LockOpen />}
          onClick={() => navigate("activate")}
          disabled={user.role !== Role.PENDING}
        >
          {user.role !== Role.PENDING
            ? "ユーザーは有効です"
            : "ユーザーを有効にする"}
        </Button>
        <Button
          variant="outlined"
          endIcon={<Edit />}
          onClick={() => navigate("edit")}
        >
          ユーザー情報を編集
        </Button>
      </HeadEditBox>
      <Box my={3}>
        <Box mb={2}>
          <UserDetail user={user} />
        </Box>
        <Box>
          <LinkedUserInformation user={user} />
        </Box>
      </Box>
    </Container>
  );
};
