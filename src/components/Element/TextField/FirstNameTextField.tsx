import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";
import { FieldError } from "react-hook-form";

type FirstNameTextFieldProps = {
  error: FieldError;
} & Omit<TextFieldProps, "error">;

export const FirstNameTextField: FC<FirstNameTextFieldProps> = forwardRef(
  ({ error, ...props }, ref) => {
    return (
      <TextField
        fullWidth
        id="firstName"
        label="名前"
        error={!!error}
        helperText={
          typeof error?.message === "string"
            ? error.message
            : "日本語で入力してください"
        }
        ref={ref}
        {...props}
      />
    );
  }
);
