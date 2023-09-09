import { PublishedWithChanges } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";
import { useCallback, useContext, useRef } from "react";
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

  const sending = useRef(false);
  const handleClick = useCallback(() => {
    if (sending.current) {
      return;
    }
    sending.current = true;
    changeQuestionTeacherById(question.id, teacherId).finally(
      () => (sending.current = false)
    );
  }, [changeQuestionTeacherById, question.id, teacherId]);

  return (
    <Button
      variant="contained"
      endIcon={<PublishedWithChanges />}
      disabled={
        question?.teacher?.id === teacherId ||
        sending.current ||
        question.status === QuestionStatus.CANCELED ||
        question.status === QuestionStatus.AVAILABLE
      }
      onClick={handleClick}
    >
      講師を変更する
    </Button>
  );
};
