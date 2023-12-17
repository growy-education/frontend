import { useEffect, useState } from "react";
import { Teacher } from "../types/teacher.class";
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateTeacherDto } from "../types/update-teacher.dto";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Box, BoxProps } from "@mui/material";
import { HeadlineTypography } from "../../../components/Element/Typography/HeadlineTypography";
import { EditIconButton } from "../../../components/Element/IconButton/EditIconButton";
import { TeacherStatusTypography } from "../TeacherStatusTypography";
import { TeacherStatusRadioGroup } from "../TeacherStatusRadioGroup";
import { useUpdateTeacher } from "../api/updateTeacher";

type TeacherStatusProps = {
  teacher: Teacher;
} & BoxProps<"form">;

export const TeacherStatus = ({ teacher, ...props }: TeacherStatusProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<UpdateTeacherDto>({
    resolver: classValidatorResolver(UpdateTeacherDto),
    defaultValues: {
      status: teacher.status,
    },
  });

  useEffect(() => {
    setValue("status", teacher.status);
  }, [setValue, teacher.status]);

  const mutation = useUpdateTeacher({
    options: {
      onSettled: () => setIsEditing(false),
    },
  });

  const handleConfirm: SubmitHandler<UpdateTeacherDto> = async (data) => {
    if (mutation.isPending) {
      return;
    }
    mutation.mutate({ id: teacher.id, dto: data });
  };

  return (
    <Box component="form" onSubmit={handleSubmit(handleConfirm)} {...props}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <HeadlineTypography>質問回答ステータス</HeadlineTypography>
        <Box>
          <EditIconButton isEditing={isEditing} setIsEditing={setIsEditing} />
        </Box>
      </Box>
      <Box>
        {isEditing ? (
          <TeacherStatusRadioGroup control={control} errors={errors} />
        ) : (
          <TeacherStatusTypography textAlign="right" status={teacher.status} />
        )}
      </Box>
    </Box>
  );
};
