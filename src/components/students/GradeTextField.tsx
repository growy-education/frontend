import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";
import { FieldErrors } from "react-hook-form";

type GradeTextFieldProps = {
  errors: FieldErrors<{ grade: string }>;
} & TextFieldProps;

export const GradeTextField: FC<GradeTextFieldProps> = forwardRef(
  ({ errors, ...props }, ref) => {
    return (
      <TextField
        fullWidth
        id="grade"
        label="学年"
        error={!!errors.grade}
        helperText={
          errors.grade
            ? errors.grade.message
            : "学年を半角英数字で入力してください"
        }
        ref={ref}
        {...props}
      />
    );
  }
);
