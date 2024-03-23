import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";
import { FieldErrors } from "react-hook-form";

type PasswordTextFieldProps = {
  errors: FieldErrors<{ password: string }>;
} & TextFieldProps;

export const PasswordTextField: FC<PasswordTextFieldProps> = forwardRef(
  ({ errors, ...props }, ref) => {
    return (
      <TextField
        fullWidth
        id="password"
        label="パスワード"
        error={!!errors.password}
        helperText={
          errors.password
            ? errors.password.message
            : "英数小文字・大文字、そして記号を含む8文字以上。使わないので適当でよい。"
        }
        ref={ref}
        {...props}
      />
    );
  }
);
