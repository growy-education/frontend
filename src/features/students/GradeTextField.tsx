import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";
import { FieldError } from "react-hook-form";

type GradeTextFieldProps = {
  error: FieldError;
} & Omit<TextFieldProps, "error">;

export const GradeTextField: FC<GradeTextFieldProps> = forwardRef(
  ({ error: errors, ...props }, ref) => {
    return (
      <TextField
        fullWidth
        id="grade"
        label="学年"
        error={!!errors}
        helperText={
          typeof errors?.message === "string"
            ? errors.message
            : "学年を半角英数字で入力してください"
        }
        ref={ref}
        {...props}
      />
    );
  }
);
