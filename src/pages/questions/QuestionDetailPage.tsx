import { useContext, useEffect, useState } from "react";
import { Box } from "@mui/material";
import { Navigate, useNavigate, useParams } from "react-router-dom";

import { Question } from "../../dto/question.class";
import { LoadingBox } from "../../components/LoadingData";
import { QuestionDetail } from "../../components/questions/QuestionDetail";
import { UserContext } from "../../contexts/UserContextProvider";
import { Role } from "../../dto/enum/role.enum";
import { EditingQuestionBox } from "../../components/questions/components/EditingQuestionBox";
import { CheckQuestionAnswerAccordion } from "../../components/questions/CheckQuestionAnswerAccordion";
import { QuestionContext } from "../../contexts/QuestionContextProvider";
import { ChangeQuestionTeacherAccordion } from "../../components/questions/ChangeQuestionTeacherBox";
import { QuestionStatus } from "../../dto/enum/question-status.enum";
import { TeacherEditQuestionBox } from "../../components/questions/TeacherEditQuestionBox";
import { NotFound } from "../../components/NotFound";
import { QuestionAlert } from "../../components/questions/QuestionAlert";

export const QuestionDetailPage = () => {
  const { questionId } = useParams();
  const { user } = useContext(UserContext);
  const { questions, getQuestionById } = useContext(QuestionContext);

  const [question, setQuestion] = useState<null | Question>(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (notFound) {
      return;
    }
    getQuestionById(questionId).then((found) => {
      if (found instanceof Question) {
        setQuestion(found);
      } else {
        setNotFound(true);
      }
    });
  }, [getQuestionById, questionId, questions, notFound]);

  if (!!!questionId) {
    return <Navigate to="/questions" />;
  }

  if (notFound) {
    return <NotFound />;
  }

  if (!!!question) {
    return <LoadingBox message="質問情報を取得中です" />;
  }

  return (
    <>
      {user.role === Role.CUSTOMER &&
        question.status !== QuestionStatus.AVAILABLE && (
          <EditingQuestionBox question={question} />
        )}
      {user.role === Role.TEACHER &&
        question.status !== QuestionStatus.CANCELED &&
        question.status !== QuestionStatus.CHECKING &&
        question.status !== QuestionStatus.AVAILABLE && (
          <TeacherEditQuestionBox question={question} />
        )}
      {user.role === Role.ADMIN && (
        <>
          {question.status !== QuestionStatus.AVAILABLE && (
            <EditingQuestionBox mb={2} question={question} />
          )}
          <Box mb={2}>
            <QuestionAlert question={question} />
          </Box>
          {question.status !== QuestionStatus.CANCELED &&
            question.status !== QuestionStatus.AVAILABLE &&
            question.status !== QuestionStatus.CHECKING && (
              <ChangeQuestionTeacherAccordion question={question} />
            )}
          {question.status === QuestionStatus.CHECKING && (
            <CheckQuestionAnswerAccordion question={question} />
          )}
        </>
      )}
      <QuestionDetail question={question} />
    </>
  );
};
