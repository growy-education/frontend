import React, { useContext, useEffect, useState } from "react";
import { Container } from "@mui/material";
import { AxiosContext } from "../../contexts/AxiosContextProvider";
import { Navigate, useParams } from "react-router-dom";
import { Question } from "../../dto/question.class";
import axios from "axios";
import { plainToInstance } from "class-transformer";
import { LoadingBox } from "../../components/LoadingData";
import { QuestionDetail } from "../../components/questions/QuestionDetail";
import { StudentAccordion } from "../../components/students/StudentAccordion";

export const QuestionDetailPage = () => {
  const [question, setQuestion] = useState<null | Question>(null);
  const { axiosConfig } = useContext(AxiosContext);

  const { questionId } = useParams();
  useEffect(() => {
    axios
      .create(axiosConfig)
      .get(`/questions/${questionId}`)
      .then((response) => {
        const question = plainToInstance(Question, response.data);
        console.log(question.student);
        setQuestion(question);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosConfig, questionId]);

  if (!!!questionId) {
    return <Navigate to="/questions" />;
  }

  if (!!!question) {
    return <LoadingBox message="質問情報を取得中です" />;
  }

  return (
    <Container maxWidth="md">
      <QuestionDetail question={question} />
      <StudentAccordion student={question?.student} />
    </Container>
  );
};
