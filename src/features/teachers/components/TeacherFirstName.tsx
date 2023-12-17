import { useEffect, useState } from "react";
import { Teacher } from "../types/teacher.class";
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateTeacherDto } from "../types/update-teacher.dto";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Box, BoxProps } from "@mui/material";
import { HeadlineTypography } from "../../../components/Element/Typography/HeadlineTypography";
import { EditIconButton } from "../../../components/Element/IconButton/EditIconButton";
import { DetailTypography } from "../../../components/Element/Typography/DetailTyporagphy";
import { FirstNameTextField } from "../../../components/Element/TextField/FirstNameTextField";
import { useUpdateTeacher } from "../api/updateTeacher";

type TeacherFirstNameProps = {
  teacher: Teacher;
} & BoxProps<"form">;

export const TeacherFirstName = ({
  teacher,
  ...props
}: TeacherFirstNameProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<UpdateTeacherDto>({
    resolver: classValidatorResolver(UpdateTeacherDto),
    defaultValues: {
      firstName: teacher?.firstName,
    },
  });

  useEffect(() => {
    setValue("firstName", teacher?.firstName);
  }, [setValue, teacher?.firstName]);

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

  if (typeof teacher?.firstName !== "string") {
    return <></>;
  }

  return (
    <Box component="form" onSubmit={handleSubmit(handleConfirm)} {...props}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <HeadlineTypography>名前</HeadlineTypography>
        <Box>
          <EditIconButton isEditing={isEditing} setIsEditing={setIsEditing} />
        </Box>
      </Box>
      <Box>
        {isEditing ? (
          <FirstNameTextField errors={errors} {...register("firstName")} />
        ) : (
          <DetailTypography>{teacher.firstName}</DetailTypography>
        )}
      </Box>
    </Box>
  );
};
