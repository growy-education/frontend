import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";
import { FieldErrors } from "react-hook-form";

type SpaceWebhookUrlTextFieldProps = {
  errors: FieldErrors<{ spaceWebhookUrl: string }>;
} & TextFieldProps;

export const SpaceWebhookUrlTextField: FC<SpaceWebhookUrlTextFieldProps> =
  forwardRef(({ errors, ...props }, ref) => {
    return (
      <TextField
        fullWidth
        id="spaceWebhookUrl"
        label="GoogleChat WebhookURL(Space)"
        error={!!errors.spaceWebhookUrl}
        helperText={
          errors.spaceWebhookUrl
            ? errors.spaceWebhookUrl.message
            : "GoogleChatのWebhookURL(Space)を入力してください."
        }
        ref={ref}
        {...props}
      />
    );
  });
