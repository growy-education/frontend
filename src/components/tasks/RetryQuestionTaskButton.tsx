import { Block } from "@mui/icons-material";
import {
  Button,
  ButtonProps,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";
import { QuestionStatus } from "../../dto/enum/question-status.enum";
import { Question } from "../../dto/question.class";
import { useContext, useState } from "react";
import { QuestionContext } from "../../contexts/QuestionContextProvider";
import { IsNotEmpty, IsString } from "class-validator";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { SubmitHandler, useForm } from "react-hook-form";
import { Task } from "../../dto/task.class";
import { TaskStatus } from "../../dto/enum/task-status.enum";

class RetryQuestionTaskDto {
  @IsNotEmpty({ message: "動画の修正点を入力してください" })
  @IsString()
  retryMessage: string;
}

type RetryQuestionTaskButtonProps = {
  task: Task;
} & ButtonProps;

export const RetryQuestionTaskButton = ({
  task,
  ...props
}: RetryQuestionTaskButtonProps) => {
  const { retryQuestionTaskById } = useContext(QuestionContext);
  const [sending, setSending] = useState(false);
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

  const handleCancel = () => {
    setOpen(false);
    reset();
  };
  const handleClick = () => setOpen(true);

  const handleRetryQuestionTask: SubmitHandler<RetryQuestionTaskDto> = async (
    data
  ) => {
    if (sending) {
      return;
    }
    setSending(true);
    retryQuestionTaskById(task.id, data.retryMessage).finally(() =>
      setSending(false)
    );
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        color="warning"
        endIcon={<Block sx={{ color: "warning.main" }} />}
        disabled={task.status !== TaskStatus.REVIEWING}
        onClick={handleClick}
        {...props}
      >
        回答動画を拒否
      </Button>
      <Dialog open={open} onClose={handleCancel}>
        <Stack
          component="form"
          onSubmit={handleSubmit(handleRetryQuestionTask)}
        >
          <DialogTitle>回答動画を拒否する</DialogTitle>
          <DialogContent>
            <DialogContentText>
              動画の修正点を入力してください。このメッセージは講師に送信されます。
            </DialogContentText>
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel}>キャンセル</Button>
            <Button color="warning" type="submit">
              確認
            </Button>
          </DialogActions>
        </Stack>
      </Dialog>
    </>
  );
};
