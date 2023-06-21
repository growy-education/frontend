import React, { useContext, useEffect, useState } from "react";
import { Typography, Box, Container } from "@mui/material";
import { AxiosContext } from "../AxiosContextProvider";
import { useParams } from "react-router-dom";
import axios from "axios";
import { QuestionTitle } from "./QuestionTitle";
import { Student } from "../types/student.class";

export const StudentDetail = () => {
  const [student, setStudent] = useState<null | Student>(null);
  const { axiosConfig } = useContext(AxiosContext);

  const { studentId } = useParams();
  console.log(student);
  useEffect(() => {
    console.log("param studentId:", studentId);
    axios
      .create(axiosConfig)
      .get(`/students/${studentId}`)
      .then((response) => {
        setStudent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosConfig, studentId]);

  if (!studentId) {
    return <p>だめだこりゃ！</p>;
  }

  if (!!!student) {
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
    gender,
  } = student;

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
        <QuestionTitle title="性別" />
        <Typography>{gender}</Typography>
      </Box>
    </Container>
  );
};
