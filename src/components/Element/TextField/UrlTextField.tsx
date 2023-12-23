import { TextField, TextFieldProps } from "@mui/material";
import { FC, forwardRef } from "react";
import { FieldErrors } from "react-hook-form";

type UrlTextFieldProps = {
  errors: FieldErrors<{ url: string }>;
} & TextFieldProps;

export const UrlTextField: FC<UrlTextFieldProps> = forwardRef(
  ({ errors, ...props }, ref) => {
    return (
      <TextField
        fullWidth
        id="url"
        label="URL"
        error={!!errors.url}
        helperText={
          !!errors.url
            ? errors.url.message
            : 'e.g. "https://meet.google.com/aaa-aaaa-aaa"'
        }
        ref={ref}
        {...props}
      />
    );
  }
);
