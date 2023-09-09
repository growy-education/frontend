import { Alert, AlertProps } from "@mui/material";
import { Question } from "../../dto/question.class";
import { QuestionStatus } from "../../dto/enum/question-status.enum";

type QuestionAlertProps = {
  question: Question;
} & AlertProps;

export const QuestionAlert = ({ question, ...props }: QuestionAlertProps) => {
  if (
    question.status === QuestionStatus.PENDING &&
    question?.teacher === null
  ) {
    return (
      <Alert severity="error" {...props}>
        講師が割り当てられていません
      </Alert>
    );
  }
  if (
    question.status === QuestionStatus.PENDING &&
    question?.teacher &&
    Date.now() - question.createdAt.getTime() > 12 * 60 * 60 * 1000
  ) {
    return (
      <Alert severity="error" {...props}>
        講師が質問を確認していません
      </Alert>
    );
  }
  if (
    question.status === QuestionStatus.ASSIGNED &&
    Date.now() - question.createdAt.getTime() > 24 * 60 * 60 * 1000
  ) {
    return (
      <Alert severity="error" {...props}>
        質問の回答期限を過ぎています
      </Alert>
    );
  }
  if (question.status === QuestionStatus.CHECKING) {
    return (
      <Alert severity="error" {...props}>
        回答動画のチェックが必要です
      </Alert>
    );
  }
};
