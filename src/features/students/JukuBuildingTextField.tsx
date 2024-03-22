import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";
import { FieldError } from "react-hook-form";

type JukuBuildingTextFieldProps = {
  error: FieldError;
} & Omit<TextFieldProps, "error">;

export const JukuBuildingTextField: FC<JukuBuildingTextFieldProps> = forwardRef(
  ({ error, ...props }, ref) => {
    return (
      <TextField
        fullWidth
        id="jukuBuilding"
        label="塾の校舎"
        error={!!error}
        helperText={
          typeof error?.message === "string"
            ? error.message
            : "通っている塾の校舎名を入力してください"
        }
        ref={ref}
        {...props}
      />
    );
  }
);
