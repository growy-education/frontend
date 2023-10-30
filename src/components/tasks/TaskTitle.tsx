import { useContext, useEffect, useState } from "react";
import { Task } from "../../dto/task.class";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { HeadlineTypography } from "../components/Typography/HeadlineTypography";
import { Cancel, Edit, Save } from "@mui/icons-material";
import { IsNotEmpty, IsString } from "class-validator";
import { SubmitHandler, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { QuestionContext } from "../../contexts/QuestionContextProvider";

class TaskTitleDto {
  @IsNotEmpty({ message: "タイトルを入力してください" })
  @IsString({
    message: "文字列を入力してください",
  })
  title: string;
}

type TaskTitleProps = {
  task: Task;
};

export const TaskTitle = ({ task }: TaskTitleProps) => {
  const { updateTaskById } = useContext(QuestionContext);
  const [isEditing, setIsEditing] = useState(false);
  const [sending, setSending] = useState(false);

  useEffect(() => {
    setValue("title", task.title);
  }, [task.title]);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<TaskTitleDto>({
    resolver: classValidatorResolver(TaskTitleDto),
    defaultValues: {
      title: task.title,
    },
  });

  const handleConfirm: SubmitHandler<TaskTitleDto> = async (data) => {
    if (sending) {
      return;
    }
    setSending(true);
    updateTaskById(task.id, { title: data.title })
      .then((result) => {})
      .finally(() => {
        setIsEditing(false);
        setSending(false);
      });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleConfirm)}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <HeadlineTypography>タイトル</HeadlineTypography>
        <Box>
          {isEditing && (
            <IconButton type="submit" arial-label="save-button">
              <Save color="primary" fontSize="large" />
            </IconButton>
          )}
          <IconButton aria-label="edit-button">
            {isEditing ? (
              <Cancel
                color="warning"
                fontSize="large"
                onClick={() => setIsEditing(false)}
              />
            ) : (
              <Edit onClick={() => setIsEditing(true)} />
            )}
          </IconButton>
        </Box>
      </Box>
      <Box>
        {isEditing ? (
          <>
            <TextField
              fullWidth
              id="title"
              label="タイトル"
              error={!!errors.title}
              helperText={
                !!errors.title ? errors.title.message : "例)「大問1のみ」など"
              }
              {...register("title")}
            />
          </>
        ) : (
          <Typography>{task.title}</Typography>
        )}
      </Box>
    </Box>
  );
};
