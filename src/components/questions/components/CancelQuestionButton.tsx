import { useCallback, useContext, useMemo, useState } from "react";
import { Button, ButtonProps } from "@mui/material";
import { Cancel } from "@mui/icons-material";

import { Question } from "../../../dto/question.class";
import { QuestionStatus } from "../../../dto/enum/question-status.enum";
import { QuestionContext } from "../../../contexts/QuestionContextProvider";

type CancelQuestionButtonProps = {
  question: Question;
} & ButtonProps;

export const CancelQuestionButton = ({
  question,
  ...props
}: CancelQuestionButtonProps) => {
  const { cancelQuestionById } = useContext(QuestionContext);
  const disabled = useMemo(
    () => question.status !== QuestionStatus.PENDING,
    [question.status]
  );

  const [sending, setSending] = useState(false);

  const handleClick = useCallback(() => {
    if (sending) {
      return;
    }
    setSending(true);
    cancelQuestionById(question.id).finally(() => {
      setSending(false);
    });
  }, [cancelQuestionById, question.id, sending]);

  return (
    <Button
      variant="outlined"
      color="error"
      endIcon={
        <Cancel
          sx={{
            color: !disabled && !sending && !!!props.disabled && "error.main",
          }}
        />
      }
      disabled={disabled || sending}
      onClick={handleClick}
      {...props}
    >
      質問をキャンセル
    </Button>
  );
};
