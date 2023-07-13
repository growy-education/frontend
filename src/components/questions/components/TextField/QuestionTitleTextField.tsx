import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";

export const QuestionTitleTextField: FC<TextFieldProps> = forwardRef(
  (props, ref) => {
    return (
      <TextField fullWidth id="title" label="タイトル" ref={ref} {...props} />
    );
  }
);
