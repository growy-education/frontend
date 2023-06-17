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
import axios from "axios";
import { QuestionTitle } from "./QuestionTitle";
import { Teacher } from "../types/teacher.class";

export const TeacherDetail = () => {
  const [teacher, setTeacher] = useState<null | Teacher>(null);
  const { axiosConfig } = useContext(AxiosContext);

  const { teacherId } = useParams();
  console.log(teacher);
  useEffect(() => {
    console.log("param teacherId:", teacherId);
    axios
      .create(axiosConfig)
      .get(`/teachers/${teacherId}`)
      .then((response) => {
        setTeacher(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosConfig, teacherId]);

  if (!teacherId) {
    return <p>だめだこりゃ！</p>;
  }

  if (!!!teacher) {
    return <p>ローディングなう！</p>;
  }

  const {
    id,
    createdAt,
    updatedAt,
    firstName,
    firstNameKana,
    lastName,
    lastNameKana,
    status,
    chatworkAccountId,
    assignedQuestionsNumber,
  } = teacher;

  return (
    <Container maxWidth="md">
      <Box my={3}>
        <QuestionTitle title="ID" />
        <Typography>{id}</Typography>
        <QuestionTitle title="作成日時" />
        <Typography>{createdAt.toDateString()}</Typography>
        <QuestionTitle title="更新日時" />
        <Typography>{updatedAt.toDateString()}</Typography>
        <QuestionTitle title="名前" />
        <Typography>{firstName}</Typography>
        <QuestionTitle title="名前（読み仮名）" />
        <Typography>{firstNameKana}</Typography>
        <QuestionTitle title="苗字" />
        <Typography>{lastName}</Typography>
        <QuestionTitle title="苗字（読み仮名）" />
        <Typography>{lastNameKana}</Typography>
        <QuestionTitle title="ステータス" />
        <Typography>{status}</Typography>
        <QuestionTitle title="Chatwork アカウントID" />
        <Typography>{chatworkAccountId}</Typography>
        <QuestionTitle title="残り質問タスク数" />
        <Typography>{assignedQuestionsNumber}</Typography>
      </Box>
    </Container>
  );
};
