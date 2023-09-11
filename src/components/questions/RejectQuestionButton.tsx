import { AssignmentLate } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";
import { QuestionStatus } from "../../dto/enum/question-status.enum";
import { Question } from "../../dto/question.class";
import { useCallback, useContext, useMemo, useRef, useState } from "react";
import { QuestionContext } from "../../contexts/QuestionContextProvider";

type RejectQuestionButtonProps = {
  question: Question;
} & ButtonProps;

export const RejectQuestionButton = ({
  question,
  ...props
}: RejectQuestionButtonProps) => {
  const { rejectQuestionById } = useContext(QuestionContext);
  const [sending, setSending] = useState(false);

  const disabled = useMemo(
    () =>
      question.status === QuestionStatus.CANCELED ||
      question.status === QuestionStatus.CHECKING ||
      question.status === QuestionStatus.AVAILABLE,
    [question.status]
  );

  const handleClick = useCallback(() => {
    if (sending) {
      return;
    }
    setSending(true);
    rejectQuestionById(question.id).finally(() => {
      setSending(false);
    });
  }, [question.id, rejectQuestionById, sending]);

  return (
    <Button
      variant="outlined"
      color="warning"
      endIcon={
        <AssignmentLate
          sx={{
            color: !disabled && !sending && !!!props.disabled && "warning.main",
          }}
        />
      }
      disabled={disabled && sending && props.disabled}
      onClick={handleClick}
      {...props}
    >
      回答を拒否
    </Button>
  );
};
