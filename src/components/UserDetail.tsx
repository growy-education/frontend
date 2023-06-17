import React, { useContext, useEffect, useState } from "react";
import {
  Typography,
  Box,
  Container,
  Grid,
  Card,
  CardMedia,
  CardContent,
} from "@mui/material";
import { AxiosContext } from "../AxiosContextProvider";
import { useParams } from "react-router-dom";
import { User } from "../types/user.class";
import axios from "axios";
import { QuestionTitle } from "./QuestionTitle";

export const UserDetail = () => {
  const [user, setUser] = useState<null | User>(null);
  const { axiosConfig } = useContext(AxiosContext);

  const { userId } = useParams();
  console.log(user);
  useEffect(() => {
    console.log("param userId:", userId);
    axios
      .create(axiosConfig)
      .get(`/users/${userId}`)
      .then((response) => {
        setUser(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosConfig, userId]);

  if (!userId) {
    return <p>だめだこりゃ！</p>;
  }

  if (!!!user) {
    return <p>ローディングなう！</p>;
  }

  const { id, createdAt, updatedAt, username, email, phone, role } = user;

  return (
    <Container maxWidth="md">
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
