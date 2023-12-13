import { Button, ButtonProps } from "@mui/material";
import { useConfirmLesson } from "../api/confirmLesson";
import { Lesson } from "../types/lesson.class";
import { LessonStatus } from "../types/lesson-status.enum";
import { AssignmentTurnedIn } from "@mui/icons-material";

type ConfirmLessonButtonProps = {
  lesson: Lesson;
} & ButtonProps;

export const ConfirmLessonButton = ({
  lesson,
  ...props
}: ConfirmLessonButtonProps) => {
  const mutation = useConfirmLesson();
  const handleClick = () => {
    if (mutation.isPending) {
      return;
    }
    mutation.mutate({ lessonId: lesson.id });
  };

  return (
    <Button
      id="confirm-lessons-button"
      variant="contained"
      disableElevation
      endIcon={<AssignmentTurnedIn />}
      onClick={handleClick}
      disabled={lesson.status !== LessonStatus.PENDING}
      {...props}
    >
      {lesson.status === LessonStatus.PENDING ? "確認する" : "確認済み"}
    </Button>
  );
};
