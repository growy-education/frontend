import { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { classValidatorResolver } from "@hookform/resolvers/class-validator";
import { Box, BoxProps } from "@mui/material";

import { HeadlineTypography } from "../../../components/Element/Typography/HeadlineTypography";
import { EditIconButton } from "../../../components/Element/IconButton/EditIconButton";
import { DetailTypography } from "../../../components/Element/Typography/DetailTyporagphy";
import { User } from "../types/user.class";
import { UpdateUserDto } from "../types/update-user.dto";
import { useUpdateUser } from "../api/updateUser";
import { PhoneTextField } from "../edit/PhoneTextField";

type UserPhoneProps = {
  user: User;
} & BoxProps<"form">;

export const UserPhone = ({ user, ...props }: UserPhoneProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<UpdateUserDto>({
    resolver: classValidatorResolver(UpdateUserDto),
    defaultValues: {
      phone: user?.phone,
    },
  });

  useEffect(() => {
    setValue("phone", user?.phone || "");
  }, [setValue, user?.phone]);

  const mutation = useUpdateUser({
    options: {
      onSettled: () => setIsEditing(false),
    },
  });

  const handleConfirm: SubmitHandler<UpdateUserDto> = async (data) => {
    if (mutation.isPending) {
      return;
    }
    mutation.mutate({ id: user.id, dto: data });
  };

  if (typeof user?.phone !== "string") {
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
        <HeadlineTypography>電話番号</HeadlineTypography>
        <Box>
          <EditIconButton isEditing={isEditing} setIsEditing={setIsEditing} />
        </Box>
      </Box>
      <Box>
        {isEditing ? (
          <PhoneTextField errors={errors} {...register("phone")} />
        ) : (
          <DetailTypography>{user.phone}</DetailTypography>
        )}
      </Box>
    </Box>
  );
};
