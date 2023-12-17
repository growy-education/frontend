import { useEffect, useState } from "react";
import { Teacher } from "../types/teacher.class";
import { UpdateTeacherDto } from "../types/update-teacher.dto";
import { SubmitHandler, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { useUpdateTeacher } from "../api/updateTeacher";
import { Box, BoxProps } from "@mui/material";
import { HeadlineTypography } from "../../../components/Element/Typography/HeadlineTypography";
import { EditIconButton } from "../../../components/Element/IconButton/EditIconButton";
import { SubjectsCheckboxes } from "./SubjectsCheckboxes";
import { SubjectChips } from "../../../components/Element/Chip/SubjectChips";

type TeacherSubjectsProps = {
  teacher: Teacher;
} & BoxProps;

export const TeacherSubjects = ({
  teacher,
  ...props
}: TeacherSubjectsProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<UpdateTeacherDto>({
    resolver: classValidatorResolver(UpdateTeacherDto),
    defaultValues: {
      subjects: teacher.subjects,
    },
  });

  useEffect(() => {
    setValue("subjects", teacher.subjects);
  }, [setValue, teacher.subjects]);

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
        <HeadlineTypography>担当科目</HeadlineTypography>
        <Box>
          <EditIconButton isEditing={isEditing} setIsEditing={setIsEditing} />
        </Box>
      </Box>
      <Box>
        {isEditing ? (
          <SubjectsCheckboxes control={control} errors={errors} />
        ) : (
          <SubjectChips
            subjects={teacher.subjects}
            sx={{ textAlign: "right" }}
          />
        )}
      </Box>
    </Box>
  );
};
