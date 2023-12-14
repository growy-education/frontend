import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";
import { FieldErrors } from "react-hook-form";

type TaskTitleTextFieldProps = {
  errors: FieldErrors<{ title: string }>;
} & TextFieldProps;

export const TaskTitleTextField: FC<TaskTitleTextFieldProps> = forwardRef(
  ({ errors, ...props }, ref) => {
    return (
      <TextField
        fullWidth
        id="title"
        label="タイトル"
        error={!!errors.title}
        helperText={
          !!errors.title ? errors.title.message : "例)「大問1のみ」など"
        }
        ref={ref}
        {...props}
      />
    );
  }
);
