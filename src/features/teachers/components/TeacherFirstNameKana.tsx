import { useEffect, useState } from "react";
import { Teacher } from "../types/teacher.class";
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateTeacherDto } from "../types/update-teacher.dto";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Box, BoxProps } from "@mui/material";
import { HeadlineTypography } from "../../../components/Element/Typography/HeadlineTypography";
import { EditIconButton } from "../../../components/Element/IconButton/EditIconButton";
import { DetailTypography } from "../../../components/Element/Typography/DetailTyporagphy";
import { FirstNameKanaTextField } from "../../../components/Element/TextField/FirstNameKanaTextField";
import { useUpdateTeacher } from "../api/updateTeacher";

type TeacherFirstNameKanaProps = {
  teacher: Teacher;
} & BoxProps<"form">;

export const TeacherFirstNameKana = ({
  teacher,
  ...props
}: TeacherFirstNameKanaProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<UpdateTeacherDto>({
    resolver: classValidatorResolver(UpdateTeacherDto),
    defaultValues: {
      firstNameKana: teacher?.firstNameKana,
    },
  });

  useEffect(() => {
    setValue("firstNameKana", teacher?.firstNameKana);
  }, [setValue, teacher?.firstNameKana]);

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

  if (typeof teacher?.firstNameKana !== "string") {
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
          <FirstNameKanaTextField
            error={errors.firstNameKana}
            {...register("firstNameKana")}
          />
        ) : (
          <DetailTypography>{teacher.firstNameKana}</DetailTypography>
        )}
      </Box>
    </Box>
  );
};
