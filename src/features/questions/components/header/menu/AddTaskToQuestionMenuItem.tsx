import { useState } from "react";
import { MenuItem, MenuItemProps, TextField, Typography } from "@mui/material";
import { AddTask } from "@mui/icons-material";
import { useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";

import { useAddTaskToQuestion } from "../../../api/addTaskToQuestion";
import { Question } from "../../../types/question.class";
import { AddTaskToQuestionDto } from "../../../types/add-task-to-question.dto";
import { ConfirmationDialog } from "../../../../../components/Element/Dialog/ConfirmationDialog";

type AddTaskToQuestionMenuItemProps = {
  question: Question;
} & MenuItemProps;

export const AddTaskToQuestionMenuItem = ({
  question,
  onClick,
  ...props
}: AddTaskToQuestionMenuItemProps) => {
  const [open, setOpen] = useState(false);

  const mutation = useAddTaskToQuestion({
    options: {
      onSettled: () => setOpen(false),
    },
  });

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

  const handleCancel = () => {
    setOpen(false);
    reset();
    if (onClick) {
      onClick(null);
    }
  };

  const handleClick = () => setOpen(true);

  const onSubmit = (data: AddTaskToQuestionDto) => {
    if (mutation.isPending) {
      return;
    }
    mutation.mutate({ questionId: question.id, dto: data });
    if (onClick) {
      onClick(null);
    }
  };

  const handleConfirm = async () => {
    if (mutation.isPending) {
      return;
    }
    handleSubmit(onSubmit)();
  };

  return (
    <>
      <MenuItem
        onClick={handleClick}
        disableRipple
        disabled={mutation.isPending && props.disabled}
        {...props}
      >
        <AddTask color={"warning"} />
        <Typography color="warning.main" ml={1}>
          タスクを追加する
        </Typography>
      </MenuItem>
      <ConfirmationDialog
        labelName={"add-task-to-question"}
        open={open}
        title={"質問にタスクを追加する"}
        content={
          (
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
          ) as any
        }
        contentText={"追加するタスクのタイトルを入力してください"}
        cancelText="キャンセル"
        confirmText="追加する"
        handleCancel={handleCancel}
        handleConfirm={handleConfirm}
      />
    </>
  );
};
