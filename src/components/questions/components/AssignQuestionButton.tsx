import { AssignmentTurnedIn } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";
import { QuestionStatus } from "../../../dto/enum/question-status.enum";
import { Question } from "../../../dto/question.class";
import { useCallback, useContext, useState } from "react";
import { QuestionContext } from "../../../contexts/QuestionContextProvider";

type AssignQuestionButtonProps = {
  question: Question;
} & ButtonProps;

export const AssignQuestionButton = ({
  question,
  ...props
}: AssignQuestionButtonProps) => {
  const { assignQuestionById } = useContext(QuestionContext);
  const [sending, setSending] = useState(false);

  const handleClick = useCallback(() => {
    if (sending) {
      return;
    }
    setSending(true);
    assignQuestionById(question.id).finally(() => setSending(false));
  }, [sending, assignQuestionById, question.id]);

  const getButtonDescription = (status: QuestionStatus) => {
    if (status === QuestionStatus.CANCELED) {
      return "キャンセル済み";
    }

    if (status === QuestionStatus.PENDING) {
      return "質問を確認";
    }

    return "確認済み";
  };

  return (
    <Button
      variant="contained"
      endIcon={<AssignmentTurnedIn />}
      disabled={sending || question.status !== QuestionStatus.PENDING}
      onClick={handleClick}
      {...props}
    >
      {getButtonDescription(question.status)}
    </Button>
  );
};
