import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";
import { FieldErrors } from "react-hook-form";

type JukuBuildingTextFieldProps = {
  errors: FieldErrors<{ jukuBuilding: string }>;
} & TextFieldProps;

export const JukuBuildingTextField: FC<JukuBuildingTextFieldProps> = forwardRef(
  ({ errors, ...props }, ref) => {
    return (
      <TextField
        fullWidth
        id="jukuBuilding"
        label="塾の校舎"
        error={!!errors.jukuBuilding}
        helperText={
          errors.jukuBuilding
            ? errors.jukuBuilding.message
            : "通っている塾の校舎名を入力してください"
        }
        ref={ref}
        {...props}
      />
    );
  }
);
