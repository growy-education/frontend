import { Navigate, useParams } from "react-router-dom";

import { useQuestion } from "../../features/questions/api/getQuestion";

import { LoadingBox } from "../../features/LoadingData";
import { AlertBox } from "../../features/AlertBox";
import { QuestionHeaderBox } from "../../features/questions/components/header/QuestionHeaderBox";
import { QuestionAlert } from "../../features/questions/components/alert/QuestionAlert";
import { ChangeTeacherAccordion } from "../../features/questions/components/teacher/ChangeTeacherBox";
import { QuestionTasksAccordion } from "../../features/questions/components/tasks/TasksAccordion";
import { QuestionDetail } from "../../features/questions/QuestionDetail";

export const QuestionDetailPage = () => {
  const { questionId } = useParams();

  const {
    data: question,
    isError,
    isLoading,
  } = useQuestion({
    questionId,
  });

  if (!!!questionId) {
    return <Navigate to="/questions" />;
  }

  if (isLoading) {
    return <LoadingBox message="質問情報を取得中です" />;
  }

  if (isError) {
    return (
      <AlertBox
        severity="error"
        title="エラーが発生しました"
        description="質問情報の取得に失敗しました。"
      />
    );
  }

  return (
    <>
      <QuestionHeaderBox question={question} my={1} />
      <QuestionAlert question={question} />
      <ChangeTeacherAccordion question={question} />
      <QuestionTasksAccordion question={question} />
      <QuestionDetail question={question} />
    </>
  );
};
