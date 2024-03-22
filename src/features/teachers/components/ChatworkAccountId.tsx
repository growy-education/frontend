import { useEffect, useState } from "react";
import { Teacher } from "../types/teacher.class";
import { SubmitHandler, useForm } from "react-hook-form";
import { UpdateTeacherDto } from "../types/update-teacher.dto";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Box, BoxProps } from "@mui/material";
import { HeadlineTypography } from "../../../components/Element/Typography/HeadlineTypography";
import { EditIconButton } from "../../../components/Element/IconButton/EditIconButton";
import { ChatworkAccountIdTextField } from "../chatworkAccountIdTextField";
import { DetailTypography } from "../../../components/Element/Typography/DetailTyporagphy";
import { useUpdateTeacher } from "../api/updateTeacher";

type ChatworkAccountIdProps = {
  teacher: Teacher;
} & BoxProps;

export const ChatworkAccountId = ({
  teacher,
  ...props
}: ChatworkAccountIdProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<UpdateTeacherDto>({
    resolver: classValidatorResolver(UpdateTeacherDto),
    defaultValues: {
      chatworkAccountId: teacher.chatworkAccountId,
    },
  });

  useEffect(() => {
    setValue("chatworkAccountId", teacher.chatworkAccountId);
  }, [setValue, teacher.chatworkAccountId]);

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
        <HeadlineTypography>Chatwork Account ID</HeadlineTypography>
        <Box>
          <EditIconButton isEditing={isEditing} setIsEditing={setIsEditing} />
        </Box>
      </Box>
      <Box>
        {isEditing ? (
          <ChatworkAccountIdTextField
            error={errors.chatworkAccountId}
            {...register("chatworkAccountId")}
          />
        ) : (
          <DetailTypography>{teacher.chatworkAccountId}</DetailTypography>
        )}
      </Box>
    </Box>
  );
};
