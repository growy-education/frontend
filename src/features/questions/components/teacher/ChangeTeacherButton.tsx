import { useCallback } from "react";
import { Button, ButtonProps } from "@mui/material";
import { PublishedWithChanges } from "@mui/icons-material";

import { Question } from "../../types/question.class";
import { QuestionStatus } from "../../types/question-status.enum";
import { useChangeTeacher } from "../../api/changeTeacher";

type ChangeTeacherButtonProps = {
  question: Question;
  teacherId: string;
} & ButtonProps;

export const ChangeTeacherButton = ({
  question,
  teacherId,
  ...props
}: ChangeTeacherButtonProps) => {
  const mutation = useChangeTeacher();

  const handleClick = useCallback(() => {
    if (mutation.isPending) {
      return;
    }
    mutation.mutate({ questionId: question.id, teacherId });
  }, [mutation, question.id, teacherId]);

  return (
    <Button
      variant="contained"
      endIcon={<PublishedWithChanges />}
      disabled={
        question?.teacher?.id === teacherId ||
        mutation.isPending ||
        question.status === QuestionStatus.CANCELED ||
        question.status === QuestionStatus.AVAILABLE
      }
      onClick={handleClick}
    >
      講師を変更する
    </Button>
  );
};
