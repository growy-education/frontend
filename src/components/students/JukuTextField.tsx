import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";
import { FieldErrors } from "react-hook-form";

type JukuTextFieldProps = {
  errors: FieldErrors<{ juku: string }>;
} & TextFieldProps;

export const JukuTextField: FC<JukuTextFieldProps> = forwardRef(
  ({ errors, ...props }, ref) => {
    return (
      <TextField
        fullWidth
        id="juku"
        label="塾名"
        error={!!errors.juku}
        helperText={
          errors.juku
            ? errors.juku.message
            : "通っている塾の名前を入力してください"
        }
        ref={ref}
        {...props}
      />
    );
  }
);
