import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";
import { FieldError } from "react-hook-form";

type SpaceWebhookUrlTextFieldProps = {
  error: FieldError;
} & Omit<TextFieldProps, "error">;

export const SpaceWebhookUrlTextField: FC<SpaceWebhookUrlTextFieldProps> =
  forwardRef(({ error, ...props }, ref) => {
    return (
      <TextField
        fullWidth
        id="spaceWebhookUrl"
        label="GoogleChat WebhookURL(Space)"
        error={!!error}
        helperText={
          typeof error?.message === "string"
            ? error.message
            : "GoogleChatのWebhookURL(Space)を入力してください."
        }
        ref={ref}
        {...props}
      />
    );
  });
