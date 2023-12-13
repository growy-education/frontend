import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";
import { FieldErrors } from "react-hook-form";

type LastNameTextFieldProps = {
  errors: FieldErrors<{ lastName: string }>;
} & TextFieldProps;

export const LastNameTextField: FC<LastNameTextFieldProps> = forwardRef(
  ({ errors, ...props }, ref) => {
    return (
      <TextField
        fullWidth
        id="lastName"
        label="苗字"
        error={!!errors.lastName}
        helperText={
          !!errors.lastName ? errors.lastName.message : "苗字を入力してください"
        }
        ref={ref}
        {...props}
      />
    );
  }
);
