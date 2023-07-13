import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";

export const QuestionMemoTextField: FC<TextFieldProps> = forwardRef(
  (props, ref) => {
    return (
      <TextField
        fullWidth
        id="memo"
        label="備考"
        multiline
        ref={ref}
        {...props}
      />
    );
  }
);
