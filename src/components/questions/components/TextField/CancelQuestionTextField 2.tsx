import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";

export const CancelQuestionTextField: FC<TextFieldProps> = forwardRef(
  (props, ref) => {
    return (
      <TextField
        fullWidth
        multiline
        rows={5}
        id="cancel-reason"
        label="質問をキャンセルする理由"
        ref={ref}
        {...props}
      />
    );
  }
);
