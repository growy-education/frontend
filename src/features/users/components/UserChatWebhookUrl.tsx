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
import { ChatWebhookUrlTextField } from "../edit/ChatWebhookUrlTextField";
import { CheckUserWebhookButton } from "../CheckUserWebhookButton";

type UserChatWebhookUrlProps = {
  user: User;
} & BoxProps<"form">;

export const UserChatWebhookUrl = ({
  user,
  ...props
}: UserChatWebhookUrlProps) => {
  const [isEditing, setIsEditing] = useState(false);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<UpdateUserDto>({
    resolver: classValidatorResolver(UpdateUserDto),
    defaultValues: {
      chatWebhookUrl: user?.chatWebhookUrl,
    },
  });

  useEffect(() => {
    setValue("chatWebhookUrl", user?.chatWebhookUrl || "");
  }, [setValue, user?.chatWebhookUrl]);

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

  if (typeof user?.chatWebhookUrl !== "string") {
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
        <HeadlineTypography>GoogleChat WebhookURL(DM)</HeadlineTypography>
        <Box>
          <CheckUserWebhookButton user={user} />
          <EditIconButton isEditing={isEditing} setIsEditing={setIsEditing} />
        </Box>
      </Box>
      <Box>
        {isEditing ? (
          <ChatWebhookUrlTextField
            errors={errors}
            {...register("chatWebhookUrl")}
          />
        ) : (
          <DetailTypography
            noWrap={true}
            overflow="hidden"
            textOverflow="ellipsis"
          >
            {user.chatWebhookUrl}
          </DetailTypography>
        )}
      </Box>
    </Box>
  );
};
