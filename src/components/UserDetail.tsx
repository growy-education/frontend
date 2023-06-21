import React, { useContext, useEffect, useState } from "react";
import { Typography, Box, Container, Button } from "@mui/material";
import { AxiosContext } from "../AxiosContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import { User } from "../types/user.class";
import axios from "axios";
import { QuestionTitle } from "./QuestionTitle";
import { plainToInstance } from "class-transformer";
import { Edit, LockOpen } from "@mui/icons-material";

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
        >
          ユーザーを有効にする
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
        <QuestionTitle title="ID" />
        <Typography>{id}</Typography>
        <QuestionTitle title="作成日時" />
        <Typography>{createdAt.toDateString()}</Typography>
        <QuestionTitle title="更新日時" />
        <Typography>{updatedAt.toDateString()}</Typography>
        <QuestionTitle title="ユーザー名" />
        <Typography>{username}</Typography>
        <QuestionTitle title="メールアドレス" />
        <Typography>{email}</Typography>
        <QuestionTitle title="電話番号" />
        <Typography>{phone}</Typography>
        <QuestionTitle title="ロール" />
        <Typography>{role}</Typography>
      </Box>
    </Container>
  );
};
