import React, { useContext, useEffect, useState } from "react";
import { Typography, Box, Container } from "@mui/material";
import { AxiosContext } from "../contexts/AxiosContextProvider";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Title } from "./QuestionTitle";
import { Student } from "../types/student.class";
import { plainToInstance } from "class-transformer";

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
        const student = plainToInstance(Student, response.data);
        setStudent(student);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosConfig, studentId]);

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
        <Title title="ID" />
        <Typography>{id}</Typography>
        <Title title="作成日時" />
        <Typography>{createdAt.toDateString()}</Typography>
        <Title title="更新日時" />
        <Typography>{updatedAt.toDateString()}</Typography>
        <Title title="名前" />
        <Typography>{firstName}</Typography>
        <Title title="名前（読み仮名）" />
        <Typography>{firstNameKana}</Typography>
        <Title title="苗字" />
        <Typography>{lastName}</Typography>
        <Title title="苗字（読み仮名）" />
        <Typography>{lastNameKana}</Typography>
        <Title title="性別" />
        <Typography>{gender}</Typography>
      </Box>
    </Container>
  );
};
