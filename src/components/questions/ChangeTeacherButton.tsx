import { PublishedWithChanges } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";
import { useCallback, useContext, useState } from "react";
import { QuestionContext } from "../../contexts/QuestionContextProvider";
import { Question } from "../../dto/question.class";
import { QuestionStatus } from "../../dto/enum/question-status.enum";

type ChangeTeacherButtonProps = {
  question: Question;
  teacherId: string;
} & ButtonProps;

export const ChangeTeacherButton = ({
  question,
  teacherId,
  ...props
}: ChangeTeacherButtonProps) => {
  const { changeQuestionTeacherById } = useContext(QuestionContext);

  const [sending, setSending] = useState(false);
  const handleClick = useCallback(() => {
    if (sending) {
      return;
    }
    setSending(true);
    changeQuestionTeacherById(question.id, teacherId).finally(() =>
      setSending(false)
    );
  }, [changeQuestionTeacherById, question.id, sending, teacherId]);

  return (
    <Button
      variant="contained"
      endIcon={<PublishedWithChanges />}
      disabled={
        question?.teacher?.id === teacherId ||
        sending ||
        question.status === QuestionStatus.CANCELED ||
        question.status === QuestionStatus.AVAILABLE
      }
      onClick={handleClick}
    >
      講師を変更する
    </Button>
  );
};
