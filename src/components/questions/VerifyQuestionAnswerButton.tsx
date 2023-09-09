import { Verified } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";
import { QuestionStatus } from "../../dto/enum/question-status.enum";
import { Question } from "../../dto/question.class";
import { useCallback, useContext, useRef } from "react";
import { QuestionContext } from "../../contexts/QuestionContextProvider";

type VerifyQuestionAnswerButtonProps = {
  question: Question;
} & ButtonProps;

export const VerifyQuestionAnswerButton = ({
  question,
  ...props
}: VerifyQuestionAnswerButtonProps) => {
  const { verifyQuestionAnswerById } = useContext(QuestionContext);
  const sending = useRef(false);

  const handleClick = useCallback(() => {
    if (sending.current) {
      return;
    }
    sending.current = true;
    verifyQuestionAnswerById(question.id).finally(
      () => (sending.current = false)
    );
  }, [question, verifyQuestionAnswerById]);

  return (
    <Button
      variant="contained"
      color="primary"
      endIcon={<Verified />}
      disabled={sending.current || question.status !== QuestionStatus.CHECKING}
      onClick={handleClick}
      {...props}
    >
      回答動画を確認
    </Button>
  );
};
