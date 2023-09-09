import { AssignmentTurnedIn } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";
import { QuestionStatus } from "../../../dto/enum/question-status.enum";
import { Question } from "../../../dto/question.class";
import { useCallback, useContext, useRef } from "react";
import { QuestionContext } from "../../../contexts/QuestionContextProvider";

type AssignQuestionButtonProps = {
  question: Question;
} & ButtonProps;

export const AssignQuestionButton = ({
  question,
  ...props
}: AssignQuestionButtonProps) => {
  const { assignQuestionById } = useContext(QuestionContext);
  const sending = useRef(false);

  const handleClick = useCallback(() => {
    if (sending.current) {
      return;
    }
    sending.current = true;
    assignQuestionById(question.id).finally(() => (sending.current = false));
  }, [question, assignQuestionById]);

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
      disabled={question.status !== QuestionStatus.PENDING}
      onClick={handleClick}
      {...props}
    >
      {getButtonDescription(question.status)}
    </Button>
  );
};
