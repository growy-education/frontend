import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";
import { FieldError } from "react-hook-form";

type FirstNameKanaTextFieldProps = {
  error: FieldError;
} & Omit<TextFieldProps, "error">;

export const FirstNameKanaTextField: FC<FirstNameKanaTextFieldProps> =
  forwardRef(({ error, ...props }, ref) => {
    return (
      <TextField
        fullWidth
        id="firstNameKana"
        label="名前（フリガナ）"
        error={!!error}
        helperText={
          typeof error?.message === "string"
            ? error.message
            : "カタカナで入力してください"
        }
        ref={ref}
        {...props}
      />
    );
  });
