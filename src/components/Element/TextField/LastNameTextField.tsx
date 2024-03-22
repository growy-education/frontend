import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";
import { FieldError } from "react-hook-form";

type LastNameTextFieldProps = {
  error: FieldError;
} & Omit<TextFieldProps, "error">;

export const LastNameTextField: FC<LastNameTextFieldProps> = forwardRef(
  ({ error, ...props }, ref) => {
    return (
      <TextField
        fullWidth
        id="lastName"
        label="苗字"
        error={!!error}
        helperText={
          typeof error?.message === "string"
            ? error.message
            : "苗字を入力してください"
        }
        ref={ref}
        {...props}
      />
    );
  }
);
