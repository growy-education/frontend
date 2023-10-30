import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  MenuItem,
  MenuItemProps,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useContext, useMemo, useState } from "react";
import { Question } from "../../dto/question.class";
import { AddTask, AssignmentLate } from "@mui/icons-material";
import { QuestionContext } from "../../contexts/QuestionContextProvider";
import { useNavigate } from "react-router-dom";
import { IsNotEmpty, IsString } from "class-validator";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { SubmitHandler, useForm } from "react-hook-form";

class AddTaskToQuestionDto {
  @IsNotEmpty({ message: "タスクタイトルを入力してください" })
  @IsString()
  title: string;
}

type AddTaskToQuestionMenuItemProps = {
  question: Question;
} & MenuItemProps;

export const AddTaskToQuestionMenuItem = ({
  question,
  onClick,
  ...props
}: AddTaskToQuestionMenuItemProps) => {
  const navigate = useNavigate();
  const { addTaskToQuestionById } = useContext(QuestionContext);

  // const disabled = useMemo(
  //   () => question.status !== QuestionStatus.CANCELED,
  //   [question.status]
  // );

  const [open, setOpen] = useState(false);
  const [sending, setSending] = useState(false);

  const handleCancel = () => {
    setOpen(false);
    if (onClick) {
      onClick(null);
    }
  };

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<AddTaskToQuestionDto>({
    resolver: classValidatorResolver(AddTaskToQuestionDto),
    defaultValues: {
      title: "",
    },
  });

  const handleClick = () => setOpen(true);

  const handleConfirm: SubmitHandler<AddTaskToQuestionDto> = async (data) => {
    if (sending) {
      return;
    }
    setSending(true);
    addTaskToQuestionById(question.id, data.title)
      .then((error) => {
        if (!!!error) {
          navigate("/questions");
          reset();
        }
      })
      .finally(() => {
        setSending(false);
      });
    setOpen(false);
    if (onClick) {
      onClick(null);
    }
  };

  return (
    <>
      <MenuItem
        onClick={handleClick}
        disableRipple
        disabled={sending && props.disabled}
        {...props}
      >
        <AddTask color={"warning"} />
        <Typography color="warning.main" ml={1}>
          タスクを追加する
        </Typography>
      </MenuItem>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="add-task-to-question-alert-dialog-title"
        aria-describedby="add-task-to-question-alert-dialog-description"
      >
        <Stack component="form" onSubmit={handleSubmit(handleConfirm)}>
          <DialogTitle id="add-task-to-question-alert-dialog-title">
            質問にタスクを追加する
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="add-task-to-question-alert-dialog-description">
              追加するタスクのタイトルを入力してください
            </DialogContentText>
            <TextField
              id={`add-task-to-question`}
              required
              fullWidth
              autoFocus
              multiline
              margin="dense"
              error={!!errors.title}
              helperText={
                !!errors.title ? errors.title.message : "例)大問1のみ"
              }
              {...register("title")}
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancel}>キャンセル</Button>
            <Button color="warning" type="submit">
              追加する
            </Button>
          </DialogActions>
        </Stack>
      </Dialog>
    </>
  );
};
