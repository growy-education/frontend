import { useEffect, useState } from "react";
import { useAxiosConfig } from "../../contexts/AxiosContextProvider";
import { Question } from "../../types/question.class";
import { useParams } from "react-router-dom";
import axios from "axios";
import { plainToInstance } from "class-transformer";
import { QuestionDetail } from "../../components/questions/QuestionDetail";

export const QuestionAssignedPage = () => {
  const [question, setQuestion] = useState<null | Question>(null);
  const { axiosConfig } = useAxiosConfig();

  const { questionId } = useParams();

  useEffect(() => {
    axios
      .create(axiosConfig)
      .get(`/questions/${questionId}`)
      .then((response) => {
        const question = plainToInstance(Question, response.data);
        setQuestion(question);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [axiosConfig, questionId]);
  return (
    <>
      <QuestionDetail question={question} />
    </>
  );
};
