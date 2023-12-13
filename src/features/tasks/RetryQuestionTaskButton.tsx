import { useState } from "react";
import { Button, ButtonProps, TextField } from "@mui/material";
import { Block } from "@mui/icons-material";

import { useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Task } from "./types/task.class";
import { TaskStatus } from "./types/task-status.enum";
import { RetryQuestionTaskDto } from "../questions/types/retry-question-task.dto";
import { ConfirmationDialog } from "../../components/Element/Dialog/ConfirmationDialog";
import { useRetryTask } from "./api/retryTask";

type RetryQuestionTaskButtonProps = {
  task: Task;
} & ButtonProps;

export const RetryQuestionTaskButton = ({
  task,
  ...props
}: RetryQuestionTaskButtonProps) => {
  const [open, setOpen] = useState(false);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<RetryQuestionTaskDto>({
    resolver: classValidatorResolver(RetryQuestionTaskDto),
    defaultValues: {
      retryMessage: "",
    },
  });
  const handleClick = () => setOpen(true);

  const handleCancel = () => {
    setOpen(false);
    reset();
  };

  const mutation = useRetryTask({ options: { onSettled: handleCancel } });

  const onSubmit = (data: RetryQuestionTaskDto) => {
    mutation.mutate({ id: task.id, dto: data });
  };

  const handleConfirm = () => {
    if (mutation.isPending) {
      return;
    }
    handleSubmit(onSubmit)();
  };

  return (
    <>
      <Button
        variant="outlined"
        color="warning"
        endIcon={<Block sx={{ color: "warning.main" }} />}
        disabled={task.status !== TaskStatus.REVIEWING || mutation.isPending}
        onClick={handleClick}
        {...props}
      >
        回答動画を拒否
      </Button>
      <ConfirmationDialog
        labelName={"reject-question-task"}
        open={open}
        title="回答動画を拒否する"
        contentText="動画の修正点を入力してください。このメッセージは講師に送信されます。"
        content={
          (
            <TextField
              id="message"
              required
              label="講師へのメッセージ"
              fullWidth
              autoFocus
              multiline
              margin="dense"
              error={!!errors.retryMessage}
              helperText={
                !!errors.retryMessage
                  ? errors.retryMessage.message
                  : "講師に通知する修正点を入力してください"
              }
              {...register("retryMessage")}
            />
          ) as any
        }
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
      />
    </>
  );
};
