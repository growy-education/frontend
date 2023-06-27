import React, { useContext, useEffect, useState } from "react";
import { Typography, Box, Container, Button } from "@mui/material";
import { AxiosContext } from "../contexts/AxiosContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../types/user.class";
import axios from "axios";
import { Title } from "./QuestionTitle";
import { plainToInstance } from "class-transformer";
import { Edit, LockOpen } from "@mui/icons-material";
import { Role } from "../types/role.enum";

export const UserDetail = () => {
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
    return <p>ローディングなう！</p>;
  }

  const { id, createdAt, updatedAt, username, email, phone, role } = user;

  return (
    <Container maxWidth="md">
      <Box display="flex" justifyContent={"flex-end"} mb={2}>
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
      </Box>
      <Box my={3}>
        <Title title="ID" />
        <Typography>{id}</Typography>
        <Title title="作成日時" />
        <Typography>{createdAt.toDateString()}</Typography>
        <Title title="更新日時" />
        <Typography>{updatedAt.toDateString()}</Typography>
        <Title title="ユーザー名" />
        <Typography>{username}</Typography>
        <Title title="メールアドレス" />
        <Typography>{email}</Typography>
        <Title title="電話番号" />
        <Typography>{phone}</Typography>
        <Title title="ロール" />
        <Typography>{role}</Typography>
      </Box>
    </Container>
  );
};
