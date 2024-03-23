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
            : "例)test@growy.educationなら'test'にする"
        }
        ref={ref}
        {...props}
      />
    );
  }
);
