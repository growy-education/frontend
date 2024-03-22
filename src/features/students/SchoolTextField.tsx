import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";
import { FieldError } from "react-hook-form";

type SchoolTextFieldProps = {
  error: FieldError;
} & Omit<TextFieldProps, "error">;

export const SchoolTextField: FC<SchoolTextFieldProps> = forwardRef(
  ({ error, ...props }, ref) => {
    return (
      <TextField
        fullWidth
        id="school"
        autoComplete="school"
        label="小学校名"
        error={!!error}
        helperText={
          typeof error?.message === "string"
            ? error.message
            : "通っている学校の名前を入力してください"
        }
        ref={ref}
        {...props}
      />
    );
  }
);
