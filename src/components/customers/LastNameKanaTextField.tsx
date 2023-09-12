import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";
import { FieldErrors } from "react-hook-form";

type LastNameKanaTextFieldProps = {
  errors: FieldErrors<{ lastNameKana: string }>;
} & TextFieldProps;

export const LastNameKanaTextField: FC<LastNameKanaTextFieldProps> = forwardRef(
  ({ errors, ...props }, ref) => {
    return (
      <TextField
        fullWidth
        id="lastNameKana"
        label="苗字（フリガナ）"
        error={!!errors.lastNameKana}
        helperText={
          !!errors.lastNameKana
            ? errors.lastNameKana.message
            : "カタカナで入力してください"
        }
        ref={ref}
        {...props}
      />
    );
  }
);
