import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";
import { FieldErrors } from "react-hook-form";

type UsernameTextFieldProps = {
  errors: FieldErrors<{ username: string }>;
} & TextFieldProps;

export const UsernameTextField: FC<UsernameTextFieldProps> = forwardRef(
  ({ errors, ...props }, ref) => {
    return (
      <TextField
        fullWidth
        id="username"
        label="ユーザー名"
        error={!!errors.username}
        helperText={
          !!errors.username
            ? errors.username.message
            : "英数小文字・大文字、そして記号を含む8文字以上。"
        }
        ref={ref}
        {...props}
      />
    );
  }
);
