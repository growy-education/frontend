import { Block } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";
import { QuestionStatus } from "../../dto/enum/question-status.enum";
import { Question } from "../../dto/question.class";
import { useCallback, useContext, useRef, useState } from "react";
import { QuestionContext } from "../../contexts/QuestionContextProvider";

type RejectQuestionAnswerButtonProps = {
  question: Question;
} & ButtonProps;

export const RejectQuestionAnswerButton = ({
  question,
  ...props
}: RejectQuestionAnswerButtonProps) => {
  const { rejectQuestionAnswerById } = useContext(QuestionContext);
  const [sending, setSending] = useState(false);

  const handleClick = useCallback(() => {
    if (sending) {
      return;
    }
    setSending(true);
    rejectQuestionAnswerById(question.id).finally(() => setSending(false));
  }, [question.id, rejectQuestionAnswerById, sending]);

  return (
    <Button
      variant="outlined"
      color="warning"
      endIcon={<Block sx={{ color: "warning.main" }} />}
      disabled={question.status !== QuestionStatus.CHECKING}
      onClick={handleClick}
      {...props}
    >
      回答動画を拒否
    </Button>
  );
};
