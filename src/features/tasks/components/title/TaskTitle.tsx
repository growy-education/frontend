import { useEffect, useState } from "react";
import { Box, IconButton, TextField, Typography } from "@mui/material";
import { Cancel, Edit, Save } from "@mui/icons-material";
import { HeadlineTypography } from "../../../../components/Element/Typography/HeadlineTypography";

import { SubmitHandler, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Task } from "../../types/task.class";
import { useUpdateTask } from "../../api/updateTask";
import { UpdateTaskDto } from "../../types/update-task.dto";
import { EditIconButton } from "../../../../components/Element/IconButton/EditIconButton";
import { TaskTitleTextField } from "./TaskTitleTextField";

type TaskTitleProps = {
  task: Task;
};

export const TaskTitle = ({ task }: TaskTitleProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<UpdateTaskDto>({
    resolver: classValidatorResolver(UpdateTaskDto),
    defaultValues: {
      title: task.title,
    },
  });

  useEffect(() => {
    setValue("title", task.title);
  }, [setValue, task.title]);

  const mutation = useUpdateTask({
    options: {
      onSettled: () => setIsEditing(false),
    },
  });

  const handleConfirm: SubmitHandler<UpdateTaskDto> = async (data) => {
    if (mutation.isPending) {
      return;
    }
    mutation.mutate({ id: task.id, dto: data });
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
          <EditIconButton isEditing={isEditing} setIsEditing={setIsEditing} />
        </Box>
      </Box>
      <Box>
        {isEditing ? (
          <TaskTitleTextField errors={errors} {...register("title")} />
        ) : (
          <Typography>{task.title}</Typography>
        )}
      </Box>
    </Box>
  );
};
