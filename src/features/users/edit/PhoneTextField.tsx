import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";
import { FieldErrors } from "react-hook-form";

type PhoneTextFieldProps = {
  errors: FieldErrors<{ phone: string }>;
} & TextFieldProps;

export const PhoneTextField: FC<PhoneTextFieldProps> = forwardRef(
  ({ errors, ...props }, ref) => {
    return (
      <TextField
        fullWidth
        id="phone"
        label="電話番号"
        error={!!errors.phone}
        helperText={
          errors.phone
            ? errors.phone.message
            : "電話番号を半角英数字で入力してください。"
        }
        ref={ref}
        {...props}
      />
    );
  }
);
