import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";
import { FieldError } from "react-hook-form";

type LastNameKanaTextFieldProps = {
  error: FieldError;
} & Omit<TextFieldProps, "error">;

export const LastNameKanaTextField: FC<LastNameKanaTextFieldProps> = forwardRef(
  ({ error, ...props }, ref) => {
    return (
      <TextField
        fullWidth
        id="lastNameKana"
        label="苗字（フリガナ）"
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
  }
);
