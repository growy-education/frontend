import { Alert, AlertProps } from "@mui/material";
import { Question } from "../../dto/question.class";
import { QuestionStatus } from "../../dto/enum/question-status.enum";
import { useContext } from "react";
import { UserContext } from "../../contexts/UserContextProvider";

type TeacherQuestionAlertProps = {
  question: Question;
} & AlertProps;

export const TeacherQuestionAlert = ({
  question,
  ...props
}: TeacherQuestionAlertProps) => {
  const { user } = useContext(UserContext);
  if (user?.teacher?.id !== question?.teacher.id) {
    return (
      <Alert severity="info" sx={{ my: 1 }} {...props}>
        この質問は他の講師に割り当てられています
      </Alert>
    );
  }
  if (
    question.status === QuestionStatus.PENDING &&
    Date.now() - question.createdAt.getTime() > 12 * 60 * 60 * 1000
  ) {
    return (
      <Alert severity="error" sx={{ my: 1 }} {...props}>
        質問を今すぐ確認してください
      </Alert>
    );
  }
  if (question.status === QuestionStatus.PENDING) {
    return (
      <Alert severity="warning" sx={{ my: 1 }} {...props}>
        質問を確認してください
      </Alert>
    );
  }
  if (
    question.status === QuestionStatus.ASSIGNED &&
    Date.now() - question.createdAt.getTime() > 24 * 60 * 60 * 1000
  ) {
    return (
      <Alert severity="error" sx={{ my: 1 }} {...props}>
        質問の回答期限を過ぎています
      </Alert>
    );
  }

  if (question.status === QuestionStatus.ASSIGNED) {
    return (
      <Alert severity="warning" sx={{ my: 1 }} {...props}>
        質問に回答してください
      </Alert>
    );
  }
  if (question.status === QuestionStatus.CHECKING) {
    return (
      <Alert severity="info" sx={{ my: 1 }} {...props}>
        運営が回答動画をチェック中です
      </Alert>
    );
  }
};
