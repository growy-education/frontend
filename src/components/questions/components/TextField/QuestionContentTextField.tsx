import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";

export const QuestionContentTextField: FC<TextFieldProps> = forwardRef(
  (props, ref) => {
    return (
      <TextField
        fullWidth
        multiline
        rows={5}
        id="content"
        label="質問内容"
        ref={ref}
        {...props}
      />
    );
  }
);
