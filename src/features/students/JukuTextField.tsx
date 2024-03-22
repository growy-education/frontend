import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";
import { FieldError } from "react-hook-form";

type JukuTextFieldProps = {
  error: FieldError;
} & Omit<TextFieldProps, "error">;

export const JukuTextField: FC<JukuTextFieldProps> = forwardRef(
  ({ error, ...props }, ref) => {
    return (
      <TextField
        fullWidth
        id="juku"
        label="塾名"
        error={!!error}
        helperText={
          typeof error?.message === "string"
            ? error.message
            : "通っている塾の名前を入力してください"
        }
        ref={ref}
        {...props}
      />
    );
  }
);
