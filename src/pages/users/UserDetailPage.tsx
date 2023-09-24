import { useContext, useEffect, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Typography,
} from "@mui/material";
import { AxiosContext } from "../../contexts/AxiosContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../../dto/user.class";
import axios from "axios";
import { plainToInstance } from "class-transformer";
import { Delete, Edit, ExpandMore, LockOpen, Login } from "@mui/icons-material";
import { Role } from "../../dto/enum/role.enum";
import { UserDetail } from "../../components/users/UserDetail";
import { LinkedUserInformation } from "../../components/users/LinkedUserInformation";
import { HeadEditBox } from "../../components/HeadEditBox";
import { LoadingBox } from "../../components/LoadingData";
import { UserContext } from "../../contexts/UserContextProvider";
import { AlertSnackbarContext } from "../../contexts/AlertSnackbarContext";
import { AuthContext } from "../../contexts/AuthContextProvider";

export const UserDetailPage = () => {
  const { userId } = useParams();
  const { axiosConfig } = useContext(AxiosContext);
  const {
    user: currentUser,
    debugUser,
    deleteUserById,
  } = useContext(UserContext);
  const navigate = useNavigate();

  const [user, setUser] = useState<null | User>(null);

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
    <>
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
      {currentUser.role === Role.ADMIN && (
        <>
          <Accordion sx={{ marginTop: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              id="debug-user-accordion"
            >
              <Typography>ユーザーをデバッグする</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Button
                onClick={() => {
                  debugUser(user.id);
                  navigate("/home");
                }}
                variant="contained"
                endIcon={<Login />}
              >
                このユーザーとしてログイン
              </Button>
            </AccordionDetails>
          </Accordion>
          <Accordion sx={{ marginTop: 2 }}>
            <AccordionSummary
              expandIcon={<ExpandMore />}
              id="delete-user-accordion"
            >
              <Typography>ユーザーを削除する</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Button
                onClick={() => {
                  deleteUserById(user.id);
                  navigate("/users");
                }}
                variant="contained"
                endIcon={<Delete />}
              >
                このユーザーを削除
              </Button>
            </AccordionDetails>
          </Accordion>
        </>
      )}
      <Box my={3}>
        <Box mb={2}>
          <UserDetail user={user} />
        </Box>
        <Box>
          <LinkedUserInformation user={user} />
        </Box>
      </Box>
    </>
  );
};
