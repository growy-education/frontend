import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";
import { FieldErrors } from "react-hook-form";

type SchoolTextFieldProps = {
  errors: FieldErrors<{ school: string }>;
} & TextFieldProps;

export const SchoolTextField: FC<SchoolTextFieldProps> = forwardRef(
  ({ errors, ...props }, ref) => {
    return (
      <TextField
        fullWidth
        id="school"
        autoComplete="school"
        label="小学校名"
        error={!!errors.school}
        helperText={
          errors.school
            ? errors.school.message
            : "通っている学校の名前を入力してください"
        }
        ref={ref}
        {...props}
      />
    );
  }
);
