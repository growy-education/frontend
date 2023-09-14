import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";
import { FieldErrors } from "react-hook-form";

type QuestionTitleTextFieldProps = {
  errors: FieldErrors<{ title: string }>;
} & TextFieldProps;

export const QuestionTitleTextField: FC<QuestionTitleTextFieldProps> =
  forwardRef(({ errors, ...props }, ref) => {
    return (
      <TextField
        fullWidth
        id="title"
        label="タイトル"
        error={!!errors.title}
        helperText={
          !!errors.title
            ? errors.title.message
            : "教材名や問題番号がオススメです。解説動画のタイトルにも使用いたします。"
        }
        ref={ref}
        {...props}
      />
    );
  });
