import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";
import { FieldErrors } from "react-hook-form";

type EmailTextFieldProps = {
  errors: FieldErrors<{ email: string }>;
} & TextFieldProps;

export const EmailTextField: FC<EmailTextFieldProps> = forwardRef(
  ({ errors, ...props }, ref) => {
    return (
      <TextField
        fullWidth
        id="email"
        autoComplete="email"
        label="メールアドレス"
        error={!!errors.email}
        helperText={
          errors.email
            ? errors.email.message
            : "有効なメールアドレスを入力してください"
        }
        ref={ref}
        {...props}
      />
    );
  }
);
