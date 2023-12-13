import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";
import { FieldErrors } from "react-hook-form";

type ChatworkAccountIdTextFieldProps = {
  errors: FieldErrors<{ chatworkAccountId: string }>;
} & TextFieldProps;

export const ChatworkAccountIdTextField: FC<ChatworkAccountIdTextFieldProps> =
  forwardRef(({ errors, ...props }, ref) => {
    return (
      <TextField
        fullWidth
        id="chatworkAccountId"
        label="ChatworkAccountID"
        error={!!errors.chatworkAccountId}
        helperText={
          !!errors.chatworkAccountId
            ? errors.chatworkAccountId.message
            : "ChatworkAccountIDを入力してください"
        }
        ref={ref}
        {...props}
      />
    );
  });
