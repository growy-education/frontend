import { useContext, useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { Question } from "../../dto/question.class";
import { LoadingBox } from "../../components/LoadingData";
import { QuestionDetail } from "../../components/questions/QuestionDetail";
import { Role } from "../../dto/enum/role.enum";
import { CheckQuestionAnswerAccordion } from "../../components/questions/CheckQuestionAnswerAccordion";
import { QuestionContext } from "../../contexts/QuestionContextProvider";
import { ChangeQuestionTeacherAccordion } from "../../components/questions/ChangeQuestionTeacherBox";
import { QuestionStatus } from "../../dto/enum/question-status.enum";
import { NotFound } from "../../components/NotFound";
import { AdminQuestionAlert } from "../../components/questions/AdminQuestionAlert";
import { QuestionHeaderBox } from "../../components/questions/QuestionHeaderBox";
import { RolesGuard } from "../../tools/RolesGuard";
import { QuestionStatusesGuard } from "../../tools/QuestionStatusesGuard";
import { AnswerQuestionAccordion } from "../../components/questions/AnswerQuestionAccordion";
import { TeacherQuestionAlert } from "../../components/questions/TeacherQuestionAlert";
import { QuestionTasksAccordion } from "../../components/questions/AnswerQuestionTaskAccordion";

export const QuestionDetailPage = () => {
  const { questionId } = useParams();
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
      <QuestionHeaderBox question={question} my={1} />
      <RolesGuard roles={[Role.ADMIN]}>
        <AdminQuestionAlert question={question} />
      </RolesGuard>
      <RolesGuard roles={[Role.TEACHER]}>
        <TeacherQuestionAlert question={question} />
      </RolesGuard>
      <RolesGuard roles={[Role.ADMIN]}>
        <QuestionStatusesGuard
          question={question}
          statuses={[
            QuestionStatus.PENDING,
            QuestionStatus.ASSIGNED,
            QuestionStatus.CHECKING,
          ]}
        >
          <ChangeQuestionTeacherAccordion question={question} />
        </QuestionStatusesGuard>
      </RolesGuard>
      <RolesGuard roles={[Role.ADMIN, Role.TEACHER]}>
        <QuestionTasksAccordion question={question} />
      </RolesGuard>

      <QuestionDetail question={question} />
    </>
  );
};
