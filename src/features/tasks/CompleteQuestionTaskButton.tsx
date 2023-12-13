import { useCallback } from "react";
import { Button, ButtonProps } from "@mui/material";
import { Verified } from "@mui/icons-material";

import { Task } from "./types/task.class";
import { TaskStatus } from "./types/task-status.enum";
import { useCompleteTask } from "./api/completeTask";

type CompleteQuestionTaskButtonProps = {
  task: Task;
} & ButtonProps;

export const CompleteQuestionTaskButton = ({
  task,
  ...props
}: CompleteQuestionTaskButtonProps) => {
  const mutation = useCompleteTask();

  const handleClick = useCallback(() => {
    if (mutation.isPending) {
      return;
    }
    mutation.mutate({ id: task.id });
  }, [mutation, task.id]);

  return (
    <Button
      variant="contained"
      color="primary"
      endIcon={<Verified />}
      disabled={
        props.disabled ||
        mutation.isPending ||
        task.status !== TaskStatus.REVIEWING
      }
      onClick={handleClick}
      {...props}
    >
      タスクを完了する
    </Button>
  );
};
