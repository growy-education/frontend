import { TextField, TextFieldProps } from "@mui/material";
import { Question } from "../../types/question.class";
import { FieldErrors } from "react-hook-form";

type QuestionAnswerCommentTextFieldProps = {
  answer: string;
  errors: FieldErrors<{ comment: string }>;
} & TextFieldProps;

export const AnswerCommentTextField = ({
  answer,
  errors,
  ...props
}: QuestionAnswerCommentTextFieldProps) => {
  return (
    <TextField
      id={`answer-${answer}-comment-textfield`}
      required
      fullWidth
      autoFocus
      multiline
      margin="dense"
      error={!!errors.comment}
      helperText={
        !!errors.comment
          ? errors.comment.message
          : "例)「〜がよく分からなかった。」「〜がわかりやすかったです。」など"
      }
      {...props}
    />
  );
};
