import React, { useContext, useEffect, useState } from "react";
import { Typography, Box, Container, Button } from "@mui/material";
import { AxiosContext } from "../../contexts/AxiosContextProvider";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { Title } from "../../components/QuestionTitle";
import { Student } from "../../types/student.class";
import { plainToInstance } from "class-transformer";
import { StudentDetail } from "../../components/students/StudentDetail";

export const StudentDetailProps = () => {
  const [student, setStudent] = useState<null | Student>(null);
  const { axiosConfig } = useContext(AxiosContext);
  const navigate = useNavigate();

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

  return (
    <Container maxWidth="md">
      <Box my={3}>
        <StudentDetail student={student} />
        {!!student?.user && (
          <>
            <Title title="ユーザー" />
            <Button onClick={() => navigate(`/users/${student.user.id}`)}>
              ユーザー詳細ページへ
            </Button>
          </>
        )}
      </Box>
    </Container>
  );
};
