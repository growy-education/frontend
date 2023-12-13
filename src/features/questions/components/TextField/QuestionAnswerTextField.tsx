import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";

export const QuestionAnswerTextField: FC<TextFieldProps> = forwardRef(
  (props, ref) => {
    return (
      <TextField
        fullWidth
        id="answer"
        label="回答のYouTubeURL"
        ref={ref}
        {...props}
      />
    );
  }
);
