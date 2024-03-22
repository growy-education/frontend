import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";
import { FieldError } from "react-hook-form";

type ChatworkAccountIdTextFieldProps = {
  error: FieldError;
} & Omit<TextFieldProps, "error">;

export const ChatworkAccountIdTextField: FC<ChatworkAccountIdTextFieldProps> =
  forwardRef(({ error, ...props }, ref) => {
    return (
      <TextField
        fullWidth
        id="chatworkAccountId"
        label="ChatworkAccountID"
        error={!!error}
        helperText={
          typeof error?.message === "string"
            ? error.message
            : "ChatworkAccountIDを入力してください"
        }
        ref={ref}
        {...props}
      />
    );
  });
