import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";
import { FieldErrors } from "react-hook-form";

type FirstNameKanaTextFieldProps = {
  errors: FieldErrors<{ firstNameKana: string }>;
} & TextFieldProps;

export const FirstNameKanaTextField: FC<FirstNameKanaTextFieldProps> =
  forwardRef(({ errors, ...props }, ref) => {
    return (
      <TextField
        fullWidth
        id="firstNameKana"
        label="名前（読み仮名）"
        error={!!errors.firstNameKana}
        helperText={
          !!errors.firstNameKana
            ? errors.firstNameKana.message
            : "カタカナで入力してください"
        }
        ref={ref}
        {...props}
      />
    );
  });
