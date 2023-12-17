import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";
import { FieldErrors } from "react-hook-form";

type FirstNameTextFieldProps = {
  errors: FieldErrors<{ firstName: string }>;
} & TextFieldProps;

export const FirstNameTextField: FC<FirstNameTextFieldProps> = forwardRef(
  ({ errors, ...props }, ref) => {
    return (
      <TextField
        fullWidth
        id="firstName"
        label="名前"
        error={!!errors.firstName}
        helperText={
          !!errors.firstName
            ? errors.firstName.message
            : "日本語で入力してください"
        }
        ref={ref}
        {...props}
      />
    );
  }
);
