import { Verified } from "@mui/icons-material";
import { Button, ButtonProps } from "@mui/material";
import { QuestionStatus } from "../../dto/enum/question-status.enum";
import { useCallback, useContext, useRef } from "react";
import { QuestionContext } from "../../contexts/QuestionContextProvider";
import { Task } from "../../dto/task.class";
import { TaskStatus } from "../../dto/enum/task-status.enum";

type CompleteQuestionTaskButtonProps = {
  task: Task;
} & ButtonProps;

export const CompleteQuestionTaskButton = ({
  task,
  ...props
}: CompleteQuestionTaskButtonProps) => {
  const { completeQuestionTaskById } = useContext(QuestionContext);
  const sending = useRef(false);

  const handleClick = useCallback(() => {
    if (sending.current) {
      return;
    }
    sending.current = true;
    completeQuestionTaskById(task.id).finally(() => (sending.current = false));
  }, [completeQuestionTaskById]);

  return (
    <Button
      variant="contained"
      color="primary"
      endIcon={<Verified />}
      disabled={
        props.disabled ||
        sending.current ||
        task.status !== TaskStatus.REVIEWING
      }
      onClick={handleClick}
      {...props}
    >
      タスクを完了する
    </Button>
  );
};
