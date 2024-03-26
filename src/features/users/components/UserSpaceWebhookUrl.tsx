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
import { CheckUserWebhookButton } from "../CheckUserWebhookButton";
import { SpaceWebhookUrlTextField } from "../edit/SpaceWebhookUrlTextField";

type UserSpaceWebhookUrlProps = {
  user: User;
} & BoxProps<"form">;

export const UserSpaceWebhookUrl = ({
  user,
  ...props
}: UserSpaceWebhookUrlProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<UpdateUserDto>({
    resolver: classValidatorResolver(UpdateUserDto),
    defaultValues: {
      spaceWebhookUrl: user?.spaceWebhookUrl,
    },
  });

  useEffect(() => {
    setValue("spaceWebhookUrl", user?.spaceWebhookUrl || "");
  }, [setValue, user?.spaceWebhookUrl]);

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

  if (typeof user?.spaceWebhookUrl !== "string") {
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
        <HeadlineTypography>GoogleSpace WebhookURL(DM)</HeadlineTypography>
        <Box>
          <CheckUserWebhookButton user={user} />
          <EditIconButton isEditing={isEditing} setIsEditing={setIsEditing} />
        </Box>
      </Box>
      <Box>
        {isEditing ? (
          <SpaceWebhookUrlTextField
            error={errors.spaceWebhookUrl}
            {...register("spaceWebhookUrl")}
          />
        ) : (
          <DetailTypography
            noWrap={true}
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {user.spaceWebhookUrl}
          </DetailTypography>
        )}
      </Box>
    </Box>
  );
};
