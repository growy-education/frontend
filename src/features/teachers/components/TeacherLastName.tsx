import { useEffect, useState } from "react";
import { Teacher } from "../types/teacher.class";
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateTeacherDto } from "../types/update-teacher.dto";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Box, BoxProps } from "@mui/material";
import { HeadlineTypography } from "../../../components/Element/Typography/HeadlineTypography";
import { EditIconButton } from "../../../components/Element/IconButton/EditIconButton";
import { DetailTypography } from "../../../components/Element/Typography/DetailTyporagphy";
import { LastNameTextField } from "../../../components/Element/TextField/LastNameTextField";
import { useUpdateTeacher } from "../api/updateTeacher";

type TeacherLastNameProps = {
  teacher: Teacher;
} & BoxProps<"form">;

export const TeacherLastName = ({
  teacher,
  ...props
}: TeacherLastNameProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<UpdateTeacherDto>({
    resolver: classValidatorResolver(UpdateTeacherDto),
    defaultValues: {
      lastName: teacher?.lastName,
    },
  });

  useEffect(() => {
    setValue("lastName", teacher?.lastName || "");
  }, [setValue, teacher?.lastName]);

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

  if (typeof teacher?.lastName !== "string") {
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
        <HeadlineTypography>苗字</HeadlineTypography>
        <Box>
          <EditIconButton isEditing={isEditing} setIsEditing={setIsEditing} />
        </Box>
      </Box>
      <Box>
        {isEditing ? (
          <LastNameTextField
            error={errors.lastName}
            {...register("lastName")}
          />
        ) : (
          <DetailTypography>{teacher.lastName}</DetailTypography>
        )}
      </Box>
    </Box>
  );
};
