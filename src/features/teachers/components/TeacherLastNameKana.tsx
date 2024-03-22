import { useEffect, useState } from "react";
import { Teacher } from "../types/teacher.class";
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateTeacherDto } from "../types/update-teacher.dto";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Box, BoxProps } from "@mui/material";
import { HeadlineTypography } from "../../../components/Element/Typography/HeadlineTypography";
import { EditIconButton } from "../../../components/Element/IconButton/EditIconButton";
import { DetailTypography } from "../../../components/Element/Typography/DetailTyporagphy";
import { LastNameKanaTextField } from "../../../components/Element/TextField/LastNameKanaTextField";
import { useUpdateTeacher } from "../api/updateTeacher";

type TeacherLastNameKanaProps = {
  teacher: Teacher;
} & BoxProps<"form">;

export const TeacherLastNameKana = ({
  teacher,
  ...props
}: TeacherLastNameKanaProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<UpdateTeacherDto>({
    resolver: classValidatorResolver(UpdateTeacherDto),
    defaultValues: {
      lastNameKana: teacher.lastNameKana,
    },
  });

  useEffect(() => {
    setValue("lastNameKana", teacher.lastNameKana);
  }, [setValue, teacher.lastNameKana]);

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

  if (typeof teacher?.lastNameKana !== "string") {
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
        <HeadlineTypography>苗字（フリガナ）</HeadlineTypography>
        <Box>
          <EditIconButton isEditing={isEditing} setIsEditing={setIsEditing} />
        </Box>
      </Box>
      <Box>
        {isEditing ? (
          <LastNameKanaTextField
            error={errors.lastNameKana}
            {...register("lastNameKana")}
          />
        ) : (
          <DetailTypography>{teacher.lastNameKana}</DetailTypography>
        )}
      </Box>
    </Box>
  );
};
