import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";
import { FieldErrors } from "react-hook-form";

type ChatWebhookUrlTextFieldProps = {
  errors: FieldErrors<{ chatWebhookUrl: string }>;
} & TextFieldProps;

export const ChatWebhookUrlTextField: FC<ChatWebhookUrlTextFieldProps> =
  forwardRef(({ errors, ...props }, ref) => {
    return (
      <TextField
        fullWidth
        id="chatWebhookUrl"
        label="GoogleChat WebhookURL(DM)"
        error={!!errors.chatWebhookUrl}
        helperText={
          errors.chatWebhookUrl
            ? errors.chatWebhookUrl.message
            : "GoogleChatのWebhookURLを入力してください."
        }
        ref={ref}
        {...props}
      />
    );
  });
