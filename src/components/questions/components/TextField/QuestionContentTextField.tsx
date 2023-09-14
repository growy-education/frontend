import { FC, forwardRef } from "react";
import { TextField, TextFieldProps } from "@mui/material";
import { FieldErrors } from "react-hook-form";

type QuestionContentTextFieldProps = {
  errors: FieldErrors<{ content: string }>;
} & TextFieldProps;

export const QuestionContentTextField: FC<QuestionContentTextFieldProps> =
  forwardRef(({ errors, ...props }, ref) => {
    return (
      <TextField
        fullWidth
        multiline
        rows={5}
        id="content"
        label="質問内容"
        error={!!errors.content}
        helperText={
          !!errors.content
            ? errors.content.message
            : "解説の分からないポイントをお書きください。もちろん質問する画像に書き込んでも良いです。"
        }
        ref={ref}
        {...props}
      />
    );
  });
